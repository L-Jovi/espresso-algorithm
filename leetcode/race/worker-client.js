// One worker belongs to one run. Replies must identify both that run and
// the request, so a late or duplicate reply cannot settle another request.
// An error reply answers one request only: the worker caught the exception,
// such as a stack overflow in one approach, and stays usable for the next.
export class RaceWorkerClient {
  constructor(runId, {
    createWorker = () => new Worker(new URL('race-worker.js', import.meta.url), { type: 'module' }),
    timeout = 30_000,
  } = {}) {
    this.runId = runId
    this.timeout = timeout
    this.pending = new Map()
    this.nextRequestId = 0
    this.worker = createWorker()
    this.worker.onmessage = ({ data }) => {
      if (data?.runId !== this.runId) return
      const request = this.pending.get(data.requestId)
      if (!request) return
      if (data.type !== 'error' && data.type !== request.replyType) {
        this.terminate('worker')
        return
      }
      clearTimeout(request.timer)
      this.pending.delete(data.requestId)
      if (data.type === 'error') request.reject(Object.assign(new Error(data.message), { code: 'reply', approach: data.approach }))
      else request.resolve(data)
    }
    this.worker.onerror = event => {
      event.preventDefault()
      this.terminate('worker')
    }
    this.worker.onmessageerror = () => this.terminate('worker')
  }

  ask(message) {
    if (this.closed) return Promise.reject(this.closed)
    const requestId = ++this.nextRequestId
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => this.terminate('timeout'), this.timeout)
      this.pending.set(requestId, { resolve, reject, timer, replyType: message.type === 'init' ? 'ready' : message.type })
      try {
        this.worker.postMessage({ ...message, runId: this.runId, requestId })
      } catch {
        this.terminate('worker')
      }
    })
  }

  terminate(code = 'cancelled') {
    if (this.closed) return
    this.closed = Object.assign(new Error(code), { code })
    this.worker.onmessage = this.worker.onerror = this.worker.onmessageerror = null
    this.worker.terminate()
    for (const request of this.pending.values()) {
      clearTimeout(request.timer)
      request.reject(this.closed)
    }
    this.pending.clear()
  }
}
