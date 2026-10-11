// Converts project screenshots to WebP (max 1600px wide) in public/images/projects/<slug>/.
//
//   npm run images -- <slug>                 converts PNG/JPG already in public/images/projects/<slug>/
//   npm run images -- <slug> --from <dir>    converts PNG/JPG from another folder (e.g. a folder outside public/)
//   add --prefix <name>                      names the output <name>-01.webp, <name>-02.webp, ... in file order
//
// Originals are never deleted. Keep them outside public/ so they don't ship with the site.
import { mkdirSync, readdirSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const MAX_WIDTH = 1600;
const QUALITY = 80;
const root = fileURLToPath(new URL("..", import.meta.url));

const args = process.argv.slice(2);
const slug = args[0];
const fromIndex = args.indexOf("--from");
const prefixIndex = args.indexOf("--prefix");
const prefix = prefixIndex > -1 ? args[prefixIndex + 1] : null;
if (!slug || slug.startsWith("--")) {
  console.error("Usage: npm run images -- <slug> [--from <dir>] [--prefix <name>]");
  process.exit(1);
}

const outDir = join(root, "public", "images", "projects", slug);
const srcDir = fromIndex > -1 ? resolve(process.cwd(), args[fromIndex + 1]) : outDir;
mkdirSync(outDir, { recursive: true });

const files = readdirSync(srcDir)
  .filter((f) => /\.(png|jpe?g|jfif)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (files.length === 0) {
  console.log(`No PNG/JPG/JFIF files in ${srcDir}`);
  process.exit(0);
}

for (const [i, file] of files.entries()) {
  const name = prefix ? `${prefix}-${String(i + 1).padStart(2, "0")}` : basename(file, extname(file));
  const out = join(outDir, `${name}.webp`);
  const info = await sharp(join(srcDir, file))
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  console.log(`${file} -> projects/${slug}/${basename(out)} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
}
