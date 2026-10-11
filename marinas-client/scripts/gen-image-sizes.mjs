// Prepares project images for responsive <img> tags:
//   - every image wider than 800px gets an 800px-wide copy next to it (<name>-800w.webp), used on phones via srcset
//   - src/data/imageSizes.json records each original's width/height, so the page doesn't jump while images load
//
//   npm run images:sizes        (also runs at the end of `npm run images`)
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SMALL_WIDTH = 800;
const QUALITY = 80;
const root = fileURLToPath(new URL("..", import.meta.url));
const publicDir = join(root, "public");
const imagesDir = join(publicDir, "images", "projects");

const smallName = (file) => file.replace(/\.webp$/, `-${SMALL_WIDTH}w.webp`);
const files = readdirSync(imagesDir, { recursive: true })
  .filter((file) => file.endsWith(".webp") && !file.endsWith(`-${SMALL_WIDTH}w.webp`))
  .sort();

const sizes = {};
let made = 0;
for (const file of files) {
  const full = join(imagesDir, file);
  const { width, height } = await sharp(full).metadata();
  sizes["/" + relative(publicDir, full).split(sep).join("/")] = [width, height];

  if (width > SMALL_WIDTH) {
    const small = join(imagesDir, smallName(file));
    let stale = true;
    try {
      stale = statSync(small).mtimeMs < statSync(full).mtimeMs;
    } catch {
      // not made yet
    }
    if (stale) {
      await sharp(full).resize({ width: SMALL_WIDTH }).webp({ quality: QUALITY }).toFile(small);
      made++;
    }
  }
}

// One image per line keeps diffs readable
const lines = Object.entries(sizes).map(([src, [w, h]]) => `  ${JSON.stringify(src)}: [${w}, ${h}]`);
writeFileSync(join(root, "src", "data", "imageSizes.json"), `{\n${lines.join(",\n")}\n}\n`);
console.log(`Wrote src/data/imageSizes.json (${files.length} images), ${made} new ${SMALL_WIDTH}px copies`);
