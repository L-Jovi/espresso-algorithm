// Keep startup independent of the module graph: an import failure must
// leave a usable explanation and reload link, not empty controls.
(() => {
  const root = document.documentElement
  const status = document.getElementById('demo-status')
  const moduleUrl = new URL(document.currentScript.dataset.demoModule, location.href)
  const show = (state, error) => {
    root.dataset.demoState = state
    for (const control of document.querySelectorAll('[data-demo-control]')) control.disabled = state !== 'ready'
    status.hidden = state === 'ready'
    if (state !== 'failed') return
    status.setAttribute('role', 'alert')
    status.querySelector('[data-demo-loading]').hidden = true
    status.querySelector('[data-demo-failed]').hidden = false
    // The browser's own words tell a network failure from an unsupported browser.
    status.querySelector('[data-demo-error]').textContent = String(error?.message ?? error)
    for (const placeholder of document.querySelectorAll('[data-demo-placeholder]')) {
      placeholder.dataset.textEn = 'Unavailable'
      placeholder.dataset.textZh = '暂不可用'
      placeholder.textContent = root.dataset.language === 'zh' ? '暂不可用' : 'Unavailable'
    }
    console.error(error)
  }
  // A module that still arrives after the timer takes the page over from "failed".
  const timer = setTimeout(() => show('failed', new Error('Loading took more than 30 seconds')), 30_000)
  import(moduleUrl.href).then(() => {
    clearTimeout(timer)
    show('ready')
  }, error => {
    clearTimeout(timer)
    show('failed', error)
    // For the browser tests: without its module, the page cannot check itself.
    root.dataset.selftest = `fail: demo startup: ${error?.message ?? error}`
  })
})()
