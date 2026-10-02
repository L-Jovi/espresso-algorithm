// The page script of the sort visualizer. It builds the numbers, traces the
// chosen sorts with trace.js, and replays their steps on canvases; all the
// sorting work happens in the modules from sorting/.
import { createRandom } from '../shared/random.js'
import { SORTS } from './sorts.js'
import { replay, trace } from './trace.js'

const $ = id => document.getElementById(id)
$('sort').replaceChildren()
const params = new URLSearchParams(location.search)
const byId = new Map(SORTS.map(entry => [entry.id, entry]))

const range = n => Array.from({ length: n }, (_, i) => i + 1)
function shuffle(array, next) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1))
    const item = array[i]
    array[i] = array[j]
    array[j] = item
  }
  return array
}

const SHAPES = {
  random: (n, next) => shuffle(range(n), next),
  nearly: (n, next) => {
    const values = range(n)
    for (let swaps = Math.max(1, Math.round(n / 10)); swaps > 0; swaps--) {
      const i = Math.floor(next() * (n - 1))
      const item = values[i]
      values[i] = values[i + 1]
      values[i + 1] = item
    }
    return values
  },
  reversed: n => range(n).reverse(),
  few: (n, next) => Array.from({ length: n }, () => (1 + Math.floor(next() * 4)) * Math.ceil(n / 4)),
}

// 0…100 on the slider maps to 10…10,000 steps per second.
const stepsPerSecond = () => Math.round(10 ** (1 + (Number($('speed').value) * 3) / 100))

let seed = Number(params.get('seed')) || 1 + Math.floor(Math.random() * 1e6)
let panels = []
let playing = false

function colors() {
  const style = getComputedStyle(document.documentElement)
  const read = name => style.getPropertyValue(name).trim()
  return { bar: read('--esp-bar'), read: read('--esp-read'), write: read('--esp-write'), done: read('--esp-done') }
}

function makePanel(entry, values) {
  const { steps } = trace(entry.sort, values)
  const figure = document.createElement('figure')
  figure.className = 'panel sorter'
  figure.innerHTML = `<figcaption><strong></strong><a></a></figcaption><canvas role="img"></canvas><p class="counts"></p>`
  figure.querySelector('strong').textContent = nameOf(entry)
  const link = figure.querySelector('a')
  link.href = `https://github.com/L-Jovi/espresso-algorithm/blob/main/sorting/${entry.file}`
  link.textContent = entry.file.split('/').at(-1)
  return { entry, steps, start: [...values], values: [...values], at: 0, reads: 0, writes: 0, compares: 0, lastRead: -1, lastWrite: -1, figure }
}

function advance(panel, count) {
  for (let k = 0; k < count && panel.at < panel.steps.length; k++) {
    const step = panel.steps[panel.at++]
    if (step.kind === 'read') {
      panel.reads++
      panel.lastRead = step.index
    } else if (step.kind === 'write') {
      panel.writes++
      panel.values[step.index] = step.value
      panel.lastWrite = step.index
    } else {
      panel.compares++
    }
  }
}

const finished = panel => panel.at === panel.steps.length
const format = number => number.toLocaleString('en')

// The text this script writes, in the site's two languages (see
// assets/language.js); the page's own text is in index.html.
const TEXT = {
  en: {
    play: 'Play',
    pause: 'Pause',
    label: panel => `${panel.entry.name}: ${finished(panel) ? 'sorted' : `step ${format(panel.at)} of ${format(panel.steps.length)}`}`,
    counts: panel => `${format(panel.reads)} reads · ${format(panel.writes)} writes · ${format(panel.compares)} comparisons · step ${format(panel.at)} of ${format(panel.steps.length)}`,
    done: panel => `${panel.entry.name} finished after ${format(panel.steps.length)} steps.`,
  },
  zh: {
    play: '播放',
    pause: '暂停',
    label: panel => `${panel.entry.nameZh}：${finished(panel) ? '已排好' : `第 ${format(panel.at)} 步，共 ${format(panel.steps.length)} 步`}`,
    counts: panel => `读 ${format(panel.reads)} 次 · 写 ${format(panel.writes)} 次 · 比较 ${format(panel.compares)} 次 · 第 ${format(panel.at)} 步，共 ${format(panel.steps.length)} 步`,
    done: panel => `${panel.entry.nameZh}用 ${format(panel.steps.length)} 步完成。`,
  },
}
const chinese = () => document.documentElement.dataset.language === 'zh'
const text = () => TEXT[chinese() ? 'zh' : 'en']
const nameOf = entry => (chinese() ? entry.nameZh : entry.name)

function draw(panel, palette) {
  const canvas = panel.figure.querySelector('canvas')
  const { width, height } = canvas.getBoundingClientRect()
  const ratio = window.devicePixelRatio || 1
  if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
  }
  const context = canvas.getContext('2d')
  context.setTransform(ratio, 0, 0, ratio, 0, 0)
  context.clearRect(0, 0, width, height)
  const max = Math.max(1, ...panel.values)
  const slot = width / panel.values.length
  const gap = slot > 6 ? 2 : slot > 3 ? 1 : 0
  panel.values.forEach((value, i) => {
    context.fillStyle = finished(panel) ? palette.done
      : i === panel.lastWrite ? palette.write
        : i === panel.lastRead ? palette.read
          : palette.bar
    const barHeight = (value / max) * (height - 6)
    context.fillRect(i * slot + gap / 2, height - barHeight, Math.max(1, slot - gap), barHeight)
  })
  canvas.setAttribute('aria-label', text().label(panel))
  panel.figure.querySelector('.counts').textContent = text().counts(panel)
}

