# Voltronix Automation — Updated Frontend

The latest update adapts the animation and industrial styling of https://prosaeed.vercel.app/ to this website's existing red, white, grey and charcoal palette. It adds floating equipment-photo panels, circuit/data-flow backgrounds, staggered entrances, red edge highlights and refined hover effects. See `REFERENCE_STYLE_UPDATE.md` for the scope and verification. Both RAR and ZIP include editable source and the ready-built `build/` folder.

Responsive React website for control panel engineering, automation applications and site contracting in Dubai and across the UAE. The current release has 14 public pages. Original business copy, photographs, links, SEO metadata and integrations are preserved. The top Services dropdown includes the six panel services and “From the Panel to the Field”; the Industries dropdown lists the six “Automation for Your Application” areas on desktop and mobile.

## Run the included production website

Install Node.js (22 or 24 recommended), extract the ZIP, and open a terminal in the extracted project folder:

```bash
cd Voltronix_Frontend_Updated
npm run preview
```

Open **http://localhost:4173**. This command uses only Node's built-in modules, so it works without installing npm dependencies when using the included build. Stop it with Ctrl+C. Opening `build/index.html` directly as a file is not supported; use the command above so assets and routes work correctly.

If port 4173 is busy, set the `PORT` environment variable before running the command.

## Edit and run the source

From the same project folder:

```bash
npm ci
npm start
```

Open **http://localhost:3000**. Source changes reload automatically. npm ci installs the exact packages from the included lockfile; it requires access to the npm registry. `node_modules/` is intentionally excluded from the ZIP.

## Animation controls

Use **Pause motion** in the homepage hero or mobile navigation to stop decorative animation. The choice is remembered locally, and all controls stay synchronized. Smaller/touch devices use quieter effects. Reduced-motion preferences, data-saving/2G connections where supported, and browsers without observer support get the complete static design. Continuous effects pause off screen or when the tab is hidden. Text is visible before JavaScript loads.

The reference's cyan/orange palette, personal biography, code sample and performance counters have not been added. Existing images and all company content remain. The graphics are decorative, not live equipment measurements. No new dependency, image download, font request or canvas/WebGL renderer is added. The measured increase in main JavaScript and CSS is 5,846 gzip bytes combined; live speed measurements were unavailable.

## Create a new production build

```bash
npm run build
```

The command runs the React build and then generates static HTML for the homepage, six original service pages, six automation application pages, the contracting page and the 404 page. It also creates the sitemap and robots.txt. Wait for the command to complete, including `postbuild`, before uploading the output.

Run the automated checks after building:

```bash
npm run test:ci
npm run verify
```

The tests use the generated HTML, so run `npm run build` after source changes before testing. `npm run verify` checks generated pages, assets, links, metadata, response handlers, caching and compression without contacting external services.

## Upload to the existing hosting

Upload the **contents of `build/`** to the document root serving https://voltronixautomation.ae/. Do not upload `src/`, `node_modules/` or the entire project as the public website.

Preserve the `services/`, `static/` and `media/` directories, plus `sitemap.xml`, `robots.txt`, `404.html`, `manifest.json`, icon files and `.htaccess`. The included `.htaccess` supports Apache/cPanel hosting; `_headers` supplies optional headers for hosts that support that format.

Known service URLs must serve their own generated `index.html`. Unknown URLs should return an HTTP 404, rather than a successful homepage response. The preview command demonstrates these responses. For Nginx or another server, configure equivalent directory-index serving, 404 handling, gzip/Brotli compression and cache headers.

This package does not change the live domain by itself. Rebuild and upload the new `build/` whenever website source changes.

## Where to change content

| Content | File |
| --- | --- |
| Company URL, phone, email and address | `src/data/site.json` |
| Six service titles, descriptions and capabilities | `src/data/services.json` |
| Image files and responsive variants | `public/media/`, `src/data/images.json` |
| Homepage layout | `src/components/HeroSection.js` |
| Reference-inspired styling | `src/ReferenceStyle.css` |
| Circuit background | `src/components/IndustrialBackdrop.js`, `src/components/IndustrialBackdrop.css` |
| Motion behavior and pause controls | `src/components/AutomationMotion.js`, `src/components/AutomationMotion.css` |
| Decorative equipment schematics | `src/components/PanelSchematic.js` |
| Service menu and carousel | `src/components/Navigation.js`, `src/components/ServicesSection.js` |
| Projects menu and application links | `src/components/Navigation.js`, `src/data/applications.json` |
| Application examples | `src/components/ProjectsSection.js` |
| Contact form and Zoho destination | `src/components/ContactSection.js` |
| SEO metadata and structured data | `src/seo/metadata.js` |
| Six automation application pages | `src/data/applications.json` |
| Contracting scope and project workflow | `src/data/contracting.json` |
| Additional homepage FAQs | `src/data/automation-faqs.json` |
| New sections and scoped styling | `src/components/ContentExpansion.css` |

The site URL in `site.json` should include HTTPS and omit the trailing slash. Company contact details and the Zoho destination are retained from the uploaded source; review them before publishing.

The project cards are labelled as illustrative applications. Replace them with verified project descriptions, approved photos and confirmed figures when available. Visitors can browse the application-example carousel with the arrows, touch scrolling, indicators or thumbnails. A focused project track also supports Left/Right, Home and End keys; reduced-motion settings are respected.

The top navigation follows the supplied reference with a larger original logo, Home, Services, About, Industries, Projects, Contact and a red Get a Quote button. Industries scrolls to the six application cards; its arrow opens links to their dedicated pages. Projects scrolls to the application-example carousel, About reaches the company approach section, and Get a Quote reaches the contact form. The “From the Panel to the Field” entry under Services scrolls to the existing contracting section. Dropdowns close on navigation, Escape or an outside tap, and only one opens at a time.

## Replacing original panel photos

The originals are retained in `public/`. The normal build uses the included optimized assets and does not require Python. To regenerate image variants after replacing the originals, optionally install Pillow and run:

```bash
python -m pip install Pillow
python scripts/optimize-images.py
npm run build
```

The image script creates WebP variants and JPEG fallbacks and updates the manifest. Previously generated hashed files are retained so older asset URLs are not removed automatically.

## Service integrations and verification limits

The contact form posts to the original Zoho Forms destination using the original field names. SalesIQ uses the original public widget configuration and loads after the initial page content. WhatsApp, phone and email links remain available. Inactive legacy chatbot modules are retained in source for reference and are not loaded by the website.

Build, DOM interaction and static-output checks are included. Browser screenshots, physical-device checks, live PageSpeed/Core Web Vitals measurements and real Zoho form delivery were not tested in this environment. Test the published site on an iPhone/Android phone, a tablet and a desktop, then make one controlled form submission through the live account.

See `REFERENCE_STYLE_UPDATE.md` for this release, `CONTENT_ADDITIONS.md` and `COLOR_UPDATE.md` for historical changes, `CHANGELOG.md` for release notes, and `SEO_NOTES.md` for the steps after deployment.
