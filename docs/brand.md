# Brand mark

The mark is a top view of a Utah electrode array (the BrainGate implant) drawn inside the drawing-sheet border: a 4×4 grid of electrodes with the corners unpopulated, as on the real part. It also reads as a connector pin face, which ties neuro work to hardware. It uses ink only (no violet accent), sharp corners and no letters, in the site's charcoal palette.

Geometry: 32-unit grid, 2-unit border, 4-unit electrodes on a 6-unit pitch. Every edge lands on a whole unit, so it renders crisp at 32 px and on 2× screens at 16 px. The 16 px frame of the `.ico` is drawn pixel by pixel.

## Files

| File | Size | Notes |
| --- | --- | --- |
| `favicon.svg` | vector | Transparent. Ink `#21262e` (charcoal), switching to `#f0f0f0` through `prefers-color-scheme: dark` inside the SVG. Modern browsers use this one. |
| `favicon.ico` | 16 + 32 | Fallback. Ink `#21262e` on paper `#f0f0f0`, so it shows on light and dark tab strips. The 16 px frame is hand-pixeled. |
| `apple-touch-icon.png` | 180 | Paper background. The mark fills 128 of 180 px, so the iOS corner mask clears the border. |
| `icon-192.png` | 192 | Paper background. The mark is 50% of the canvas, inside the maskable safe zone. |
| `icon-512.png` | 512 | Paper background. The mark is 56% of the canvas, inside the maskable safe zone. Also usable as a social avatar. |
| `logo.svg` | vector | The same mark with `width`/`height` set to 512 and an `aria-label`, for the masthead, OG card corner, etc. Adapts to light/dark like the favicon. |
| `site.webmanifest` | | Points to the 192/512 icons. |

## `<head>` tags

Paths assume the files are served from the site root. In the prototype they live under `brand/`, so prefix with `brand/` (or `/brand/`) until the Astro port moves them to `public/`.

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#f0f0f0" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#21262e" media="(prefers-color-scheme: dark)">
```

Keep the `.ico` line first with `sizes="32x32"`. Browsers that understand SVG favicons then prefer the SVG, and older ones fall back to the ICO.
