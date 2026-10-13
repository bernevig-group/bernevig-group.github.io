import { defineConfig } from "astro/config";

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow. Locally the site lives at "/".
export default defineConfig({
  site: process.env.SITE_URL || "https://example.org",
  base: process.env.BASE_PATH || "/",
  trailingSlash: "ignore",
});