function render() {
  const palette = colors()
  for (const panel of panels) draw(panel, palette)
}

function rebuild() {
  stop()
  $('status').textContent = ''
  const n = Number($('size').value)
  $('size-out').value = n
  const values = SHAPES[$('shape').value](n, createRandom(seed))
  const chosen = [byId.get($('sort').value), byId.get($('rival').value)].filter(Boolean)
  panels = chosen.map(entry => makePanel(entry, values))
  $('stage').replaceChildren(...panels.map(panel => panel.figure))
  render()
  // The address keeps the settings, next to any others such as lang.
  const url = new URL(location.href)
  const settings = { sort: $('sort').value, rival: $('rival').value, n, shape: $('shape').value, seed }
  for (const [key, value] of Object.entries(settings)) {
    if (value === '') url.searchParams.delete(key)
    else url.searchParams.set(key, value)
  }
  history.replaceState(null, '', url)
}

let last = 0
let carry = 0
function frame(now) {
  if (!playing) return
  carry += last ? ((now - last) / 1000) * stepsPerSecond() : 0
  last = now
  const count = Math.floor(carry)
  carry -= count
  const wasDone = panels.map(finished)
  for (const panel of panels) advance(panel, count)
  render()
  panels.forEach((panel, i) => {
    if (!wasDone[i] && finished(panel)) $('status').textContent = text().done(panel)
  })
  if (panels.every(finished)) stop()
  else requestAnimationFrame(frame)
}

function play() {
  if (panels.every(finished)) restart()
  playing = true
  last = 0
  carry = 0
  $('play').textContent = text().pause
  $('play').setAttribute('aria-pressed', 'true')
  requestAnimationFrame(frame)
}

function stop() {
  playing = false
  $('play').textContent = text().play
  $('play').setAttribute('aria-pressed', 'false')
}

function restart() {
  stop()
  $('status').textContent = ''
  for (const panel of panels) Object.assign(panel, { values: [...panel.start], at: 0, reads: 0, writes: 0, compares: 0, lastRead: -1, lastWrite: -1 })
  render()
}

// Runs every sort on every shape of input and checks the replay, for the
// browser tests: `?selftest` puts "pass" or the first failure on <html>.
function selfTest() {
  for (const [shape, build] of Object.entries(SHAPES)) {
    for (const entry of SORTS) {
      const values = build(48, createRandom(seed))
      const { steps, sorted } = trace(entry.sort, values)
      const expected = values.toSorted((a, b) => a - b)
      if (String(sorted) !== String(expected) || String(replay(values, steps)) !== String(expected)) {
        return `${entry.name} on ${shape} input`
      }
    }
  }
  for (const panel of panels) advance(panel, Infinity)
  render()
  return panels.every(finished) ? 'pass' : 'the panels did not finish'
}

for (const entry of SORTS) {
  $('sort').add(new Option(nameOf(entry), entry.id))
  $('rival').add(new Option(nameOf(entry), entry.id))
}
$('sort').value = byId.has(params.get('sort')) ? params.get('sort') : 'quick'
$('rival').value = byId.has(params.get('rival')) ? params.get('rival') : ''
if (SHAPES[params.get('shape')]) $('shape').value = params.get('shape')
if (Number(params.get('n')) >= 8 && Number(params.get('n')) <= 128) $('size').value = params.get('n')
$('speed-out').value = format(stepsPerSecond())

for (const id of ['sort', 'rival', 'shape']) $(id).addEventListener('change', rebuild)
$('size').addEventListener('input', rebuild)
$('speed').addEventListener('input', () => { $('speed-out').value = format(stepsPerSecond()) })
$('play').addEventListener('click', () => (playing ? stop() : play()))
$('step').addEventListener('click', () => {
  stop()
  for (const panel of panels) advance(panel, 1)
  render()
})
$('restart').addEventListener('click', restart)
$('shuffle').addEventListener('click', () => {
  seed = 1 + Math.floor(Math.random() * 1e6)
  rebuild()
})
new ResizeObserver(render).observe($('stage'))
document.addEventListener('languagechange', () => {
  for (const select of [$('sort'), $('rival')]) {
    for (const option of select.options) if (byId.has(option.value)) option.text = nameOf(byId.get(option.value))
  }
  for (const panel of panels) panel.figure.querySelector('strong').textContent = nameOf(panel.entry)
  $('play').textContent = playing ? text().pause : text().play
  $('status').textContent = ''
  render()
})
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', render)

addEventListener('error', event => { document.documentElement.dataset.selftest = `fail: ${event.message}` })
rebuild()
if (params.has('selftest')) document.documentElement.dataset.selftest = selfTest()
