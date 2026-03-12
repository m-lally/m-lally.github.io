const { test, expect } = require("@playwright/test");

async function getGridColumnCount(page, selector) {
  return page.evaluate((targetSelector) => {
    const element = document.querySelector(targetSelector);
    if (!element) return 0;
    const template = window.getComputedStyle(element).gridTemplateColumns;

    const columns = [];
    let token = "";
    let depth = 0;

    for (const char of template) {
      if (char === "(") depth += 1;
      if (char === ")") depth -= 1;

      if (char === " " && depth === 0) {
        if (token) {
          columns.push(token);
          token = "";
        }
        continue;
      }

      token += char;
    }

    if (token) columns.push(token);
    return columns.length;
  }, selector);
}

async function getFlexDirection(page, selector) {
  return page.evaluate((targetSelector) => {
    const element = document.querySelector(targetSelector);
    return element ? window.getComputedStyle(element).flexDirection : "";
  }, selector);
}

async function prepareForSnapshot(page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addStyleTag({
    content:
      "*{animation:none !important;transition:none !important;caret-color:transparent !important;}"
  });
  await page.evaluate(() =>
    document.fonts ? document.fonts.ready : Promise.resolve()
  );
}

test("desktop layout keeps multi-column grids", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Marc Lally" })).toBeVisible();

  const summaryColumns = await getGridColumnCount(page, ".summary-grid");
  const notesColumns = await getGridColumnCount(page, ".two-column-notes");
  const footerDirection = await getFlexDirection(page, ".footer-inner");

  expect(summaryColumns).toBe(3);
  expect(notesColumns).toBe(2);
  expect(footerDirection).toBe("row");
});

test("tablet layout reduces summary grid columns", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");

  const summaryColumns = await getGridColumnCount(page, ".summary-grid");
  const notesColumns = await getGridColumnCount(page, ".two-column-notes");
  const footerDirection = await getFlexDirection(page, ".footer-inner");

  expect(summaryColumns).toBe(2);
  expect(notesColumns).toBe(2);
  expect(footerDirection).toBe("row");
});

test("mobile layout stacks content and avoids horizontal scroll", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");

  const summaryColumns = await getGridColumnCount(page, ".summary-grid");
  const notesColumns = await getGridColumnCount(page, ".two-column-notes");
  const footerDirection = await getFlexDirection(page, ".footer-inner");

  const overflow = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth - root.clientWidth;
  });

  expect(summaryColumns).toBe(1);
  expect(notesColumns).toBe(1);
  expect(footerDirection).toBe("column");
  expect(overflow).toBeLessThanOrEqual(1);
});

test("visual snapshot desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Marc Lally" })).toBeVisible();
  await prepareForSnapshot(page);
  await expect(page).toHaveScreenshot("desktop.png", {
    fullPage: true,
    animations: "disabled"
  });
});

test("visual snapshot tablet", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Marc Lally" })).toBeVisible();
  await prepareForSnapshot(page);
  await expect(page).toHaveScreenshot("tablet.png", {
    fullPage: true,
    animations: "disabled"
  });
});

test("visual snapshot mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Marc Lally" })).toBeVisible();
  await prepareForSnapshot(page);
  await expect(page).toHaveScreenshot("mobile.png", {
    fullPage: true,
    animations: "disabled"
  });
});
