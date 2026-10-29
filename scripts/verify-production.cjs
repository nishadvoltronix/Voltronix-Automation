const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const zlib = require('node:zlib');
const cra = path.dirname(require.resolve('react-scripts/package.json'));
const { JSDOM } = require(require.resolve('jsdom', { paths: [cra] }));
const { resolveRequest, handleRequest } = require('./preview.cjs');
const services = require('../src/data/services.json');
const applications = require('../src/data/applications.json');
const { getMetadata, getPublicRoutes } = require('../src/seo/metadata');
const root = path.resolve(__dirname, '../build');
const routes = getPublicRoutes();
const titles = new Set();
let checkedLinks = 0;
let checkedImages = 0;
for (const route of routes) {
  const file = path.join(root, route, 'index.html');
  const document = new JSDOM(fs.readFileSync(file, 'utf8')).window.document;
  const metadata = getMetadata(route);
  assert.equal(document.title, metadata.title);
  assert.equal(document.querySelector('link[rel="canonical"]').getAttribute('href'), metadata.canonical);
  assert.equal(document.querySelectorAll('h1').length, 1);
  assert.equal(document.querySelectorAll('main').length, 1);
  assert.equal(document.querySelectorAll('script[type="application/ld+json"]').length, 1);
  JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
  assert.ok(document.querySelector('meta[name="robots"]').content.startsWith('index, follow'));
  titles.add(document.title);
  for (const image of document.querySelectorAll('img')) {
    assert.ok(fs.existsSync(path.join(root, image.getAttribute('src'))));
    assert.ok(/\.(jpg|png)$/.test(image.getAttribute('src')), 'A JPEG/PNG fallback must be available.');
    assert.ok(image.getAttribute('alt'));
    assert.ok(Number(image.getAttribute('width')) > 0 && Number(image.getAttribute('height')) > 0);
    const source = image.closest('picture')?.querySelector('source[type="image/webp"]');
    assert.ok(source?.getAttribute('srcset'));
    for (const candidate of source.getAttribute('srcset').split(',')) assert.ok(fs.existsSync(path.join(root, candidate.trim().split(' ')[0])));
    checkedImages++;
  }
  for (const asset of document.querySelectorAll('script[src], link[rel="stylesheet"], link[rel="preload"]')) assert.ok(fs.existsSync(path.join(root, asset.getAttribute('src') || asset.getAttribute('href'))));
  for (const link of document.querySelectorAll('a[href]')) {
    const href = link.getAttribute('href');
    if (href.startsWith('/')) { assert.equal(resolveRequest(href).status, 200, `${route}: ${href}`); checkedLinks++; }
  }
  if (route !== '/') {
    assert.ok([...document.querySelectorAll('link[rel="stylesheet"]')].some((link) => fs.readFileSync(path.join(root, link.getAttribute('href')), 'utf8').includes('.service-detail-page')), 'Service CSS must be present before hydration.');
    assert.ok(document.querySelector('.service-detail-bullets li'));
    if (route !== '/contracting/') assert.ok(document.querySelector('meta[property="og:image"]').content.includes('/media/'));
  } else {
    assert.equal(document.querySelectorAll('#services .service-card').length, 6);
    assert.equal(document.querySelectorAll('#projects-track .project-slide').length, 3, 'All project examples must be prerendered.');
    assert.equal(document.querySelectorAll('#projects-track .project-slide[aria-hidden="false"]').length, 1);
    assert.ok(document.querySelector('#projects [aria-label="Previous application example"]').hasAttribute('disabled'));
    assert.ok(!document.querySelector('#projects [aria-label="Next application example"]').hasAttribute('disabled'));
    assert.equal(document.querySelectorAll('#applications .expansion-application-card').length, applications.length);
    assert.ok(document.getElementById('contracting'));
    assert.ok(document.getElementById('automation-faqs'));
    assert.ok(document.getElementById('contact'));
    assert.ok(document.querySelector('#quotation-form input[name="Email"]'));
  }
  console.log(`Verified HTML, metadata, content and assets: ${route}`);
}
assert.equal(titles.size, routes.length);
const sitemap = new JSDOM(fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8'), { contentType: 'application/xml' }).window.document;
assert.equal(sitemap.querySelectorAll('url').length, routes.length);
assert.equal(sitemap.querySelector('parsererror'), null);
assert.equal(resolveRequest('/services/plc-panels').status, 301);
assert.equal(resolveRequest('/services/not-a-service/').status, 404);
assert.equal(resolveRequest('/applications/not-an-application/').status, 404);
assert.equal(resolveRequest('/contracting').status, 301);
assert.equal(resolveRequest('/missing-file.js').status, 404);
const missing = new JSDOM(fs.readFileSync(path.join(root, '404.html'), 'utf8')).window.document;
assert.equal(missing.querySelector('meta[name="robots"]').content, 'noindex, follow');
function request(url, options = {}) {
  let result;
  handleRequest({ method: options.method || 'GET', url, headers: options.headers || {} }, {
    writeHead(status, headers) { result = { status, headers }; },
    end(body) { result.body = body; }
  });
  return result;
}
const compressed = request('/', { headers: { 'accept-encoding': 'gzip' } });
assert.equal(compressed.status, 200);
assert.equal(compressed.headers['Content-Encoding'], 'gzip');
assert.ok(zlib.gunzipSync(compressed.body).toString().includes('Control Panel Supplier'));
assert.equal(request('/', { method: 'HEAD' }).body, undefined);
assert.equal(request('/', { headers: { 'if-none-match': compressed.headers.ETag } }).status, 304);
assert.equal(request('/does-not-exist/').status, 404);
assert.equal(request('/', { method: 'POST' }).status, 405);
const hashedImage = require('../src/data/images.json')['plc-hero'].src;
assert.ok(request(hashedImage).headers['Cache-Control'].includes('immutable'));
console.log(`Verified ${routes.length} pages, ${checkedLinks} local links, ${checkedImages} image placements, sitemap, redirects, 404s, gzip and cache headers. No external forms or chat services were contacted.`);
