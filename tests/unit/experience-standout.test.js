const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..", "..");
const html = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
const css = fs.readFileSync(path.join(rootDir, "index.css"), "utf8");

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getCssDeclarations(selector) {
  const selectorPattern = escapeRegex(selector);
  const match = css.match(new RegExp(`${selectorPattern}\\s*\\{([\\s\\S]*?)\\}`));
  assert.ok(match, `Missing CSS block for selector: ${selector}`);

  /** @type {Record<string, string>} */
  const declarations = {};
  const declarationPattern = /([a-z-]+)\s*:\s*([^;]+);/g;
  let declarationMatch = declarationPattern.exec(match[1]);

  while (declarationMatch) {
    declarations[declarationMatch[1].trim()] = declarationMatch[2].trim();
    declarationMatch = declarationPattern.exec(match[1]);
  }

  return declarations;
}

test("experience standout copy links to the personal profile page", () => {
  assert.match(
    html,
    /<blockquote class="experience-standout">[\s\S]*?curated snippet[\s\S]*?last five years[\s\S]*?personal profile page:/i
  );
  assert.match(html, /href="https:\/\/linkedin\.com\/in\/marclally"/i);
  assert.match(html, />My Profile Page<\/a>/i);
  assert.match(html, /rel="noopener noreferrer"/i);
});

test("experience standout is styled as a blockquote callout", () => {
  const standout = getCssDeclarations(".experience .experience-standout");
  const expectedProperties = {
    background: "transparent",
    "border-left": "3px solid rgba(232, 232, 227, 0.45)",
    "font-style": "normal",
    color: "inherit",
    "font-weight": "700"
  };

  Object.entries(expectedProperties).forEach(([prop, value]) => {
    assert.equal(
      standout[prop],
      value,
      `Expected .experience-standout ${prop} to be ${value}`
    );
  });

  assert.equal(standout["box-shadow"], "none");
});
