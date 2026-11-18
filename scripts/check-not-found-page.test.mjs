import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("the deploy artifact has a noindex 404 page with recovery links", () => {
  const html = readFileSync(new URL("../dist/404.html", import.meta.url), "utf8");

  assert.match(html, /<meta name="robots" content="noindex, follow">/);
  assert.match(html, /<h1[^>]*>Page not found<\/h1>/);
  assert.match(html, /href="\/"/);
  assert.match(html, /href="\/cities\/"/);
});
