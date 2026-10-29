/* Optional local production preview, without a global "serve" dependency. */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const root = path.resolve(__dirname, '../build');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.map': 'application/json' };

function resolveRequest(requestUrl) {
  const url = new URL(requestUrl, 'http://localhost');
  let decoded;
  try { decoded = decodeURIComponent(url.pathname); } catch { return { status: 400 }; }
  if (decoded.includes('\0')) return { status: 400 };
  let file = path.resolve(root, '.' + decoded);
  if (file !== root && !file.startsWith(root + path.sep)) return { status: 403 };
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!url.pathname.endsWith('/')) return { status: 301, location: url.pathname + '/' + url.search };
    file = path.join(file, 'index.html');
  }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return { status: 404, file: path.join(root, '404.html') };
  return { status: 200, file };
}

function handleRequest(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
  let resolved;
  try { resolved = resolveRequest(req.url); } catch { res.writeHead(400); res.end('Bad request'); return; }
  if (resolved.location) { res.writeHead(resolved.status, { Location: resolved.location }); res.end(); return; }
  if (!resolved.file || !fs.existsSync(resolved.file)) { res.writeHead(resolved.status); res.end('Not found'); return; }
  const extension = path.extname(resolved.file);
  const stat = fs.statSync(resolved.file);
  const etag = `"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
  const headers = {
    'Content-Type': types[extension] || 'application/octet-stream',
    'Cache-Control': /\.[a-f0-9]{8,}\./i.test(path.basename(resolved.file)) ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
    'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', ETag: etag
  };
  if (resolved.status === 200 && req.headers['if-none-match'] === etag) { res.writeHead(304, headers); res.end(); return; }
  let content = fs.readFileSync(resolved.file);
  if (['.html', '.js', '.css', '.json', '.xml', '.txt', '.svg'].includes(extension)) {
    headers.Vary = 'Accept-Encoding';
    if (/\bgzip\b/.test(req.headers['accept-encoding'] || '')) { content = zlib.gzipSync(content); headers['Content-Encoding'] = 'gzip'; }
  }
  headers['Content-Length'] = content.length;
  res.writeHead(resolved.status, headers);
  res.end(req.method === 'HEAD' ? undefined : content);
}

if (require.main === module) {
  if (!fs.existsSync(path.join(root, 'index.html'))) { console.error('Run npm run build first.'); process.exit(1); }
  const port = Number(process.env.PORT || 4173);
  const host = process.env.HOST || '0.0.0.0';
  http.createServer(handleRequest).listen(port, host, () => console.log(`Production preview: http://localhost:${port}`));
}
module.exports = { resolveRequest, handleRequest };
