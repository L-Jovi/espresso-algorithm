// The page script of the race page: it lists the races of races.js, asks
// the worker to check and time the approaches, and draws the results.
import { APPROACH_NAMES_ZH, RACES } from '../races.js'
import { RaceWorkerClient } from './worker-client.js'

const $ = id => document.getElementById(id)
const params = new URLSearchParams(location.search)
const byId = new Map(RACES.map(race => [race.id, race]))

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
    press: 'Press “Run the race” to check the approaches against the expected example answer, then time them.',
    agree: answer => `Every approach matches the expected example answer: ${answer}.`,
    disagree: 'An approach did not match the expected example answer. Timing was stopped.',
    idle: 'Ready. Choose a problem and run the race.',
    checking: 'Checking the example answer…',
    complete: 'Complete. Run again to compare another measurement.',
    cancelled: 'Cancelled. You can run this problem again.',
    cancelledCell: 'cancelled',
    waiting: 'not run',
    errors: {
      worker: 'The calculation could not start or stopped unexpectedly. Run the race again to retry.',
      timeout: 'The calculation exceeded 30 seconds and was stopped. Run again or choose another problem.',
      check: 'The example check failed. No timings were taken.',
    },
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
    press: '按“开始比赛”，先核对各种解法是否符合示例的预期答案，再给它们计时。',
    agree: answer => `每种解法都符合示例的预期答案：${answer}。`,
    disagree: '有解法不符合示例的预期答案，已停止计时。',
    idle: '待运行。选择题目后开始比赛。',
    checking: '正在校验示例答案…',
    complete: '已完成。可以再次运行，比较另一次测量。',
    cancelled: '已取消。可以重新运行这道题。',
    cancelledCell: '已取消',
    waiting: '未运行',
    errors: {
      worker: '计算无法启动或意外停止。请再次开始比赛重试。',
      timeout: '计算超过 30 秒，已停止。请重试或选择其他题目。',
      check: '示例校验失败，未进行计时。',
    },
    running: '运行中…',
    failed: '失败',
    sitsOut: '不参加这一项',
    faster: ratio => `快 ${ratio} 倍`,
  },
}
const text = () => TEXT[document.documentElement.dataset.language === 'zh' ? 'zh' : 'en']

// What the race section shows, kept to draw it again in the other language.
let shown
let active = null
let nextRunId = 0

function render(race, results = {}, status = 'idle', error = null) {
  shown = { race, results, status, error }
  const T = text()
  const section = $('race')
  const busy = status === 'checking' || status === 'running'
  section.dataset.state = status
  section.dataset.problem = race.id
  section.setAttribute('aria-busy', String(busy))
  $('run').disabled = busy || document.documentElement.dataset.demoState !== 'ready'
  $('cancel').hidden = !busy
  $('cancel').disabled = !busy
  $('race-status').textContent = status === 'failed' ? T.errors[error] ?? T.errors.worker : T[status]
  section.replaceChildren()
  const heading = document.createElement('h2')
  const link = document.createElement('a')
  link.href = `https://github.com/L-Jovi/espresso-algorithm/tree/main/leetcode/${race.id}`
  link.textContent = T.title(race)
  heading.append(link)
  const check = document.createElement('p')
  check.className = 'check'
  check.id = 'check'
  check.hidden = results.check === undefined && status !== 'idle'
  check.textContent = results.check === undefined ? T.press
    : results.check.passed ? T.agree(JSON.stringify(results.check.expected)) : T.disagree
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
      const cells = [T.approach(name), T.waiting, '', '']
      if (input.slow?.includes(name)) cells[1] = '–'
      else if (ms === 'running') cells[1] = status === 'cancelled' ? T.cancelledCell : status === 'failed' ? T.failed : T.running
      else if (typeof ms === 'number') cells[1] = formatMs(ms)
      row.innerHTML = '<td class="name"></td><td class="time"></td><td><div class="bar"></div></td><td class="ratio"></td>'
      row.children[0].textContent = cells[0]
      row.children[1].textContent = cells[1]
      const bar = row.querySelector('.bar')
      if (typeof ms === 'number' && ms > 0) {
        bar.style.width = `${Math.max(0.5, (ms / slowest) * 100)}%`
        bar.classList.toggle('best', ms === fastest && times.length > 1)
        if (slowest / ms >= 1.5) row.children[3].textContent = T.faster(formatRatio(slowest / ms))
      } else {
        bar.remove()
        if (input.slow?.includes(name)) {
          row.children[2].className = 'left-out'
          row.children[2].textContent = T.sitsOut
        }
      }
      body.append(row)
    }
    table.append(body)
    section.append(title, table)
  })
}

