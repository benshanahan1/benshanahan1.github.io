# benshanahan.dev

Astro site for benshanahan.dev, drawn as an engineering drawing set.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm test         # browser regression tests against a fresh production build
npm run deploy   # build, then push dist/ to the master branch (GitHub Pages)
npm run cv       # recompile the CV into public/cv.pdf (needs Docker)
```

For the first test run, install Chromium with `npx playwright install chromium`.
The tests cover revision selection and keyboard links, content visibility when
JavaScript is unavailable, and Jot screenshot descriptions across themes.

## Where things live

- `src/data/revs.js`: the revision history. One list feeds both the home page table and the flags in the brain figure.
- `src/data/site.js`: name, contact links and press.
- `src/content/projects/*.md`: one file per project. Frontmatter makes the card on /projects/; the body is the project page. Set `listed: false` to keep a page live without linking to it (Shelfie, for now).
  - A paragraph holding only `![alt](/img/x.jpg "Caption")` becomes a numbered figure.
  - For videos or anything else, use `<figure class="fig" data-caption="Caption">...</figure>`.
- `src/pages/`: home, projects list, and the project page template.
- `src/scripts/brain.js`: Fig. 1. It's seeded, so it draws the same every time.
- `src/scripts/sheet.js`: frame zone markers, reveal on scroll, theme toggle, and the 1 and 2 keys.
- `src/styles/global.css`: all styles. Colors are tokens at the top, with dark mode below them.
- `public/brand/`: favicon and logo (see `docs/brand.md`).
- `cv/`: LaTeX source for the CV. Edit it, run `npm run cv`, and commit `public/cv.pdf`. It compiles with pdfLaTeX in the `texlive/texlive` Docker image, and the date on the CV is the day you ran it. The site links to `/cv.pdf`.

If you change `src/lib/figures.mjs`, delete `.astro/` before building. Astro caches rendered Markdown.
