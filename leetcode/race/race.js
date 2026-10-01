// The page script of the race page: it lists the races of races.js, asks
// the worker to check and time the approaches, and draws the results.
import { APPROACH_NAMES_ZH, RACES } from '../races.js'

const $ = id => document.getElementById(id)
const params = new URLSearchParams(location.search)
const byId = new Map(RACES.map(race => [race.id, race]))
const worker = new Worker(new URL('race-worker.js', import.meta.url), { type: 'module' })

const formatMs = ms => (ms < 1 ? `${(ms * 1000).toPrecision(3)} µs` : ms < 10 ? `${ms.toFixed(2)} ms` : `${Math.round(ms).toLocaleString('en')} ms`)
const formatRatio = ratio => (ratio < 100 ? ratio.toFixed(1) : Math.round(ratio).toLocaleString('en'))

// The text this script writes, in the site's two languages (see
// assets/language.js); the page's own text is in index.html.
const TEXT = {
  en: {
    title: race => race.title,
    input: input => input.label,
    approach: name => name,
    head: ['Approach', 'Time per call', 'Bar', 'Compared with the slowest'],
    press: 'Press “Run the race” to check the approaches on LeetCode’s example, then time them.',
    agree: answer => `Every approach gives the same answer to LeetCode’s example: ${answer}.`,
    disagree: 'The approaches disagree on LeetCode’s example; the times would not be comparable.',
    running: 'running…',
    failed: 'failed',
    sitsOut: 'sits this input out',
    faster: ratio => `${ratio}× faster`,
  },
  zh: {
    title: race => race.titleZh,
    input: input => input.labelZh,
    approach: name => APPROACH_NAMES_ZH[name],
    head: ['解法', '每次调用的时间', '条形图', '与最慢的相比'],
    press: '按“开始比赛”，先用 LeetCode 的示例检查各种解法，再给它们计时。',
    agree: answer => `每种解法对 LeetCode 示例给出的答案都相同：${answer}。`,
    disagree: '各种解法对 LeetCode 示例给出的答案不一致，计时没有可比性。',
    running: '运行中…',
    failed: '失败',
    sitsOut: '不参加这一项',
    faster: ratio => `快 ${ratio} 倍`,
  },
}
const text = () => TEXT[document.documentElement.dataset.language === 'zh' ? 'zh' : 'en']

// Messages come back one at a time; each request waits for its answer.
let pending = null
worker.onmessage = ({ data }) => {
  const resolve = pending
  pending = null
  resolve?.(data)
}
const ask = message => new Promise(resolve => {
  pending = resolve
  worker.postMessage(message)
})

// What the race section shows, kept to draw it again in the other language.
// A result is a time in milliseconds, 'running', or { failed: message }.
let shown = { race: null, results: {} }

