// Check the built site in real browsers:
// `node scripts/test-pages.mjs <site url> <browser>=<webdriver url> ...`, for example
// `node scripts/test-pages.mjs http://127.0.0.1:8080/ chrome=http://127.0.0.1:9515`.
//
// First, every link and asset of every page must answer 200 from the site.
// Then each browser, driven over the W3C WebDriver protocol with nothing but
// fetch, opens every page in English and in Chinese, the interactive ones
// with ?selftest. Such a page checks itself with the same modules the tests
// use, and writes "pass" or its first failure into <html data-selftest>.
// Every page must then show only the language asked for, and only the other
// one after a press of its language switch. Exits with 1 on any failure.

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

// Runs in the page: what a reader would see or hear in the wrong language.
// In English, that is any Chinese outside an element marked lang="zh-…",
// which only the Chinese sentences that a page studies carry. In Chinese, it
// is three English words in a row outside code and lang="en". The elements
// of the other language must be hidden, and <html> must name the language.
function wrongLanguage(expected) {
  const root = document.documentElement
  const zh = expected === 'zh'
  const problems = []
  if (root.dataset.language !== expected || root.lang !== (zh ? 'zh-Hans' : 'en')) problems.push(`<html> says ${root.dataset.language}, lang=${root.lang}`)
  const misplaced = zh ? /[A-Za-z]{2,}(?:[\s,'’]+[A-Za-z]{2,}){2,}/ : /[\u2e80-\u9fff\uf900-\ufaff\uff00-\uffef]/
  const allowed = element => (element.closest('[lang]')?.getAttribute('lang') ?? '').startsWith(zh ? 'en' : 'zh') || (zh && element.closest('code, kbd, pre, samp') !== null)
  // A closed <select> draws no box for its options; they show when it does.
  const shown = element => (element.closest('select') ?? element).checkVisibility()
  const check = (text, element) => {
    if (misplaced.test(text) && !allowed(element)) problems.push(text.trim().replace(/\s+/g, ' ').slice(0, 80))
  }
  check(document.title, root)
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  for (let node = walker.nextNode(); node !== null; node = walker.nextNode()) {
    if (node.parentElement.closest('script, style') === null && shown(node.parentElement)) check(node.data, node.parentElement)
  }
  for (const element of document.querySelectorAll('[aria-label]')) {
    if (shown(element)) check(element.getAttribute('aria-label'), element)
  }
  for (const element of document.querySelectorAll(zh ? '[data-l="en"]' : '[data-l="zh"]')) {
    if (shown(element)) problems.push(`shows ${element.outerHTML.slice(0, 80)}`)
  }
  return problems
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

async function testPages(browser, driver, site) {
  const failures = []
  const { sessionId } = await webdriver(driver, 'POST', 'session', { capabilities: { alwaysMatch: CAPABILITIES[browser] } })
  const run = (script, ...args) => webdriver(driver, 'POST', `session/${sessionId}/execute/sync`, { script, args })
  try {
    for (const page of PAGES) {
      for (const [language, other] of [['en', 'zh'], ['zh', 'en']]) {
        const selfTested = SELF_TESTED.includes(page)
        await webdriver(driver, 'POST', `session/${sessionId}/url`, { url: new URL(`${page}?lang=${language}${selfTested ? '&selftest' : ''}`, site).href })
        const name = `${browser.padEnd(8)} ${(page || 'home').padEnd(24)} ${language}`
        if (selfTested) {
          let result = null
          for (let waited = 0; result === null && waited < 90_000; waited += 250) {
            result = await run('return document.documentElement.dataset.selftest || null')
            if (result === null) await new Promise(resolve => setTimeout(resolve, 250))
          }
          console.log(`${name}  self-test: ${result ?? 'no answer within 90 s'}`)
          if (result !== 'pass') failures.push(`${name}: self-test ${result ?? 'gave no answer within 90 s'}`)
        }
        const before = await run(`return (${wrongLanguage})(arguments[0])`, language)
        await run(`document.querySelector('[data-language-switch]').click()`)
        const after = await run(`return (${wrongLanguage})(arguments[0])`, other)
        console.log(`${name}  only ${language}: ${before.length === 0 ? 'yes' : 'no'}, only ${other} after the switch: ${after.length === 0 ? 'yes' : 'no'}`)
        failures.push(...before.map(problem => `${name}: ${problem}`), ...after.map(problem => `${name} → ${other}: ${problem}`))
      }
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
    failures.push(...await testPages(browser, driver, site))
  }
  for (const failure of failures) console.error(`✖ ${failure}`)
  process.exit(failures.length === 0 ? 0 : 1)
}
