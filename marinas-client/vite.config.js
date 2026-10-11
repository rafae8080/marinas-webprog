import process from "node:process";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The fonts that draw the first screen (body text and headings) are otherwise found only after the CSS is parsed.
// Preloading them lets the text show in its real font sooner. Build only: the file names carry a content hash.
const PRELOAD_FONTS = [/inter-latin-400-normal-[\w-]+\.woff2$/, /space-grotesk-latin-700-normal-[\w-]+\.woff2$/];

const preloadFonts = () => ({
  name: "preload-fonts",
  apply: "build",
  transformIndexHtml(html, { bundle }) {
    const files = Object.keys(bundle ?? {}).filter((file) => PRELOAD_FONTS.some((re) => re.test(file)));
    return files.map((file) => ({
      tag: "link",
      attrs: { rel: "preload", href: `/${file}`, as: "font", type: "font/woff2", crossorigin: "" },
      injectTo: "head",
    }));
  },
});

// Opens the connection to the API (a different origin) early: Field Notes, the contact form and RMO all use it
const preconnectApi = (apiUrl) => ({
  name: "preconnect-api",
  transformIndexHtml() {
    if (!apiUrl) return [];
    return [{ tag: "link", attrs: { rel: "preconnect", href: new URL(apiUrl).origin, crossorigin: "" }, injectTo: "head" }];
  },
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react(), tailwindcss(), preloadFonts(), preconnectApi(env.VITE_API_URL)],
  };
});
