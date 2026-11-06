import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { cityImages } from "../src/data/cities.ts";

for (const city of ["Tbilisi", "Budapest", "Prague", "Warsaw"]) {
  test(`${city} photo is bundled with the site and retains attribution`, () => {
    const image = cityImages[city];
    assert.ok(image.src.startsWith("/"), "Homepage photo must not depend on an external image host");
    const bytes = readFileSync(new URL(`../public${image.src}`, import.meta.url));
    assert.equal(bytes.subarray(0, 3).toString("hex"), "ffd8ff", "Expected a JPEG photo, not an HTML error response");
    assert.ok(image.width > 0 && image.height > 0, "Reserve intrinsic image dimensions");
    assert.ok(image.creditLabel && image.licenseHref && image.licenseLabel, "Retain author and license");
  });
}

test("homepage and shared footer bundle the official Ignlab badge", () => {
  for (const file of ["../src/pages/index.astro", "../src/layouts/BaseLayout.astro"]) {
    const source = readFileSync(new URL(file, import.meta.url), "utf8");
    const tag = source.match(/<img\s[^>]*alt="NomadBurn on Ignlab Launch"[^>]*>/)?.[0];
    const src = tag?.match(/src="([^"]+)"/)?.[1];
    assert.ok(src?.startsWith("/"), "Badge must not depend on the remote PHP endpoint");
    const svg = readFileSync(new URL(`../public${src}`, import.meta.url), "utf8");
    assert.match(svg, /<svg[^>]+xmlns="http:\/\/www.w3.org\/2000\/svg"/);
    assert.match(svg, /Ignlab Launch/);
    assert.doesNotMatch(svg, /<script|<foreignObject|(?:href|src)="https?:/);
  }
});
