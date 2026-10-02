// Serve a folder over HTTP, for looking at the site locally and for the
// browser checks in CI: `node scripts/serve.mjs [folder] [port]`, by default
// the repository itself on port 8080. It answers GET and HEAD for files
// inside the folder, with index.html for a folder, and nothing else.
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, resolve, sep } from 'node:path'

const TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
}

export function serve(folder = '.', port = 8080) {
  const root = resolve(folder)
  const server = createServer(async (request, response) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405).end()
      return
    }
    try {
      const { pathname, search } = new URL(request.url, 'http://localhost')
      let path = resolve(root, `.${decodeURIComponent(pathname)}`)
      if (path !== root && !path.startsWith(root + sep)) throw new Error('outside the folder')
      if ((await stat(path)).isDirectory()) {
        if (!pathname.endsWith('/')) {
          response.writeHead(301, { location: `${pathname}/${search}` }).end()
          return
        }
        path = join(path, 'index.html')
      }
      await stat(path)
      response.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream', 'cache-control': 'no-store' })
      if (request.method === 'HEAD') response.end()
      else createReadStream(path).pipe(response)
    } catch {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found')
    }
  })
  return new Promise(resolvePromise => server.listen(port, '127.0.0.1', () => resolvePromise(server)))
}

if (import.meta.main) {
  const [folder = '.', port = '8080'] = process.argv.slice(2)
  const server = await serve(folder, Number(port))
  console.log(`Serving ${resolve(folder)} at http://127.0.0.1:${server.address().port}/`)
}
