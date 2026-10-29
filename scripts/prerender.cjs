/* Production pages are ordinary static HTML, hydrated by the existing React app. */
process.env.NODE_ENV = 'production';
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const site = require('../src/data/site.json');
const { getMetadata, getPublicRoutes } = require('../src/seo/metadata');
const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');
const temporary = path.join(root, '.prerender');
const cra = path.dirname(require.resolve('react-scripts/package.json'));
const webpack = require(require.resolve('webpack', { paths: [cra] }));
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

function headFor(metadata, assetTags, extraStyles = [], extraScripts = []) {
  const { title, description, canonical, image, notFound, structuredData } = metadata;
  return `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#e50914"><title>${escape(title)}</title>
<meta name="description" content="${escape(description)}"><meta name="robots" content="${notFound ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta name="author" content="${escape(site.name)}"><meta name="application-name" content="${escape(site.name)}">
<link rel="canonical" href="${escape(canonical)}"><link rel="alternate" hreflang="en-AE" href="${escape(canonical)}"><link rel="alternate" hreflang="x-default" href="${escape(canonical)}">
<link rel="icon" type="image/png" href="/icon-32.png"><link rel="apple-touch-icon" href="/icon-192.png"><link rel="manifest" href="/manifest.json">
<meta property="og:type" content="website"><meta property="og:locale" content="en_AE"><meta property="og:site_name" content="${escape(site.name)}">
<meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${escape(canonical)}"><meta property="og:image" content="${escape(image)}"><meta property="og:image:alt" content="${escape(title)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${escape(image)}">
<script id="page-structured-data" type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>
${extraStyles.map((file) => `<link rel="stylesheet" href="${escape(file)}">`).join('')}
${extraScripts.map((file) => `<link rel="preload" as="script" href="${escape(file)}">`).join('')}
${assetTags}`;
}

async function main() {
  if (!fs.existsSync(path.join(build, 'index.html'))) throw new Error('Run the React production build first.');
  fs.mkdirSync(temporary, { recursive: true });
  const sourceHtml = fs.readFileSync(path.join(build, 'index.html'), 'utf8');
  const builtHead = sourceHtml.match(/<head>([\s\S]*?)<\/head>/)[1];
  const assetTags = (builtHead.match(/<script\b[^>]*\bsrc=[^>]*><\/script>|<link\b[^>]*\brel="stylesheet"[^>]*>/g) || []).join('');
  const manifest = JSON.parse(fs.readFileSync(path.join(build, 'asset-manifest.json'), 'utf8'));
  const files = [...new Set(Object.values(manifest.files))];
  const seenStyles = new Set();
  const routeStyles = files.filter((file) => {
    if (!file.endsWith('.css')) return false;
    const content = fs.readFileSync(path.join(build, file.replace(/^\//, '')), 'utf8');
    const normalized = content.replace(/\/\*# sourceMappingURL=[^*]*\*\//g, '');
    if (!content.includes('.service-detail-page') || seenStyles.has(normalized)) return false;
    seenStyles.add(normalized);
    return true;
  });
  const routeScripts = files.filter((file) => /\.chunk\.js$/.test(file));
  await new Promise((resolve, reject) => {
    const compiler = webpack({
      mode: 'production', target: 'node', entry: path.join(__dirname, 'render-entry.jsx'),
      output: { path: temporary, filename: 'render.cjs', library: { type: 'commonjs2' }, chunkFilename: '[id].cjs' },
      externalsPresets: { node: true },
      externals: [({ request }, callback) => (!request.startsWith('.') && !path.isAbsolute(request)) ? callback(null, `commonjs ${request}`) : callback()],
      optimization: { minimize: false },
      module: { rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: { loader: require.resolve('babel-loader', { paths: [cra] }), options: { presets: [require.resolve('babel-preset-react-app', { paths: [cra] })] } } },
        { test: /\.css$/, use: path.join(__dirname, 'ignore-css-loader.cjs') }
      ] },
      resolve: { extensions: ['.js', '.jsx', '.json'] }
    });
    compiler.run((error, stats) => {
      compiler.close(() => {});
      if (error) reject(error);
      else if (stats.hasErrors()) reject(new Error(stats.toString({ all: false, errors: true })));
      else resolve();
    });
  });
  const { renderPage } = require(path.join(temporary, 'render.cjs'));
  const pages = [...getPublicRoutes(), '/404/'];
  for (const route of pages) {
    const metadata = getMetadata(route);
    const markup = await renderPage(route);
    const detail = route !== '/' && route !== '/404/';
    const pageSource = route.startsWith('/applications/') ? 'ApplicationDetailPage.js' : route === '/contracting/' ? 'ContractingPage.js' : 'ServiceDetailPage.js';
    const matchingScripts = routeScripts.filter((file) => {
      const mapPath = path.join(build, file.replace(/^\//, '') + '.map');
      return fs.existsSync(mapPath) && JSON.parse(fs.readFileSync(mapPath, 'utf8')).sources.some((source) => source.endsWith('/' + pageSource));
    });
    const pageChunkIds = matchingScripts.map((file) => path.basename(file).split('.')[0]);
    const matchingStyles = files.filter((file) => file.endsWith('.css') && pageChunkIds.includes(path.basename(file).split('.')[0]));
    const head = headFor(metadata, assetTags, detail ? (matchingStyles.length ? matchingStyles : routeStyles) : [], detail ? (matchingScripts.length ? matchingScripts : routeScripts) : []);
    let html = sourceHtml.replace(/<head>[\s\S]*?<\/head>/, `<head>${head}</head>`);
    html = html.replace(/<div id="root">\s*<\/div>/, () => `<div id="root">${markup}</div>`);
    if (!html.includes(markup)) throw new Error(`Failed to insert rendered content for ${route}`);
    const output = route === '/' ? path.join(build, 'index.html') : route === '/404/' ? path.join(build, '404.html') : path.join(build, route, 'index.html');
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, html);
    console.log(`Static HTML: ${route}`);
  }
  const urls = pages.filter((route) => route !== '/404/');
  fs.writeFileSync(path.join(build, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((route) => `  <url><loc>${escape(site.url + route)}</loc></url>`).join('\n')}\n</urlset>\n`);
  fs.writeFileSync(path.join(build, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
  const mainJs = files.find((file) => /\/main\.[^.]+\.js$/.test(file));
  const metrics = { staticPages: urls.length, mainJavaScriptGzipBytes: zlib.gzipSync(fs.readFileSync(path.join(build, mainJs))).length };
  fs.writeFileSync(path.join(build, 'build-report.json'), JSON.stringify(metrics, null, 2) + '\n');
  console.log(`Main JavaScript: ${(metrics.mainJavaScriptGzipBytes / 1024).toFixed(1)} KiB gzip. ${urls.length} indexable static pages.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => { fs.rmSync(temporary, { recursive: true, force: true }); });
