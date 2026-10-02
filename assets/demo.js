// Keep startup independent of the module graph: an import failure must
// leave a usable explanation and reload link, not empty controls.
(() => {
  const root = document.documentElement
  const status = document.getElementById('demo-status')
  const moduleUrl = new URL(document.currentScript.dataset.demoModule, location.href)
  let settled = false
  const finish = error => {
    if (settled) return
    settled = true
    clearTimeout(timer)
    root.dataset.demoState = error ? 'failed' : 'ready'
    for (const control of document.querySelectorAll('[data-demo-control]')) control.disabled = Boolean(error)
    status.hidden = !error
    if (error) {
      status.setAttribute('role', 'alert')
      status.querySelector('[data-demo-loading]').hidden = true
      status.querySelector('[data-demo-failed]').hidden = false
      for (const placeholder of document.querySelectorAll('[data-demo-placeholder]')) {
        placeholder.dataset.textEn = 'Unavailable'
        placeholder.dataset.textZh = '暂不可用'
        placeholder.textContent = root.dataset.language === 'zh' ? '暂不可用' : 'Unavailable'
      }
      root.dataset.selftest = 'fail: demo startup'
      console.error(error)
    }
  }
  const timer = setTimeout(() => finish(new Error('Demo startup timed out')), 30_000)
  import(moduleUrl.href).then(() => finish(), finish)
})()
