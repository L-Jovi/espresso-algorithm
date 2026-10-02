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
// one after a press of its language switch. Real clicks and keys then operate
// each demo, with failures injected by a test-only proxy
// (test-page-interactions.mjs). Exits with 1 on any failure.
import { testInteractions } from './test-page-interactions.mjs'

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

export async function testPages(browser, driver, site) {
  const failures = []
  const { sessionId, capabilities } = await webdriver(driver, 'POST', 'session', { capabilities: { alwaysMatch: CAPABILITIES[browser] } })
  console.log(`${browser.padEnd(8)} version: ${capabilities.browserVersion}`)
  const run = (script, ...args) => webdriver(driver, 'POST', `session/${sessionId}/execute/sync`, { script, args })
  const command = (path, body) => webdriver(driver, 'POST', `session/${sessionId}/${path}`, body)
  const element = async selector => (await command('element', { using: 'css selector', value: selector }))['element-6066-11e4-a52e-4f735466cecf']
  const click = async selector => command(`element/${await element(selector)}/click`, {})
  const keys = async text => {
    await command('actions', { actions: [{ type: 'key', id: 'keyboard', actions: [...text].flatMap(value => [{ type: 'keyDown', value }, { type: 'keyUp', value }]) }] })
  }
  let frameSize = null
  const controls = {
    run, click,
    goto: async url => {
      if (!frameSize) return command('url', { url })
      // Desktop drivers clamp small windows to 500 px. A test-only parent
      // gives the unchanged page an exact CSS viewport in every browser.
      await command('frame', { id: null })
      await command('url', { url: site })
      const frame = await command('execute/async', {
        script: `const [url, width, height, done] = arguments
          const frame = document.createElement('iframe')
          frame.width = width
          frame.height = height
          frame.style.border = '0'
          frame.onload = () => done(frame)
          frame.src = url
          document.body.replaceChildren(frame)`,
        args: [url, frameSize.width, frameSize.height],
      })
      await command('frame', { id: frame })
      const loaded = new URL(await run('return location.href'))
      const expected = new URL(url)
      if (loaded.origin !== expected.origin || loaded.pathname !== expected.pathname) throw new Error(`The viewport frame did not load ${url}`)
    },
    viewport: async (width, height) => {
      // Without a size, the following pages load at the top level again.
      frameSize = width === undefined ? null : { width, height }
      await command('frame', { id: null })
      await command('window/rect', { width: Math.max(800, (width ?? 1280) + 40), height: (height ?? 900) + 100 })
    },
    key: async (selector, value) => command(`element/${await element(selector)}/value`, { text: value }),
    type: async (selector, text) => {
      const id = await element(selector)
      await command(`element/${id}/clear`, {})
      await click(selector)
      // A space followed by Backspace also emits input for an empty value.
      await keys(text || ' ')
      if (!text) await keys('\uE003')
    },
    wait: async (expression, timeout = 15_000) => {
      const deadline = Date.now() + timeout
      while (Date.now() < deadline) {
        if (await run(`return Boolean(${expression})`)) return
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      throw new Error(`Timed out: ${expression}`)
    },
  }
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
        await click('[data-language-switch]')
        const after = await run(`return (${wrongLanguage})(arguments[0])`, other)
        console.log(`${name}  only ${language}: ${before.length === 0 ? 'yes' : 'no'}, only ${other} after the switch: ${after.length === 0 ? 'yes' : 'no'}`)
        failures.push(...before.map(problem => `${name}: ${problem}`), ...after.map(problem => `${name} → ${other}: ${problem}`))
      }
    }
    try {
      await testInteractions(controls, site, message => console.log(`${browser.padEnd(8)} ${message}`))
    } catch (error) {
      failures.push(`${browser}: ${error.stack}`)
    }
  } finally {
    await webdriver(driver, 'DELETE', `session/${sessionId}`)
  }
  return failures
}

if (import.meta.main) {
  const [site, ...drivers] = process.argv.slice(2)
  if (!site || drivers.length === 0) throw new Error('Usage: node scripts/test-pages.mjs <site URL> <browser>=<WebDriver URL> ...')
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
