// Makes the hero portrait: public/images/me/portrait.webp (4:5, 720px wide).
//
//   npm run portrait                                   uses public/images/me/portrait.jpg
//   npm run portrait -- --from <file>                  uses another photo
//   npm run portrait -- --from <file> --crop l,t,w,h   crops that box (in source pixels) first
//
// Without --crop the photo is center-cropped to 4:5. The source file is never changed.
import { mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WIDTH = 720;
const HEIGHT = 900;
const root = fileURLToPath(new URL("..", import.meta.url));
const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i > -1 ? args[i + 1] : null;
};

const src = opt("--from") ? resolve(process.cwd(), opt("--from")) : join(root, "public", "images", "me", "portrait.jpg");
const outDir = join(root, "public", "images", "me");
mkdirSync(outDir, { recursive: true });

let image = sharp(src).rotate(); // respect EXIF orientation
if (opt("--crop")) {
  const [left, top, width, height] = opt("--crop").split(",").map(Number);
  image = image.extract({ left, top, width, height });
}

const info = await image
  .resize({ width: WIDTH, height: HEIGHT, fit: "cover", position: "attention" })
  .webp({ quality: 82 })
  .toFile(join(outDir, "portrait.webp"));

console.log(`Wrote public/images/me/portrait.webp (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
