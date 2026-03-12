const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..", "..");
const html = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");

test("includes responsive viewport meta tag", () => {
  assert.match(
    html,
    /<meta[^>]*name="viewport"[^>]*content="[^"]*width=device-width[^"]*"/i
  );
});

test("provides accessible contact links", () => {
  const labels = [
    "Call +44 7516 029946",
    "Email marc.lally@gmail.com",
    "Book a meeting",
    "Download CV",
    "GitHub",
    "LinkedIn"
  ];

  labels.forEach((label) => {
    const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`aria-label="${escapedLabel}"`, "i");
    assert.match(html, pattern);
  });
});

test("experience entries are paired", () => {
  const companyCount = (html.match(/class="company-wrapper\b/g) || []).length;
  const jobCount = (html.match(/class="job-wrapper\b/g) || []).length;

  assert.ok(companyCount > 0, "expected at least one company entry");
  assert.strictEqual(companyCount, jobCount);
});

test("download call-to-action appears in profile", () => {
  assert.match(html, /class="download-cta"/i);
  assert.match(html, /Download CV/i);
});
