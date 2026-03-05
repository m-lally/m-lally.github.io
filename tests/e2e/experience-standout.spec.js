const { test, expect } = require("@playwright/test");

test("experience standout is visible with the personal profile link", async ({
  page
}) => {
  await page.goto("/");

  const standout = page.locator(".experience .experience-standout");
  await expect(standout).toBeVisible();
  await expect(standout).toContainText("curated snippet");
  await expect(standout).toContainText("last five years");

  const profileLink = standout.getByRole("link", {
    name: "My Profile Page"
  });
  await expect(profileLink).toHaveAttribute(
    "href",
    "https://linkedin.com/in/marclally"
  );
  await expect(profileLink).toHaveAttribute("target", "_blank");
  await expect(profileLink).toHaveAttribute("rel", "noopener noreferrer");
});

test("experience standout renders as a blockquote callout", async ({
  page
}) => {
  await page.goto("/");

  const styleSnapshot = await page.evaluate(() => {
    const standout = document.querySelector(".experience .experience-standout");
    if (!standout) return null;
    const styles = getComputedStyle(standout);
    return {
      tagName: standout.tagName,
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      borderLeftWidth: styles.borderLeftWidth,
      borderLeftStyle: styles.borderLeftStyle,
      borderLeftColor: styles.borderLeftColor,
      fontWeight: styles.fontWeight,
      fontStyle: styles.fontStyle
    };
  });

  expect(styleSnapshot).not.toBeNull();
  expect(styleSnapshot.tagName).toBe("BLOCKQUOTE");
  expect(styleSnapshot.backgroundColor).toBe("rgba(0, 0, 0, 0)");
  expect(styleSnapshot.borderLeftWidth).toBe("3px");
  expect(styleSnapshot.borderLeftStyle).toBe("solid");
  expect(styleSnapshot.borderLeftColor).toBe("rgba(232, 232, 227, 0.45)");
  expect(styleSnapshot.fontWeight).toBe("700");
  expect(styleSnapshot.color).toBe("rgb(144, 153, 160)");
  expect(styleSnapshot.fontStyle).toBe("normal");
});
