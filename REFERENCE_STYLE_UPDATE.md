# Reference-Inspired Automation Style — 15 October 2026

The newly attached RAR is the starting point. The published styles and animation components at https://prosaeed.vercel.app/ were inspected to adapt their visual behavior to Voltronix's existing branding and content.

## Adapted styling

- An industrial circuit background with drifting grids, subtle equipment symbols, soft red light, moving data signals and a scanning line.
- Floating equipment-photo panels, technical corners and decorative PLC/drive schematics. At 1280px and wider, the original PLC and VFD cards flank the hero copy, reflecting the reference's side-panel arrangement. Both photos remain available on smaller screens.
- Short staggered entrances for hero copy, section headings and cards. All text remains visible before JavaScript and throughout these effects.
- Red gradient edge highlights, card lift, icon scaling, pointer hover effects, animated navigation underlines and rounded technical surfaces.
- The same brand palette, including white/light-grey surfaces, main red `#e50914`, dark red `#b90d16`, charcoal `#17191d`, and the existing footer/Why Us schemes.

The reference's personal content, sample program, statistics, cyan/orange theme and external fonts are not part of this release. Decorative graphics contain no live readings or added project-performance claims.

## Content preservation

All original homepage and detail-page copy, routes, links, metadata/schema, photographs, contact details and integrations are retained. The Services and Projects dropdowns and both swipe/arrow carousels keep their behavior. Main color variables in `src/index.css`, six data files, 56 public files and package manifests remain byte-identical to the attachment.

The new pause controls are the only added interface wording. A static-output comparison checks all 14 pages, removing those controls when comparing original copy and navigation. Footer and quotation-form markup match the uploaded build exactly. The hero's layout/frames change while its photo sources, captions and alternative text remain.

## Motion and performance

Use the pause icon in the desktop navigation, or **Pause motion** in the mobile menu/hero. Controls synchronize and remember the choice in browser storage. Blocking browser storage does not prevent the controls from working during the visit.

Smaller/touch devices get a quieter mode with small data signals and short entrances. They do not run the floating photo panels, moving grids, rotating symbols, scanning line or moving light effects. Reduced-motion settings, data-saving/2G connections where exposed by the browser, and browsers without IntersectionObserver receive the static design. Preferences can change during the visit.

Continuous section effects pause outside the viewport. The background and all effects pause in hidden tabs. Native CSS runs the animations; JavaScript observes visibility and preferences, without adding an animation loop. All new keyframes use only transforms and opacity. There are no new dependencies, external font calls, image/video downloads, canvas renderer or WebGL engine.

| Active main bundle | Uploaded gzip bytes | Updated gzip bytes | Increase |
| --- | ---: | ---: | ---: |
| JavaScript | 78,893 | 81,594 | 2,701 |
| CSS | 7,082 | 10,227 | 3,145 |
| Combined | 85,975 | 91,821 | 5,846 |

These measurements use identical Node `zlib.gzipSync` settings on the active manifest entrypoints. They describe transfer size, not actual loading time or a PageSpeed score. Hosting, network and device still determine live performance.

## Verification

- `CI=true npm run build`: passes, including static output for all 14 public pages and the 404 page.
- `CI=true npm run test:ci`: **57 checks pass**, covering carousels, mobile/desktop dropdowns, keyboard behavior, form validation, phone normalization, deferred chat, metadata, all page hydrations with motion enabled, stored-pause/reduced-motion hydration, visibility, pause persistence and synchronized controls.
- `npm run verify`: passes for 14 pages, 441 local links, 42 image placements, assets, metadata/schema, sitemap, redirects, 404s, gzip and cache headers.
- `REFERENCE_STYLE_VERIFICATION.json` records the attached-build comparison, preserved files and compressed bundle sizes. All new styles parse; the keyframe property audit contains only transform and opacity.

Browser screenshots, rendered mobile/device checks, live Core Web Vitals measurements and actual Zoho form delivery were unavailable. The live domain was not changed. This package is a reference-inspired adaptation; a rendered visual match has not been certified. Earlier color/content preservation reports describe their historical releases.

## Run

Extract either archive and open a terminal in `Voltronix_Frontend_Updated`.

For development, with Node 22 or 24 recommended:

```bash
npm ci
npm start
```

Open http://localhost:3000. The development script is `npm start`.

To view the included production build without installing dependencies:

```bash
npm run preview
```

Open http://localhost:4173. Rebuild after editing with `npm run build`, then upload the **contents of `build/`** to the existing hosting.

## Files to edit

| Purpose | File |
| --- | --- |
| Shared industrial style and responsive hero | `src/ReferenceStyle.css` |
| Background circuits and symbols | `src/components/IndustrialBackdrop.js`, `src/components/IndustrialBackdrop.css` |
| Motion preferences, visibility and controls | `src/components/AutomationMotion.js`, `src/components/AutomationMotion.css` |
| Decorative photo-panel details | `src/components/PanelSchematic.js` |
| Existing hero copy and photos | `src/components/HeroSection.js` |
| Original brand tokens | `src/index.css` |