function render(race, results = {}) {
  shown = { race, results }
  const T = text()
  const section = $('race')
  section.replaceChildren()
  const heading = document.createElement('h2')
  const link = document.createElement('a')
  link.href = `https://github.com/L-Jovi/espresso-algorithm/tree/main/leetcode/${race.id}`
  link.textContent = T.title(race)
  heading.append(link)
  const check = document.createElement('p')
  check.className = 'check'
  check.id = 'check'
  check.textContent = results.check === undefined ? T.press
    : results.check.agree ? T.agree(JSON.stringify(results.check.answer)) : T.disagree
  section.append(heading, check)

  race.inputs.forEach((input, index) => {
    const title = document.createElement('h3')
    title.className = 'input'
    title.textContent = T.input(input)
    const table = document.createElement('table')
    table.innerHTML = '<thead><tr><th scope="col"></th><th scope="col"></th><th scope="col"><span class="sr-only"></span></th><th scope="col"><span class="sr-only"></span></th></tr></thead>'
    table.querySelectorAll('th').forEach((cell, i) => { (cell.firstElementChild ?? cell).textContent = T.head[i] })
    const body = document.createElement('tbody')
    const times = Object.keys(race.approaches).map(name => results[`${index}:${name}`]).filter(ms => typeof ms === 'number')
    const slowest = Math.max(...times)
    const fastest = Math.min(...times)
    for (const name of Object.keys(race.approaches)) {
      const row = document.createElement('tr')
      const ms = results[`${index}:${name}`]
      const cells = [T.approach(name), '', '', '']
      if (input.slow?.includes(name)) cells[1] = '–'
      else if (ms === 'running') cells[1] = T.running
      else if (typeof ms === 'number') cells[1] = formatMs(ms)
      else if (ms?.failed !== undefined) cells[1] = T.failed
      row.innerHTML = '<td class="name"></td><td class="time"></td><td><div class="bar"></div></td><td class="ratio"></td>'
      row.children[0].textContent = cells[0]
      row.children[1].textContent = cells[1]
      const bar = row.querySelector('.bar')
      if (typeof ms === 'number') {
        bar.style.width = `${Math.max(0.5, (ms / slowest) * 100)}%`
        bar.classList.toggle('best', ms === fastest && times.length > 1)
        if (slowest / ms >= 1.5) row.children[3].textContent = T.faster(formatRatio(slowest / ms))
      } else {
        bar.remove()
        if (input.slow?.includes(name)) {
          row.children[2].className = 'left-out'
          row.children[2].textContent = T.sitsOut
        } else if (ms?.failed !== undefined) {
          // The browser's own error message, which is in English.
          row.children[2].className = 'left-out'
          row.children[2].lang = 'en'
          row.children[2].textContent = ms.failed
        }
      }
      body.append(row)
    }
    table.append(body)
    section.append(title, table)
  })
}

async function run(race) {
  $('run').disabled = true
  const results = {}
  const checked = await ask({ type: 'check', race: race.id })
  results.check = { agree: checked.agree === true, answer: checked.answer }
  render(race, results)
  if (!results.check.agree) {
    $('run').disabled = false
    return results
  }
  for (const [index, input] of race.inputs.entries()) {
    for (const name of Object.keys(race.approaches)) {
      if (input.slow?.includes(name)) continue
      results[`${index}:${name}`] = 'running'
      render(race, results)
      const reply = await ask({ type: 'time', race: race.id, input: index, approach: name })
      results[`${index}:${name}`] = reply.type === 'time' ? reply.ms : { failed: reply.message }
      render(race, results)
    }
  }
  $('run').disabled = false
  return results
}

for (const race of RACES) $('problem').add(new Option(text().title(race), race.id))
$('problem').value = byId.has(params.get('problem')) ? params.get('problem') : '0121-best-time-to-buy-and-sell-stock'
const current = () => byId.get($('problem').value)
$('problem').addEventListener('input', () => {
  // The address keeps the problem, next to any other setting such as lang.
  const url = new URL(location.href)
  url.searchParams.set('problem', current().id)
  history.replaceState(null, '', url)
  render(current())
})
$('run').addEventListener('click', () => run(current()))
document.addEventListener('languagechange', () => {
  for (const option of $('problem').options) option.text = text().title(byId.get(option.value))
  render(shown.race, shown.results)
})
render(current())

// For the browser tests: `?selftest` checks every race on LeetCode's
// example in the worker, and times the fastest race, then puts "pass" or the
// first failure on <html>.
addEventListener('error', event => { document.documentElement.dataset.selftest = `fail: ${event.message}` })
if (params.has('selftest')) {
  const failures = []
  for (const race of RACES) {
    const reply = await ask({ type: 'check', race: race.id })
    if (!reply.agree) failures.push(race.title)
  }
  $('problem').value = '0509-fibonacci-number'
  const timed = await run(current())
  if (!Object.entries(timed).every(([key, value]) => key === 'check' || typeof value === 'number')) failures.push('timing 509')
  document.documentElement.dataset.selftest = failures.length === 0 ? 'pass' : `fail: ${failures.join(', ')}`
}
