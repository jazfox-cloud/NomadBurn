import { citySlugs, destinationNames } from "../data/cities";

const site = "https://nomadburn.com";

export function GET() {
  const paths = [
    "/",
    "/digital-nomad-burn-rate-calculator/",
    "/nomad-runway-calculator/",
    "/digital-nomad-cost-of-living/",
    "/methodology/",
    "/cities/",
    ...destinationNames.map((city) => `/cities/${citySlugs[city]}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${site}${path}</loc>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path.startsWith("/cities/") ? "0.7" : "0.8"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
    },
  });
}
