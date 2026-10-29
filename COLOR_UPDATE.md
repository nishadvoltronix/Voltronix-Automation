# Historical Reference Palette Update — 14 October 2026

This document records the earlier palette-only release. Its layout and markup preservation statements apply to that release. The current reference-inspired style update retains the same main colors and business content while changing presentation; see `REFERENCE_STYLE_UPDATE.md`.

The uploaded frontend now uses the palette from https://voltronix-automation.vercel.app/, read from its published stylesheet on 14 October 2026. This update preserves the uploaded project's modern layout, spacing, typography, responsive breakpoints, original content, images, navigation, carousels and form behavior.

| Role | Color |
| --- | --- |
| Brand red | `#e50914` |
| Dark red / readable text on pale red backgrounds | `#b90d16` |
| Pale red | `#fff1f2` |
| Charcoal | `#17191d` |
| Footer | `#111318` |
| Main text | `#151b26` |
| Light grey surface | `#f5f7fa` |
| Muted text | `#647184` |
| Border | `#e4e8ed` |
| White | `#ffffff` |

The navigation is white with dark labels and red accents. Service/application cards use white surfaces with red details. The Why Us section uses the reference's charcoal-to-dark-red background, with light text. The footer is charcoal with readable light text and a white logo background. Buttons, forms, focus indicators, carousel controls and detail pages use the same palette. Existing green status/WhatsApp colors are preserved.

Small text on pale red backgrounds uses the darker red shade for readability. Key text-color pairs were checked numerically: white on the main red is 4.79:1, dark red on pale red is 6.10:1, muted text on light grey is 4.62:1, Why Us copy at the brightest card background is 5.28:1, and footer copy is 11.74:1. These are selected contrast checks, not a complete accessibility audit.

Edit the shared colors in `src/index.css`. Matching service/application/project colors are in `src/data/services.json`, `src/data/applications.json`, `src/data/contracting.json` and `src/components/ProjectsSection.js`. Browser theme colors are in `public/index.html`, `public/manifest.json` and `scripts/prerender.cjs`.

## Run

The archives contain a single `Voltronix_Frontend_Updated` folder, editable source, and the finished production website in `build/`. Dependencies are excluded.

For development:

```bash
cd Voltronix_Frontend_Updated
npm ci
npm start
```

Open http://localhost:3000. This project uses Create React App; its development script is `npm start`.

To preview the included production build without installing dependencies:

```bash
npm run preview
```

Open http://localhost:4173. Rebuild after editing with `npm run build`. Upload the contents of `build/` to update the live website.

## Verification

The production build, existing automated interaction/hydration checks and production-output verification are included. `COLOR_PRESERVATION.json` records the palette and preservation checks against the uploaded source. The historical `CONTENT_PRESERVATION.json` records earlier content/navigation work.

The CI production build and all 44 interaction/hydration checks pass. Production verification covers 14 pages, 441 internal links, 42 image placements, sitemap, redirects, 404s, compression and cache headers. All 14 stylesheet layouts/breakpoints and 54 original public assets are preserved; the 14 pages retain their content, markup and SEO metadata apart from palette values and browser theme colors.

Visual browser and physical-device testing were unavailable in this environment. The published site and live Zoho form delivery have not been changed or tested by this color update.
