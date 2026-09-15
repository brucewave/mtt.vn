/**
 * Serves `out/` the way Apache will after the cPanel deploy.
 *
 * `next start` cannot run an `output: 'export'` build, and opening the files
 * straight off disk hides the one thing worth checking — that /du-an really
 * does resolve to du-an.html, which is the rule public/.htaccess installs on
 * the server.
 *
 *   npm run preview
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.join(process.cwd(), 'out')
const PORT = Number(process.env.PORT ?? 3411)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

if (!fs.existsSync(ROOT)) {
  console.error('No out/ directory — run `npm run build` first.')
  process.exit(1)
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0])

    // Same order as the .htaccess rules: the file itself, a directory index,
    // then the `.html` the exporter wrote for that route.
    for (const file of [
      path.join(ROOT, url),
      path.join(ROOT, url, 'index.html'),
      path.join(ROOT, url.replace(/\/$/, '') + '.html'),
    ]) {
      if (fs.existsSync(file) && fs.statSync(file).isFile()) {
        res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' })
        return fs.createReadStream(file).pipe(res)
      }
    }

    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' })
    fs.createReadStream(path.join(ROOT, '404.html')).pipe(res)
  })
  .listen(PORT, () => console.log(`Serving out/ on http://localhost:${PORT}`))
