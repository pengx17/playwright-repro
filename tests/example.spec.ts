import {
  test as base,
  _electron,
  expect,
  ElectronApplication,
} from "@playwright/test";

const root = __dirname + "/..";

const test = base.extend<{
  electronApp: ElectronApplication;
}>({
  electronApp: async ({}, use) => {
    const app = await _electron.launch({ args: [root] });
    await use(app);
  },
  page: async ({ electronApp }, use) => {
    const page = await electronApp.firstWindow();
    await use(page);
  },
});

test("start", async ({ page, electronApp }) => {
  expect(electronApp).toBeDefined();
  await expect(page.locator("body")).toBeVisible();
});
