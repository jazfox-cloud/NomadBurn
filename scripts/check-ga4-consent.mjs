import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const files = [];

const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "dist" || entry === ".git" || entry === "reports") continue;
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (/\.(astro|ts|js|mjs|css)$/.test(path)) files.push(path);
  }
};

walk(root);

const sourceFiles = files.filter((file) => !file.endsWith("scripts/check-ga4-consent.mjs"));
const all = sourceFiles.map((file) => readFileSync(file, "utf8")).join("\n");
const fail = (message) => {
  console.error(message);
  process.exitCode = 1;
};

const measurementIds = [...all.matchAll(/\bG-[A-Z0-9]{6,}\b/g)].map((match) => match[0]);
const unexpectedIds = [...new Set(measurementIds.filter((id) => id !== "G-9VT18X714X"))];
if (!measurementIds.includes("G-9VT18X714X")) fail("Missing GA4 Measurement ID G-9VT18X714X.");
if (unexpectedIds.length) fail(`Unexpected GA4 Measurement ID(s): ${unexpectedIds.join(", ")}`);

const analytics = readFileSync(join(root, "src/components/AnalyticsConsent.astro"), "utf8");
for (const key of ["analytics_storage", "ad_storage", "ad_user_data", "ad_personalization"]) {
  if (!analytics.includes(key)) fail(`Missing Consent Mode v2 key: ${key}`);
}

if (!analytics.includes('PRODUCTION_HOST = "nomadburn.com"')) fail("Missing apex production host guard.");
if (!analytics.includes("window.location.hostname === PRODUCTION_HOST")) fail("Host guard is not enforced before GA loading.");
if (!analytics.includes("dataLayer.push(arguments)")) fail("Expected official dataLayer.push(arguments) queue shape.");
if (all.includes("dataLayer.push(args)")) fail("Forbidden dataLayer.push(args) found.");
if (/Google-certified advertising CMP/i.test(readFileSync(join(root, "src/pages/privacy-policy.astro"), "utf8"))) {
  fail("Privacy policy appears to claim Google-certified advertising CMP status.");
}

if (!process.exitCode) console.log("GA4 consent audit passed.");