async function run(race) {
  cancel(false)
  const task = { id: ++nextRunId, client: null }
  active = task
  const results = {}
  render(race, results, 'checking')
  try {
    task.client = new RaceWorkerClient(task.id)
    await task.client.ask({ type: 'init' })
    if (active !== task) return
    const checked = await task.client.ask({ type: 'check', race: race.id })
    if (active !== task) return
    results.check = checked
    if (checked.passed !== true) throw Object.assign(new Error('Example check failed'), { code: 'check' })
    for (const [index, input] of race.inputs.entries()) {
      for (const name of Object.keys(race.approaches)) {
        if (input.slow?.includes(name)) continue
        results[`${index}:${name}`] = 'running'
        render(race, results, 'running')
        const reply = await task.client.ask({ type: 'time', race: race.id, input: index, approach: name })
        if (active !== task) return
        if (!Number.isFinite(reply.ms) || reply.ms < 0) throw new Error('Invalid timing')
        results[`${index}:${name}`] = reply.ms
      }
    }
    render(race, results, 'complete')
    return results
  } catch (error) {
    if (active === task) render(race, results, 'failed', error.code ?? 'worker')
  } finally {
    task.client?.terminate()
    // A cancelled task can finish unwinding after a new run has started.
    if (active === task) active = null
  }
}

function cancel(show = true) {
  const task = active
  if (!task) return
  active = null
  task.client?.terminate()
  if (show) render(shown.race, shown.results, 'cancelled')
}

$('problem').replaceChildren()
for (const race of RACES) $('problem').add(new Option(text().title(race), race.id))
$('problem').value = byId.has(params.get('problem')) ? params.get('problem') : '0121-best-time-to-buy-and-sell-stock'
const current = () => byId.get($('problem').value)
$('problem').addEventListener('change', () => {
  cancel(false)
  // The address keeps the problem, next to any other setting such as lang.
  const url = new URL(location.href)
  url.searchParams.set('problem', current().id)
  history.replaceState(null, '', url)
  render(current())
})
$('run').addEventListener('click', () => run(current()))
$('cancel').addEventListener('click', () => cancel())
addEventListener('pagehide', () => cancel())
document.addEventListener('languagechange', () => {
  for (const option of $('problem').options) option.text = text().title(byId.get(option.value))
  render(shown.race, shown.results, shown.status, shown.error)
})
render(current())

// For the browser tests: `?selftest` checks every race's expected example
// answer in the worker, and times the fastest race, then puts "pass" or the
// first failure on <html>.
addEventListener('error', event => { document.documentElement.dataset.selftest = `fail: ${event.message}` })
if (params.has('selftest')) {
  const failures = []
  const client = new RaceWorkerClient(++nextRunId)
  try {
    await client.ask({ type: 'init' })
    for (const race of RACES) {
      const reply = await client.ask({ type: 'check', race: race.id })
      if (!reply.passed) failures.push(race.title)
    }
  } finally {
    client.terminate()
  }
  $('problem').value = '0509-fibonacci-number'
  const timed = await run(current())
  if (!timed || !Object.entries(timed).every(([key, value]) => key === 'check' || typeof value === 'number')) failures.push('timing 509')
  document.documentElement.dataset.selftest = failures.length === 0 ? 'pass' : `fail: ${failures.join(', ')}`
}
