import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import config from "./src/config/config.json" with { type: "json" };

export default defineConfig({
  site: config.site.base_url,
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  vite: { plugins: [tailwindcss()] },
});
