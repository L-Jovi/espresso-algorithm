// Controls are operated through WebDriver clicks and keys. DOM scripts
// only observe the resulting state, URL, accessibility text and layout.
import assert from 'node:assert/strict'
import { siteFixture } from './lib/site-fixture.mjs'

const RACE = 'leetcode/race/'
const NLP = 'nlp/word-segmentation/'
const FIB = '0509-fibonacci-number'
const MEDIAN = '0004-median-of-two-sorted-arrays'
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function testInteractions(browser, site, log) {
  const { goto, click, type, key, run, wait, viewport } = browser
  const ready = () => wait("document.documentElement.dataset.demoState === 'ready'")
  const choose = (id, value) => click(`#${id} option[value="${value}"]`)
  const state = async expected => {
    await wait(`['${expected}', 'failed'].includes(document.querySelector('#race').dataset.state)`, expected === 'complete' || expected === 'failed' ? 90_000 : 15_000)
    assert.equal(await run("return document.querySelector('#race').dataset.state"), expected, await run(`return [
      document.querySelector('#problem').value,
      document.querySelector('#race-status').textContent,
      document.querySelector('#race').innerText
    ].join(' / ')`))
  }
  const currentIs = async id => assert.equal(await run(`return document.querySelector('#problem').value === arguments[0] &&
    document.querySelector('#race').dataset.problem === arguments[0] &&
    new URL(location.href).searchParams.get('problem') === arguments[0]`, id), true, 'picker, URL and results identify the same problem')

  await goto(new URL(`${RACE}?lang=en&problem=${MEDIAN}`, site).href)
  await ready()
  await click('#run')
  await choose('problem', FIB)
  await state('idle')
  await currentIs(FIB)
  await click('#run')
  await click('[data-language-switch]')
  await state('complete')
  await currentIs(FIB)
  assert.equal(await run('return document.documentElement.dataset.language'), 'zh')
  assert.equal(await run("return new URL(location.href).searchParams.get('lang')"), 'zh')
  assert.match(await run("return document.querySelector('#race h2').textContent"), /斐波那契/)
  await pause(500)
  await currentIs(FIB)
  await choose('problem', MEDIAN)
  await click('#run')
  await click('#cancel')
  await state('cancelled')
  assert.equal(await run("return document.querySelector('#run').disabled"), false)
  await currentIs(MEDIAN)
  await click('#run')
  await state('complete')
  await currentIs(MEDIAN)
  log('race: switch during a run, cancel, retry and language switch')

  const ids = await run("return [...document.querySelector('#problem').options].map(option => option.value)")
  assert.equal(ids.length, 15)
  for (const id of ids) {
    await choose('problem', id)
    await click('#run')
    await state('complete')
    await currentIs(id)
    assert.equal(await run("return [...document.querySelectorAll('#race td.time')].every(cell => /[0-9µ–]/.test(cell.textContent))"), true, id)
  }
  log('race: all 15 problems completed through the controls')

  await goto(new URL(`${NLP}?lang=en`, site).href)
  await ready()
  for (const sentence of ['𠮷野家', '𠀀你好', '你好👋世界', '  𠮷 2023 你好  ', '', '   ']) {
    await type('#text', sentence)
    await wait(`new URL(location.href).searchParams.get('text') === ${JSON.stringify(sentence.trim())}`)
    const result = await run(`return {
      words: [...document.querySelectorAll('#rows ul')].map(list => [...list.children].map(item => item.textContent)),
      graph: Boolean(document.querySelector('#graph svg')),
      broken: [...document.querySelectorAll('#graph path')].some(path => /NaN|undefined/.test(path.getAttribute('d'))),
      prompt: document.querySelector('#rows').textContent,
      error: document.documentElement.dataset.selftest ?? null
    }`)
    assert.equal(result.broken, false, sentence)
    assert.equal(result.error, null, sentence)
    assert.equal(result.graph, Boolean(sentence.trim()), sentence)
    if (!sentence.trim()) {
      assert.equal(result.words.length, 0)
      assert.match(result.prompt, /Type a sentence/)
    } else {
      assert.equal(result.words.length, 3)
      for (const words of result.words) {
        assert.equal(words.join(''), sentence.replace(/\s/g, ''))
        assert.ok(words.every(word => word.isWellFormed()))
      }
    }
  }
  await goto(await run('return location.href'))
  await ready()
  assert.equal(await run("return document.querySelector('#text').value"), '')
  await click('#examples button')
  assert.equal(await run("return document.querySelectorAll('#rows ul').length"), 3)
  await click('[data-language-switch]')
  assert.equal(await run("return document.querySelectorAll('#rows ul').length"), 3)
  log('segmentation: examples, empty reload, spaces, emoji and supplementary Han')

  await goto(new URL('visualizer/?lang=en&n=8&sort=bubble&shape=reversed&seed=1', site).href)
  await ready()
  const label = () => run("return document.querySelector('canvas').getAttribute('aria-label')")
  const initial = await label()
  await click('#step')
  assert.notEqual(await label(), initial)
  await click('#play')
  await click('#play')
  assert.equal(await run("return document.querySelector('#play').getAttribute('aria-pressed')"), 'false')
  const paused = await label()
  await pause(150)
  assert.equal(await label(), paused)
  await click('#restart')
  assert.equal(await label(), initial)
  await click('#play')
  await wait("document.querySelector('#status').textContent.length > 0")
  await click('#restart')
  assert.equal(await run("return document.querySelector('#status').textContent"), '')
  await choose('shape', 'few')
  assert.equal(await run("return new URL(location.href).searchParams.get('shape')"), 'few')
  const seed = await run("return new URL(location.href).searchParams.get('seed')")
  await click('#shuffle')
  assert.notEqual(await run("return new URL(location.href).searchParams.get('seed')"), seed)
  await choose('sort', 'merge')
  await choose('rival', 'quick')
  assert.equal(await run("return document.querySelectorAll('canvas').length"), 2)
  await key('#size', '\uE014')
  assert.equal(await run("return document.querySelector('#size-out').value"), '16')
  await key('#speed', '\uE014')
  assert.ok(Number((await run("return document.querySelector('#speed-out').value")).replaceAll(',', '')) > 447)
  log('sort: play, pause, step, restart, shape, numbers, sorts and sliders')

  for (const width of [320, 375, 1280]) {
    await viewport(width, 900)
    for (const language of ['en', 'zh']) {
      for (const page of ['', 'visualizer/', RACE, NLP]) {
        await goto(new URL(`${page}?lang=${language}`, site).href)
        if (page) await ready()
        const layout = await run(`return {
          width: innerWidth, scroll: document.documentElement.scrollWidth,
          links: [...document.querySelectorAll('.ladder a[href*="race/?problem="]')].filter(a => a.checkVisibility()).length,
          controls: [...document.querySelectorAll('[data-demo-control]')].every(control => !control.disabled && control.checkVisibility())
        }`)
        assert.equal(layout.width, width, 'the browser must use the requested viewport width')
        assert.ok(layout.scroll <= layout.width + 1, `${page || 'home'} ${language} at ${width}: overflow ${layout.scroll}/${layout.width}`)
        assert.equal(layout.controls, true)
        if (!page) assert.equal(layout.links, 9, `race links at ${width}`)
      }
    }
  }
  await viewport(1280, 900)
  log('layout: both languages at 320, 375 and 1280; all 9 learning-path race links visible')

  const fixture = await siteFixture(site)
  try {
    for (const [page, dependency] of [[RACE, 'leetcode/races.js'], ['visualizer/', 'visualizer/sorts.js'], [NLP, 'nlp/word-segmentation/dictionary.js']]) {
      fixture.faults.set(dependency, { status: 503 })
      await goto(new URL(`${page}?lang=zh`, fixture.url).href)
      await wait("document.documentElement.dataset.demoState === 'failed'")
      assert.equal(await run("return [...document.querySelectorAll('[data-demo-control]')].every(control => control.disabled)"), true)
      assert.equal(await run("return document.querySelector('[data-demo-failed]').checkVisibility()"), true)
      assert.equal(await run("return [...document.querySelectorAll('[data-demo-output]')].some(output => output.checkVisibility())"), false)
      assert.equal(await run("return [...document.querySelectorAll('[data-demo-placeholder]')].every(option => option.textContent === '暂不可用')"), true)
      await click('[data-language-switch]')
      assert.equal(await run("return document.documentElement.dataset.language"), 'en')
      assert.equal(await run("return [...document.querySelectorAll('[data-demo-placeholder]')].every(option => option.textContent === 'Unavailable')"), true)
      fixture.faults.clear()
      await click('#demo-reload')
      await ready()
      assert.equal(await run("return [...document.querySelectorAll('[data-demo-output]')].every(output => output.checkVisibility())"), true)
    }
    log('startup: dependency failures on all 3 demos, visible feedback and reload recovery')

    for (const fault of [{ status: 503 }, { body: "throw new Error('injected worker failure')" }, { body: 'onmessage = () => {}' }]) {
      fixture.faults.set('leetcode/race/race-worker.js', fault)
      await goto(new URL(`${RACE}?lang=en&problem=${FIB}`, fixture.url).href)
      await ready()
      await click('#run')
      await state('failed')
      const error = await run("return document.querySelector('#race-status').textContent")
      assert.match(error, fault.body === 'onmessage = () => {}' ? /30 seconds/ : /could not start|stopped unexpectedly/)
      assert.equal(await run("return document.querySelector('#run').disabled"), false)
      fixture.faults.clear()
      await click('#run')
      await state('complete')
      await currentIs(FIB)
    }
    log('worker: loading error, runtime error, real 30-second timeout and retry recovery')
  } finally {
    await fixture.close()
  }
}
