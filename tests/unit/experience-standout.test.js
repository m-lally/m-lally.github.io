const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..", "..");
const html = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
test("experience standout is not present in the experience section", () => {
  assert.doesNotMatch(html, /class="experience-standout"/i);
  assert.doesNotMatch(html, /class="experience-standouts"/i);
});
