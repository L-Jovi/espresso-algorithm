// The page script of the race page: it lists the races of races.js, asks
// the worker to check and time the approaches, and draws the results.
import { RACES } from '../races.js'

const $ = id => document.getElementById(id)
const params = new URLSearchParams(location.search)
const byId = new Map(RACES.map(race => [race.id, race]))
const worker = new Worker(new URL('race-worker.js', import.meta.url), { type: 'module' })

const formatMs = ms => (ms < 1 ? `${(ms * 1000).toPrecision(3)} µs` : ms < 10 ? `${ms.toFixed(2)} ms` : `${Math.round(ms).toLocaleString('en')} ms`)
const formatRatio = ratio => (ratio < 1.5 ? '' : `${ratio < 100 ? ratio.toFixed(1) : Math.round(ratio).toLocaleString('en')}× faster`)

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

function render(race, results = {}) {
  const section = $('race')
  section.replaceChildren()
  const heading = document.createElement('h2')
  const link = document.createElement('a')
  link.href = `https://github.com/L-Jovi/espresso-algorithm/tree/main/leetcode/${race.id}`
  link.textContent = race.title
  heading.append(link)
  const check = document.createElement('p')
  check.className = 'check'
  check.id = 'check'
  check.textContent = results.check ?? 'Press “Run the race” to check the approaches on LeetCode’s example, then time them.'
  section.append(heading, check)

  race.inputs.forEach((input, index) => {
    const title = document.createElement('h3')
    title.className = 'input'
    title.textContent = input.label
    const table = document.createElement('table')
    table.innerHTML = '<thead><tr><th scope="col">Approach</th><th scope="col">Time per call</th><th scope="col"><span class="sr-only">Bar</span></th><th scope="col"><span class="sr-only">Compared with the slowest</span></th></tr></thead>'
    const body = document.createElement('tbody')
    const times = Object.keys(race.approaches).map(name => results[`${index}:${name}`]).filter(ms => typeof ms === 'number')
    const slowest = Math.max(...times)
    const fastest = Math.min(...times)
    for (const name of Object.keys(race.approaches)) {
      const row = document.createElement('tr')
      const ms = results[`${index}:${name}`]
      const cells = [name, '', '', '']
      if (input.slow?.includes(name)) cells[1] = '–'
      else if (ms === 'running') cells[1] = 'running…'
      else if (typeof ms === 'number') cells[1] = formatMs(ms)
      row.innerHTML = '<td class="name"></td><td class="time"></td><td><div class="bar"></div></td><td class="ratio"></td>'
      row.children[0].textContent = cells[0]
      row.children[1].textContent = cells[1]
      const bar = row.querySelector('.bar')
      if (typeof ms === 'number') {
        bar.style.width = `${Math.max(0.5, (ms / slowest) * 100)}%`
        bar.classList.toggle('best', ms === fastest && times.length > 1)
        row.children[3].textContent = formatRatio(slowest / ms)
      } else {
        bar.remove()
        if (input.slow?.includes(name)) {
          row.children[2].className = 'left-out'
          row.children[2].textContent = 'sits this input out'
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
  results.check = checked.agree
    ? `Every approach gives the same answer to LeetCode’s example: ${JSON.stringify(checked.answer)}.`
    : 'The approaches disagree on LeetCode’s example; the times would not be comparable.'
  render(race, results)
  if (!checked.agree) {
    $('run').disabled = false
    return results
  }
  for (const [index, input] of race.inputs.entries()) {
    for (const name of Object.keys(race.approaches)) {
      if (input.slow?.includes(name)) continue
      results[`${index}:${name}`] = 'running'
      render(race, results)
      const reply = await ask({ type: 'time', race: race.id, input: index, approach: name })
      results[`${index}:${name}`] = reply.type === 'time' ? reply.ms : `failed: ${reply.message}`
      render(race, results)
    }
  }
  $('run').disabled = false
  return results
}

for (const race of RACES) $('problem').add(new Option(race.title, race.id))
$('problem').value = byId.has(params.get('problem')) ? params.get('problem') : '0121-best-time-to-buy-and-sell-stock'
const current = () => byId.get($('problem').value)
$('problem').addEventListener('input', () => {
  history.replaceState(null, '', `?problem=${current().id}`)
  render(current())
})
$('run').addEventListener('click', () => run(current()))
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
