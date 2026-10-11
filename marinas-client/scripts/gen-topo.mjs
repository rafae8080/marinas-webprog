// Generates public/topo.svg: faint topographic contour lines for the Field Map background (§B1.4).
// Run once with `npm run gen:topo` and commit the output. Same seed = same file.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { contours } from "d3-contour";
import { createNoise2D } from "simplex-noise";

const WIDTH = 1600;
const HEIGHT = 1000;
const GRID = 10; // px per grid cell
const LEVELS = 14;
const SEED = 1465121; // 14.65°N 121.10°E
const MAX_BYTES = 60 * 1024;

// Small seeded PRNG (mulberry32) so the output is stable between runs
const mulberry32 = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const noise2D = createNoise2D(mulberry32(SEED));
const cols = WIDTH / GRID + 1;
const rows = HEIGHT / GRID + 1;

// Two octaves of noise = rolling terrain with a few smaller hills
const values = new Float64Array(cols * rows);
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const nx = x / cols;
    const ny = y / rows;
    values[y * cols + x] =
      noise2D(nx * 2.2, ny * 1.4) + 0.35 * noise2D(nx * 5.5 + 10, ny * 3.5 + 10);
  }
}

let min = Infinity;
let max = -Infinity;
for (const v of values) {
  if (v < min) min = v;
  if (v > max) max = v;
}
const step = (max - min) / (LEVELS + 1);
const thresholds = Array.from({ length: LEVELS }, (_, i) => min + step * (i + 1));

const fmt = (n) => Math.round(n);
const onEdge = ([x, y]) => x <= 0.5 || y <= 0.5 || x >= cols - 1.5 || y >= rows - 1.5;

// d3-contour closes every ring along the grid border. Split rings at the border so we only draw real contour lines.
const ringToPaths = (ring) => {
  const paths = [];
  let current = [];
  for (const point of ring) {
    if (onEdge(point)) {
      if (current.length > 1) paths.push(current);
      current = [];
    } else {
      current.push(point);
    }
  }
  if (current.length > 1) paths.push(current);
  if (paths.length > 1 && !onEdge(ring[0]) && !onEdge(ring[ring.length - 1])) {
    // The ring wrapped around: join the last open piece to the first
    paths[0] = paths.pop().concat(paths[0]);
  }
  return paths;
};

const toD = (points) => {
  let d = "";
  let prev = null;
  for (const [x, y] of points) {
    const px = fmt((x - 0.5) * GRID);
    const py = fmt((y - 0.5) * GRID);
    if (prev && prev[0] === px && prev[1] === py) continue;
    d += prev ? `L${px} ${py}` : `M${px} ${py}`;
    prev = [px, py];
  }
  return d;
};

const pathData = contours()
  .size([cols, rows])
  .thresholds(thresholds)(values)
  .flatMap((geometry) => geometry.coordinates.flat())
  .flatMap(ringToPaths)
  .filter((points) => points.length > 3)
  .map(toD)
  .join("");

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" preserveAspectRatio="xMidYMid slice">` +
  `<path d="${pathData}" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>` +
  `</svg>\n`;

const bytes = Buffer.byteLength(svg);
if (bytes > MAX_BYTES) {
  console.error(`topo.svg is ${(bytes / 1024).toFixed(1)} KB, over the ${MAX_BYTES / 1024} KB budget. Raise GRID or lower LEVELS.`);
  process.exit(1);
}

const out = fileURLToPath(new URL("../public/topo.svg", import.meta.url));
writeFileSync(out, svg);
console.log(`Wrote public/topo.svg (${LEVELS} levels, ${(bytes / 1024).toFixed(1)} KB)`);
