// Generates the social sharing card public/og.png (1200x630) and public/apple-touch-icon.png (180x180).
// Run with `npm run gen:og` after changing the name, role or colors, and commit the output.
//
// The card is an SVG (Day colors, topo contours from public/topo.svg, frame, accent survey marker) with text
// rendered by sharp from the self-hosted @fontsource files, so it uses the same fonts as the site.
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateSync } from "node:zlib";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const tmp = mkdtempSync(join(tmpdir(), "og-fonts-"));

// The text renderer can't read .woff, so unpack it to a plain .ttf (WOFF 1.0 = zlib-compressed sfnt tables)
const woffToTtf = (woff) => {
  const numTables = woff.readUInt16BE(12);
  const tables = [];
  for (let i = 0; i < numTables; i++) {
    const at = 44 + i * 20;
    const [offset, compLength, origLength] = [woff.readUInt32BE(at + 4), woff.readUInt32BE(at + 8), woff.readUInt32BE(at + 12)];
    const raw = woff.subarray(offset, offset + compLength);
    tables.push({
      tag: woff.subarray(at, at + 4),
      checksum: woff.readUInt32BE(at + 16),
      data: compLength < origLength ? inflateSync(raw) : raw,
    });
  }
  const pow2 = 2 ** Math.floor(Math.log2(numTables));
  const header = Buffer.alloc(12 + numTables * 16);
  header.writeUInt32BE(woff.readUInt32BE(4), 0); // sfnt flavor
  header.writeUInt16BE(numTables, 4);
  header.writeUInt16BE(pow2 * 16, 6);
  header.writeUInt16BE(Math.log2(pow2), 8);
  header.writeUInt16BE(numTables * 16 - pow2 * 16, 10);
  let offset = header.length;
  const chunks = [header];
  tables.forEach((t, i) => {
    t.tag.copy(header, 12 + i * 16);
    header.writeUInt32BE(t.checksum, 16 + i * 16);
    header.writeUInt32BE(offset, 20 + i * 16);
    header.writeUInt32BE(t.data.length, 24 + i * 16);
    const padded = Buffer.alloc(Math.ceil(t.data.length / 4) * 4);
    t.data.copy(padded);
    chunks.push(padded);
    offset += padded.length;
  });
  return Buffer.concat(chunks);
};

const font = (family, file) => {
  const out = join(tmp, file.replace(/\.woff$/, ".ttf"));
  writeFileSync(out, woffToTtf(readFileSync(join(root, "node_modules", "@fontsource", family, "files", file))));
  return out;
};
const DISPLAY = font("space-grotesk", "space-grotesk-latin-700-normal.woff");
const MONO = font("jetbrains-mono", "jetbrains-mono-latin-500-normal.woff");
const SANS = font("inter", "inter-latin-400-normal.woff");

// Day tokens (§B1.2)
const C = { bg: "#E8E6E0", surface: "#F6F5F1", ink: "#1B1E1A", muted: "#5F5E57", line: "#C8C2B3", accent: "#8E1B1F" };

const W = 1200;
const H = 630;

// Contours: the single path in public/topo.svg (viewBox 1600x1000), scaled to cover the card
const topo = readFileSync(join(root, "public", "topo.svg"), "utf8").match(/ d="([^"]+)"/)[1];

const corner = (x, y, dx, dy) => `<path d="M${x} ${y + dy * 18}V${y}H${x + dx * 18}" />`;

const base = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${C.bg}" />
  <g transform="translate(0 -60) scale(0.75)">
    <path d="${topo}" fill="none" stroke="${C.line}" stroke-width="2" stroke-linejoin="round" />
  </g>
  <rect x="48" y="48" width="${W - 96}" height="${H - 96}" fill="${C.surface}" fill-opacity="0.9" stroke="${C.line}" stroke-width="2" />
  <g fill="none" stroke="${C.ink}" stroke-width="2">
    ${corner(40, 40, 1, 1)}${corner(W - 40, 40, -1, 1)}${corner(40, H - 40, 1, -1)}${corner(W - 40, H - 40, -1, -1)}
  </g>
  <rect x="96" y="${H - 168}" width="${W - 192}" height="2" fill="${C.line}" />
  <g transform="translate(${W - 220} 96)">
    <circle cx="62" cy="62" r="60" fill="none" stroke="${C.line}" stroke-width="2" />
    <circle cx="62" cy="62" r="38" fill="none" stroke="${C.line}" stroke-width="2" />
    <circle cx="62" cy="62" r="18" fill="none" stroke="${C.ink}" stroke-width="2" />
    <circle cx="62" cy="62" r="7" fill="${C.accent}" />
  </g>
</svg>`;

// Pango markup text layer; fontfile makes the family available to the renderer
const text = (markup, fontfile, desc) =>
  sharp({ text: { text: markup, font: desc, fontfile, rgba: true, dpi: 72 } }).png().toBuffer();

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const span = (color, s, extra = "") => `<span foreground="${color}"${extra}>${esc(s)}</span>`;

const layers = [
  {
    input: await text(
      `${span(C.accent, "SEC-01")}${span(C.muted, " // FIELD ID")}`,
      MONO,
      "JetBrains Mono Medium 22",
    ),
    left: 96,
    top: 104,
  },
  {
    input: await text(span(C.ink, "Rafael Marinas", ' letter_spacing="-2048"'), DISPLAY, "Space Grotesk Bold 104"),
    left: 92,
    top: 168,
  },
  {
    input: await text(span(C.ink, "Full-stack developer (MERN · Next.js · PHP)"), SANS, "Inter 38"),
    left: 96,
    top: 312,
  },
  {
    input: await text(span(C.ink, "and Flutter mobile developer."), SANS, "Inter 38"),
    left: 96,
    top: 364,
  },
  {
    input: await text(
      span(C.muted, "MARIKINA CITY, PH  ·  14.65°N 121.10°E  ·  BSIT, NU MANILA", ' letter_spacing="2048"'),
      MONO,
      "JetBrains Mono Medium 20",
    ),
    left: 96,
    top: H - 136,
  },
];

const og = await sharp(Buffer.from(base)).composite(layers).png({ compressionLevel: 9 }).toFile(join(root, "public", "og.png"));
rmSync(tmp, { recursive: true, force: true });
console.log(`Wrote public/og.png (${og.width}x${og.height}, ${Math.round(og.size / 1024)} KB)`);

// Home-screen icon for iOS (it ignores SVG favicons); light colors, same mark as favicon.svg
const icon = await sharp(join(root, "public", "favicon.svg"), { density: 1200 })
  .resize(180, 180)
  .flatten({ background: C.surface })
  .png()
  .toFile(join(root, "public", "apple-touch-icon.png"));
console.log(`Wrote public/apple-touch-icon.png (${icon.width}x${icon.height}, ${Math.round(icon.size / 1024)} KB)`);
