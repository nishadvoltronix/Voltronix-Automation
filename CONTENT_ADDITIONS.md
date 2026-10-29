The notes below describe the earlier content/navigation releases. The current reference-palette update is documented in COLOR_UPDATE.md and COLOR_PRESERVATION.json.

# Automation content and contracting expansion

## New application content

Six application pages are linked from a new homepage section using the existing service-card design:

- Swimming pool automation: filtration pumps, schedules, level/status monitoring and equipment interfaces.
- Fountains and water features: pump sequences, lighting or show-controller interfaces, operating modes and monitoring.
- Pumping and water systems: booster, transfer and drainage applications with duty/standby and pressure/level control.
- HVAC and building services: equipment controls, field instruments and BMS interfaces.
- Machinery and conveyors: PLC sequences, HMI controls, drive interfaces and equipment status.
- Heating and process control: heater interfaces, temperature signals, specified power controllers and functional checks.

Each page includes an overview, typical control scope, operation/maintenance considerations, quotation inputs, related control-panel services and a link to site contracting. Existing panel photographs are reused and identified as illustrative hardware rather than as new project case studies.

## Contracting content

A new homepage section and dedicated contracting page explain:

- Control and instrumentation cable pulling and cable identification.
- Cable trays, ladders, trunking, supports and fittings.
- Glanding, ferruling, labelling and terminations.
- Connections between panels and specified field devices.
- Point-to-point, I/O and agreed functional checks.
- Commissioning support, retrofits, troubleshooting and maintenance.

The page also includes a four-step project workflow, a site quotation checklist and contracting FAQs. Equipment interfaces and installation boundaries are described as items to agree in the project scope.

Four additional homepage FAQs explain combined panel/site work, pool/fountain applications, existing PLC/BMS integration and the information needed for a quotation. Two footer links make the additions easy to find. The subsequent navigation update adds “From the Panel to the Field” under Services and the six application areas under a new Projects arrow; clicking Projects scrolls to the application cards.

## Preservation and validation

- The original homepage hero, six services, Why Us and contact section retain their content and design. Application example text, colors and dashboard layouts are retained within the subsequently added swipeable Projects track. The navigation is updated only to expose the requested contracting and application links.
- The main content of all six original service pages matches the previous production HTML exactly.
- All existing images and the original service/company data are unchanged. Eleven original stylesheets are unchanged. ProjectsSection.css retains its existing rules and adds scoped carousel controls and scrolling styles; Navigation.css retains its existing rules and adds dropdown-heading and contracting-link placement styles.
- Original page titles, descriptions, canonical URLs and sharing-image URLs are preserved for the original seven pages.
- 87 protected source and asset files remain byte-for-byte unchanged. The Projects and Navigation component/style files are excluded because the user requested carousel and menu changes.
- Routing, homepage composition and footer source changes are strictly additive. Rendering, sitemap and SEO helpers are extended for the new URLs.
- The CI production build succeeds and all 44 automated interaction/hydration checks pass. The navigation grouping update preserves the main content and footer of all 14 pages exactly against the preceding ZIP.
- Static-output verification passes for 14 pages, 441 local links and 42 image placements, including referenced image candidates, scripts, stylesheets, metadata, sitemap, redirects, 404s, compression and cache behavior.

Visual browser/device checks and live third-party form delivery were not performed in this environment. No new npm dependency, external image request or web-font dependency is added.

## Run and publish

From the extracted `Voltronix_Frontend_Updated` folder:

```bash
npm run preview
```

Open http://localhost:4173. The ready production build is included and this preview command does not require npm dependencies. For source development, run `npm ci` and `npm start`.

Upload the complete contents of `build/` to apply the update to the existing hosting. The generated sitemap now includes the six additional application URLs and `/contracting/`; submit the updated sitemap in Search Console after publication.

## New public URLs

- `/applications/swimming-pool-automation/`
- `/applications/fountain-water-feature-automation/`
- `/applications/pump-water-system-automation/`
- `/applications/hvac-building-automation/`
- `/applications/machinery-conveyor-automation/`
- `/applications/heating-process-automation/`
- `/contracting/`
