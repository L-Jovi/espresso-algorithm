// Check the built site in real browsers:
// `node scripts/test-pages.mjs <site url> <browser>=<webdriver url> ...`, for example
// `node scripts/test-pages.mjs http://127.0.0.1:8080/ chrome=http://127.0.0.1:9515`.
//
// First, every link and asset of every page must answer 200 from the site.
// Then each browser, driven over the W3C WebDriver protocol with nothing but
// fetch, opens every interactive page with ?selftest. The page checks
// itself with the same modules the tests use, and writes "pass" or its
// first failure into <html data-selftest>. Exits with 1 on any failure.

export const PAGES = ['', 'visualizer/', 'leetcode/race/', 'nlp/word-segmentation/']
export const SELF_TESTED = ['visualizer/', 'leetcode/race/', 'nlp/word-segmentation/']

const CAPABILITIES = {
  chrome: { browserName: 'chrome', 'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox', '--window-size=1280,900'] } },
  firefox: { browserName: 'firefox', 'moz:firefoxOptions': { args: ['-headless'] } },
  safari: { browserName: 'safari' },
}

async function checkLinks(site) {
  const failures = []
  for (const page of PAGES) {
    const url = new URL(page, site)
    const html = await (await fetch(url)).text()
    for (const [, target] of html.matchAll(/\b(?:href|src)="([^"#]+)/g)) {
      const resolved = new URL(target, url)
      if (resolved.origin !== url.origin) continue
      const response = await fetch(resolved, { method: 'HEAD' })
      if (response.status !== 200) failures.push(`${url.pathname}: ${target} answered ${response.status}`)
    }
  }
  return failures
}

async function webdriver(driver, method, path, body) {
  const response = await fetch(new URL(path, driver), {
    method,
    headers: { 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const { value } = await response.json()
  if (!response.ok) throw new Error(`${method} ${path}: ${value?.message ?? response.status}`)
  return value
}

async function selfTest(browser, driver, site) {
  const failures = []
  const { sessionId } = await webdriver(driver, 'POST', 'session', { capabilities: { alwaysMatch: CAPABILITIES[browser] } })
  try {
    for (const page of SELF_TESTED) {
      await webdriver(driver, 'POST', `session/${sessionId}/url`, { url: new URL(`${page}?selftest`, site).href })
      let result = null
      for (let waited = 0; result === null && waited < 90_000; waited += 250) {
        result = await webdriver(driver, 'POST', `session/${sessionId}/execute/sync`, { script: 'return document.documentElement.dataset.selftest || null', args: [] })
        if (result === null) await new Promise(resolve => setTimeout(resolve, 250))
      }
      console.log(`${browser.padEnd(8)} ${page.padEnd(24)} ${result ?? 'no answer within 90 s'}`)
      if (result !== 'pass') failures.push(`${browser} ${page}: ${result ?? 'no answer within 90 s'}`)
    }
  } finally {
    await webdriver(driver, 'DELETE', `session/${sessionId}`)
  }
  return failures
}

if (import.meta.main) {
  const [site, ...drivers] = process.argv.slice(2)
  const failures = await checkLinks(site)
  console.log(`links    ${PAGES.length} pages checked, ${failures.length} broken`)
  for (const pair of drivers) {
    const [browser, driver] = pair.split('=')
    if (!CAPABILITIES[browser]) throw new Error(`unknown browser ${browser}`)
    failures.push(...await selfTest(browser, driver, site))
  }
  for (const failure of failures) console.error(`✖ ${failure}`)
  process.exit(failures.length === 0 ? 0 : 1)
}
