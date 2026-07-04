export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: https://nomadburn.com/sitemap.xml
`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
