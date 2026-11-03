import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4337",
    browserName: "chromium",
    colorScheme: "light",
    reducedMotion: "no-preference",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    // Keep Astro in the foreground so Playwright owns and stops the test server.
    command: "npm run build && npm run preview -- --host 127.0.0.1 --port 4337 --ignore-lock",
    url: "http://127.0.0.1:4337",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
