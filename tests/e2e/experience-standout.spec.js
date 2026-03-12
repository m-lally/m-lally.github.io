const { test, expect } = require("@playwright/test");

test("experience standout is not rendered", async ({ page }) => {
  await page.goto("/");

  const standout = page.locator(".experience .experience-standout");
  await expect(standout).toHaveCount(0);
});
