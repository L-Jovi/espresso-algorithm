import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { RaceWorkerClient } from './worker-client.js'

function setup(options = {}) {
  const messages = []
  const worker = { postMessage: message => messages.push(message), terminate() { this.stopped = true } }
  const client = new RaceWorkerClient(7, { createWorker: () => worker, ...options })
  const reply = (request, extra = {}) => worker.onmessage({ data: { ...request, type: request.type === 'init' ? 'ready' : request.type, ...extra } })
  return { client, worker, messages, reply }
}

describe('a race worker session', () => {
  it('correlates the ready handshake and ignores stale, duplicate and foreign replies', async () => {
    const { client, worker, messages, reply } = setup()
    try {
      const ready = client.ask({ type: 'init' })
      reply(messages[0])
      assert.equal((await ready).type, 'ready')
      const check = client.ask({ type: 'check', race: 'example' })
      let settled = false
      check.then(() => { settled = true })
      reply(messages[0])
      reply(messages[1], { runId: 6 })
      reply(messages[1], { requestId: 99 })
      await Promise.resolve()
      assert.equal(settled, false)
      reply(messages[1], { passed: true })
      assert.equal((await check).passed, true)
      assert.deepEqual(messages.map(({ runId, requestId }) => [runId, requestId]), [[7, 1], [7, 2]])
    } finally {
      client.terminate()
    }
    assert.equal(worker.stopped, true)
  })

  it('rejects only the request a worker error answers, and keeps the worker', async () => {
    const { client, worker, messages, reply } = setup()
    const timing = client.ask({ type: 'time', approach: 'recursion' })
    reply(messages[0], { type: 'error', approach: 'recursion', message: 'Maximum call stack size exceeded' })
    await assert.rejects(timing, { code: 'reply', approach: 'recursion', message: 'Maximum call stack size exceeded' })
    assert.equal(client.closed, undefined)
    assert.notEqual(worker.stopped, true)
    assert.equal(client.pending.size, 0)
    const next = client.ask({ type: 'time', approach: 'tabulation' })
    reply(messages[1], { ms: 1.5 })
    assert.equal((await next).ms, 1.5)
    client.terminate()
  })

  for (const failure of ['cancelled', 'error', 'messageerror', 'protocol', 'postMessage', 'timeout']) {
    it(`rejects pending work and releases the worker on ${failure}`, async () => {
      const { client, worker, messages, reply } = setup({ timeout: failure === 'timeout' ? 10 : 30_000 })
      if (failure === 'postMessage') worker.postMessage = () => { throw new Error('cannot clone') }
      const pending = client.ask({ type: 'check' })
      const code = ['error', 'messageerror', 'protocol', 'postMessage'].includes(failure) ? 'worker' : failure
      const rejected = assert.rejects(pending, { code })
      if (failure === 'cancelled') client.terminate()
      if (failure === 'error') worker.onerror({ preventDefault() {} })
      if (failure === 'messageerror') worker.onmessageerror()
      if (failure === 'protocol') reply(messages[0], { type: 'time' })
      await rejected
      assert.equal(worker.stopped, true)
      assert.equal(client.pending.size, 0)
      await assert.rejects(client.ask({ type: 'check' }), { code })
      client.terminate()
    })
  }

  it('surfaces a worker construction failure to the run handler', () => {
    assert.throws(() => new RaceWorkerClient(1, { createWorker() { throw new Error('blocked') } }), /blocked/)
  })
})
