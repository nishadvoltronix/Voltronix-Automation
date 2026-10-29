# SEO implementation and next steps

## Included in the code

- Homepage title and heading target the company's relevant service and location: control panel supply and manufacturing in Dubai.
- The six original service URLs, six application URLs and contracting URL each have unique titles, descriptions, canonical URLs, sharing metadata and descriptive content.
- Production pages contain the actual rendered content before JavaScript runs. The React app attaches interactive behavior to that content.
- Navigation, service cards, related services and footer links are real, crawlable links.
- Organization, WebSite and WebPage structured data describe the company and website. Each service page also includes Service and BreadcrumbList data.
- Organization contact details and service areas come from the uploaded source. No review scores, invented certifications or customer results were added.
- `sitemap.xml` lists the 14 public pages. `robots.txt` allows access and references the sitemap.
- Unknown pages display a useful 404 screen and use `noindex`. The supplied preview server returns HTTP 404 for unknown paths.
- Images have useful alternative text, declared dimensions, responsive sources and optimized formats. Content is readable without animation delays.
- The homepage metadata is restored after navigating back from a service page; it no longer retains the previous service title or canonical URL.

## After uploading the production build

1. In your existing Google Search Console property, submit **https://voltronixautomation.ae/sitemap.xml**.
2. Inspect the homepage and each service, application and contracting URL with URL Inspection. Confirm Google can fetch the page, see the correct canonical URL and read its content. Request indexing where appropriate.
3. Check the published service URLs by opening them directly. They should show the correct content after refresh and should not fall back to the homepage.
4. Check that the hosting applies compression and long-lived caching to hashed JS, CSS and media files. HTML should revalidate so updates are discoverable.
5. Measure the live site with PageSpeed Insights, especially on mobile. Hosting latency, network conditions and third-party chat can affect the result. No live speed score is claimed in this package.
6. Maintain accurate company details in the website and Google Business Profile. Add genuine project photographs, useful specifications and verified case studies as the business completes work.
7. Monitor Search Console indexing and relevant search queries over the following weeks, including control panel supplier in Dubai, PLC panels, VFD panels and MCC panels. Improve content around real enquiries rather than repeating keywords unnaturally.

Technical SEO helps search engines find and understand the site; it cannot guarantee a first-page position. Search results also depend on useful content, competition and other ranking signals, and changes can take time to appear.

Official references:

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- JavaScript SEO: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Image loading: https://web.dev/articles/browser-level-image-lazy-loading
- React static rendering and hydration: https://react.dev/reference/react-dom/server/renderToPipeableStream and https://react.dev/reference/react-dom/client/hydrateRoot
