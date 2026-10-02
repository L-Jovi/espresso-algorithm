// A test-only proxy for the built site. Faults affect responses, never the
// published files; removing a fault lets the same page exercise recovery.
import { createServer } from 'node:http'

export async function siteFixture(site) {
  const faults = new Map()
  const server = createServer(async (request, response) => {
    const path = new URL(request.url, 'http://localhost').pathname.slice(1)
    const fault = faults.get(path)
    try {
      if (fault) {
        response.writeHead(fault.status ?? 200, { 'content-type': 'text/javascript', 'cache-control': 'no-store' }).end(fault.body ?? '')
        return
      }
      const upstream = await fetch(new URL(request.url.slice(1), site))
      response.writeHead(upstream.status, {
        'content-type': upstream.headers.get('content-type') ?? 'application/octet-stream',
        'cache-control': 'no-store',
      }).end(Buffer.from(await upstream.arrayBuffer()))
    } catch {
      response.writeHead(502).end()
    }
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  return {
    faults,
    url: `http://127.0.0.1:${server.address().port}/`,
    close: () => new Promise(resolve => server.close(resolve)),
  }
}
