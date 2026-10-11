// Writes public/sitemap.xml from the public routes, every project slug (src/data/projects.js) and every
// published Field Note (marinas-server/scripts/article-seed-data.js, the seed for the articles collection).
// Run with `npm run gen:sitemap` after adding a project or note, and commit the output.
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SITE_URL = "https://marinas-client.vercel.app"; // keep in sync with siteUrl in src/data/site.js
const root = fileURLToPath(new URL("..", import.meta.url));
const projects = (await import(pathToFileURL(join(root, "src", "data", "projects.js")).href)).default;
const notes = createRequire(import.meta.url)("../../marinas-server/scripts/article-seed-data.js").filter(
  (note) => note.published !== false,
);

const routes = [
  "/",
  "/work",
  ...projects.map((p) => `/work/${p.slug}`),
  "/about",
  "/notes",
  ...notes.map((n) => `/notes/${n.name}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`).join("\n")}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml);
console.log(`Wrote public/sitemap.xml (${routes.length} URLs)`);
