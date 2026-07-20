import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const projectRoot = new URL("../", import.meta.url).pathname;
const css = readFileSync(join(projectRoot, "src/styles/global.css"), "utf8");

function rule(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]+)\\}`));
  assert.ok(match, `Missing CSS rule: ${selector}`);
  return match[1].replace(/\s+/g, " ");
}

const gridChildren = rule(".content-grid > *");
assert.match(gridChildren, /min-width:\s*0/);
assert.match(gridChildren, /max-width:\s*100%/);

const tableWrap = rule(".table-wrap");
assert.match(tableWrap, /width:\s*100%/);
assert.match(tableWrap, /max-width:\s*100%/);
assert.match(tableWrap, /min-width:\s*0/);
assert.match(tableWrap, /overflow-x:\s*auto/);

const citiesRoot = join(projectRoot, "dist/cities");
const citySlugs = readdirSync(citiesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

assert.equal(citySlugs.length, 17, "Expected 17 generated city detail pages");

for (const slug of citySlugs) {
  const html = readFileSync(join(citiesRoot, slug, "index.html"), "utf8");
  assert.match(html, /class="table-wrap"[^>]*>\s*<table>/);
  assert.ok(
    html.includes(`<link rel="canonical" href="https://nomadburn.com/cities/${slug}/">`),
    `Unexpected canonical for ${slug}`,
  );
}

const kualaLumpur = readFileSync(join(citiesRoot, "kuala-lumpur/index.html"), "utf8");
assert.ok(kualaLumpur.includes("/thumb/c/cc/Kuala_Lumpur_Skyline_at_dusk_1.jpg/"));
assert.ok(kualaLumpur.includes("File:Kuala_Lumpur_Skyline_at_dusk_1.jpg"));
assert.ok(kualaLumpur.includes("Walkerssk / Wikimedia Commons"));
assert.ok(kualaLumpur.includes("CC0 1.0"));
assert.match(kualaLumpur, /width="960" height="555"/);

console.log(`City page regression checks passed for ${citySlugs.length} pages.`);
