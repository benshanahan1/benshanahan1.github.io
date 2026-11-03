import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // These regressions depend only on local assets, not the font service.
  await page.route("https://fonts.googleapis.com/**", (route) => route.abort());
  await page.route("https://fonts.gstatic.com/**", (route) => route.abort());
});

for (const [name, destination] of [
  ["Lunadrop", "/projects/lunadrop/"],
  ["Open Rocketry Initiative", "/projects/rocketry/"],
]) {
  test(`Enter follows the revision table's ${name} link`, async ({ page }) => {
    await page.goto("/");
    // Wait until revision interactions are attached before exercising the link.
    await expect(page.locator(".balloon[data-rev='B']")).toBeVisible();
    await page.locator("tr[data-rev='B']").getByRole("link", { name, exact: true }).press("Enter");
    await expect(page).toHaveURL(destination);
  });
}

test("revision buttons support keyboard selection and stay synchronized with the drawing", async ({ page }) => {
  await page.goto("/");
  const current = page.getByRole("button", { name: /^Highlight revision J:/ });
  const earlier = page.getByRole("button", { name: /^Highlight revision A:/ });
  const pressed = page.getByRole("button", { pressed: true });

  await expect(current).toBeEnabled();
  await expect(current).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: /^Highlight revision/ })).toHaveCount(9);
  // The drawing is one image, with no inaccessible controls in the tab order.
  await expect(page.getByRole("img", { name: /^Engineering drawing of a human brain/ })).toBeVisible();
  await expect(page.locator("#brain [tabindex]")).toHaveCount(0);

  await earlier.press("Enter");
  await expect(earlier).toBeFocused();
  await expect(earlier).toHaveAttribute("aria-pressed", "true");
  await expect(pressed).toHaveCount(1);
  await expect(page.locator(".balloon[data-rev='A']")).toHaveClass(/is-pinned/);

  // Space must toggle once through native button activation, not twice via bubbling.
  await earlier.press("Space");
  await expect(pressed).toHaveCount(0);
  await earlier.press("Enter");
  await earlier.press("Escape");
  await expect(pressed).toHaveCount(0);

  await page.locator(".balloon[data-rev='J']").click();
  await expect(current).toHaveAttribute("aria-pressed", "true");
  await expect(pressed).toHaveCount(1);
  await page.locator(".balloon[data-rev='J']").click();
  await expect(pressed).toHaveCount(0);
});

async function expectContentVisible(page) {
  const sections = page.locator(".reveal");
  expect(await sections.count()).toBeGreaterThan(0);
  for (const section of await sections.all()) {
    // Playwright's visibility check alone does not detect opacity: 0.
    await expect(section).toBeVisible();
    await expect(section).toHaveCSS("opacity", "1");
    await expect(section).toHaveCSS("transform", "none");
  }
}

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  for (const path of ["/", "/projects/"]) {
    test(`content remains visible at ${path}`, async ({ page }) => {
      await page.goto(path);
      await expectContentVisible(page);
    });
  }
});

test("content remains visible when scripts are blocked", async ({ page }) => {
  // Astro may inline small bundles, so block both inline and external scripts.
  await page.route("**/projects/", async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: { ...response.headers(), "content-security-policy": "script-src 'none'" },
    });
  });
  await page.goto("/projects/");
  await expectContentVisible(page);
});

test("content remains visible if reveal initialization throws", async ({ page }) => {
  await page.addInitScript(() => {
    window.IntersectionObserver = class {
      constructor() { throw new Error("Simulated observer setup failure"); }
    };
  });
  const failure = page.waitForEvent("pageerror", {
    predicate: (error) => error.message.includes("Simulated observer setup failure"),
  });
  await page.goto("/projects/");
  await failure;
  await expectContentVisible(page);
});

test("initialized reveals still show content when it scrolls into view", async ({ page }) => {
  await page.goto("/projects/");
  const footer = page.locator("footer");
  await expect(footer).toHaveClass(/is-pending/);
  await footer.scrollIntoViewIfNeeded();
  await expect(footer).not.toHaveClass(/is-pending/);
  await expect(footer).toHaveCSS("opacity", "1");
});

for (const path of ["/projects/", "/projects/jot/"]) {
  test(`Jot's screenshot stays accessible across themes at ${path}`, async ({ page }) => {
    await page.goto(path);
    const screenshot = page.getByRole("img", { name: "Jot editor screenshot", exact: true });
    await expect(screenshot).toHaveCount(1);
    await expect(screenshot).toHaveAttribute("src", "/img/jot-dark.png");

    await page.getByRole("button", { name: "Theme: auto. Change theme", exact: true }).click();
    await page.getByRole("button", { name: "Theme: light. Change theme", exact: true }).click();
    await expect(screenshot).toHaveCount(1);
    await expect(screenshot).toHaveAttribute("src", "/img/jot-light.png");
    await expect(screenshot).toBeVisible();

    await page.reload();
    await expect(screenshot).toHaveCount(1);
    await expect(screenshot).toHaveAttribute("src", "/img/jot-light.png");
  });
}
