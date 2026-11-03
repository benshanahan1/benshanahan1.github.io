import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import figures from "./src/lib/figures.mjs";

export default defineConfig({
  site: "https://benshanahan.dev",
  devToolbar: { enabled: false },
  markdown: { processor: unified({ rehypePlugins: [figures] }) },
});
