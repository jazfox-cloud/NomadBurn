import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname;
const pages = readdirSync(root, { recursive: true }).filter((file) => file.endsWith(".html"));
const checked = new Set();
const images = new Set();
let occurrences = 0;

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]?.replaceAll("&amp;", "&");
}

function checkLocalAsset(src) {
  assert.ok(src, "Missing image/icon source");
  const url = new URL(src, "https://nomadburn.com");
  if (url.origin !== "https://nomadburn.com" || checked.has(url.pathname)) return;
  const file = resolve(root, `.${decodeURIComponent(url.pathname)}`);
  assert.ok(file.startsWith(root), `Asset outside build: ${src}`);
  const bytes = readFileSync(file);
  switch (extname(file)) {
    case ".jpg":
      assert.equal(bytes.subarray(0, 3).toString("hex"), "ffd8ff", src);
      break;
    case ".png":
      assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", src);
      break;
    case ".ico":
      assert.equal(bytes.subarray(0, 4).toString("hex"), "00000100", src);
      break;
    case ".svg":
      assert.match(bytes.toString(), /<svg\b/, src);
      break;
    default:
      assert.fail(`Unexpected image format: ${src}`);
  }
  checked.add(url.pathname);
}

assert.ok(pages.length > 0, "Build the site before checking image references");
for (const page of pages) {
  const html = readFileSync(join(root, page), "utf8");
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    const src = attribute(tag, "src");
    assert.ok(src, `Missing image source in ${page}`);
    assert.notEqual(attribute(tag, "alt"), undefined, `Missing image alternative in ${page}`);
    if (attribute(tag, "loading") === "lazy") {
      assert.ok(Number(attribute(tag, "width")) > 0 && Number(attribute(tag, "height")) > 0,
        `Lazy image needs reserved dimensions in ${page}: ${src}`);
    }
    checkLocalAsset(src);
    images.add(src);
    occurrences++;
  }
  for (const [tag] of html.matchAll(/<(?:meta|link)\b[^>]*>/g)) {
    const type = attribute(tag, "property") || attribute(tag, "name") || attribute(tag, "rel");
    if (["og:image", "twitter:image"].includes(type)) checkLocalAsset(attribute(tag, "content"));
    if (["icon", "shortcut icon", "apple-touch-icon"].includes(type)) checkLocalAsset(attribute(tag, "href"));
  }
}
console.log(`Image references passed: ${pages.length} pages, ${occurrences} occurrences, ${images.size} unique display images, ${checked.size} local image/icon assets.`);
