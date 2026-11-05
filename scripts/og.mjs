// Render the link-preview card (public/og.png, 1200x630) from the home page's Fig. 1.
// Run against a dev server whenever the figure or the title changes: npm run dev, then npm run og.
import { chromium } from "@playwright/test";
import { CURRENT_REV } from "../src/data/revs.js";

const url = process.argv[2] || "http://localhost:4321/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: "reduce", colorScheme: "light" });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForSelector("#brain svg");
await page.evaluate(() => document.fonts.ready);

await page.evaluate((rev) => {
  const figure = document.querySelector(".figure");
  figure.querySelector("figcaption").remove();
  const card = document.createElement("div");
  card.innerHTML = `
    <div class="og-text">
      <p class="mono og-tag">BS-001 &nbsp; Rev ${rev}</p>
      <h1 class="og-name">Benjamin<br>Shanahan</h1>
      <p class="og-role">Co-founder of Senra. AI and robotics for high-mix assembly.</p>
      <p class="mono og-url">benshanahan.dev</p>
    </div>`;
  card.className = "og";
  card.append(figure);
  document.body.replaceChildren(card);
  const css = document.createElement("style");
  css.textContent = `
    html, body { width: 1200px; height: 630px; overflow: hidden; }
    .og { position: absolute; inset: 22px; border: 1px solid var(--ink); display: grid; grid-template-columns: 430px 1fr; }
    .og::after { content: ""; position: absolute; inset: 10px; border: 1px solid var(--line); pointer-events: none; }
    .og-text { padding: 56px 0 56px 58px; display: flex; flex-direction: column; }
    .og-tag { color: var(--ink-3); font-size: 13px; margin: 0; }
    .og-name { font: 400 84px/0.95 var(--f-display); letter-spacing: -0.015em; margin: 26px 0 22px; }
    .og-role { color: var(--ink-2); font-size: 21px; line-height: 1.4; margin: 0; }
    .og-url { margin: auto 0 0; font-size: 14px; color: var(--hl); }
    .og .figure { margin: 0; padding: 36px 44px 30px 0; display: grid; place-items: center; min-width: 0; }
    .og #brain, .og #brain svg { width: 100%; height: 100%; max-height: 540px; }`;
  document.head.append(css);
}, CURRENT_REV);
await page.waitForTimeout(300);
await page.screenshot({ path: "public/og.png" });
await browser.close();
console.log("Wrote public/og.png");
