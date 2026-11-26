import config from "@/config/config.json";
import { pageRoutes } from "@/lib/pages";

export function GET() {
  const urls = pageRoutes.map((path) => `  <url><loc>${new URL(path, config.site.base_url).href}</loc></url>`);
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ];
  return new Response(`${sitemap.join("\n")}\n`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
