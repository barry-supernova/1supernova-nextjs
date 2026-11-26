import config from "@/config/config.json";

export function GET() {
  const robots = ["User-agent: *", "Allow: /"];
  if (!config.preview) {
    robots.push(`Sitemap: ${new URL("/sitemap.xml", config.site.base_url).href}`);
  }
  return new Response(`${robots.join("\n")}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
