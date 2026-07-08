import { citySlugs, destinationNames } from "../data/cities";

const site = "https://nomadburn.com";
const lastmod = "2026-07-08";

export function GET() {
  const paths = [
    "/",
    "/digital-nomad-burn-rate-calculator/",
    "/nomad-runway-calculator/",
    "/digital-nomad-cost-of-living/",
    "/methodology/",
    "/about/",
    "/contact/",
    "/privacy-policy/",
    "/terms-of-use/",
    "/cities/",
    ...destinationNames.map((city) => `/cities/${citySlugs[city]}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${site}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path.startsWith("/cities/") ? "0.7" : path.includes("privacy") || path.includes("terms") ? "0.3" : "0.8"}</priority>
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
