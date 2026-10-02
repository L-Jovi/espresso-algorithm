import { it } from 'node:test'
import assert from 'node:assert/strict'
import { serve } from './serve.mjs'

it('directory redirects preserve query settings on GET and HEAD', async () => {
  const server = await serve('.', 0)
  try {
    const base = `http://127.0.0.1:${server.address().port}`
    for (const method of ['GET', 'HEAD']) {
      const response = await fetch(`${base}/visualizer?lang=zh&sort=bubble`, { method, redirect: 'manual' })
      assert.equal(response.status, 301)
      assert.equal(response.headers.get('location'), '/visualizer/?lang=zh&sort=bubble')
      assert.equal((await fetch(new URL(response.headers.get('location'), base), { method })).status, 200)
    }
  } finally {
    await new Promise(resolve => server.close(resolve))
  }
})
