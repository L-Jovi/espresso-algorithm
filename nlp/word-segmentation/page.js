// The page script of the segmentation demo: it segments the sentence three
// ways and draws the graph of candidate words with the two chosen paths.
import { dagDp } from './dag-dp.js'
import { candidateEnds, splitScripts } from './dictionary.js'
import { forwardMaxMatch } from './forward-max-match.js'
import { intlSegment } from './intl-segmenter.js'
import { AMBIGUOUS, SENTENCES } from './sentences.js'

const $ = id => document.getElementById(id)
const params = new URLSearchParams(location.search)
const SVG = 'http://www.w3.org/2000/svg'

// The [start, end) character positions that each word of a split covers.
function spans(words) {
  let at = 0
  return words.map(word => [at, (at += word.length)])
}

function wordList(words, other) {
  const shared = new Set(spans(other).map(String))
  const list = document.createElement('ul')
  list.className = 'words'
  spans(words).forEach((span, i) => {
    const item = document.createElement('li')
    item.textContent = words[i]
    item.lang = 'zh-Hans'
    if (!shared.has(String(span))) item.classList.add('differs')
    list.append(item)
  })
  return list
}

function row(title, note, list) {
  const section = document.createElement('div')
  section.className = 'row'
  section.innerHTML = '<h2></h2>'
  section.firstChild.textContent = `${title} `
  const small = document.createElement('span')
  small.className = 'muted'
  small.textContent = note
  section.firstChild.append(small)
  section.append(list)
  return section
}

const element = (name, attributes) => {
  const node = document.createElementNS(SVG, name)
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value)
  return node
}

// One cell per Chinese character, and one per piece between them (digits,
// Latin letters): the positions match the spans of the splits.
function drawGraph(sentence, best, greedy) {
  const pieces = splitScripts(sentence)
  const cell = 42
  const cells = []
  let x = 12
  for (const { text: pieceText, han } of pieces) {
    if (han) {
      for (const char of pieceText) {
        cells.push({ char, x, width: cell })
        x += cell
      }
    } else {
      const width = Math.max(cell, 14 * pieceText.length + 16)
      cells.push({ char: pieceText, x, width })
      x += width
    }
  }
  // A cell index for every character position of `text`.
  const cellAt = []
  pieces.forEach(({ text: pieceText, han }) => {
    const first = cellAt.length === 0 ? 0 : cellAt.at(-1) + 1
    for (let i = 0; i < pieceText.length; i++) cellAt.push(han ? first + i : first)
  })
  const left = position => cells[cellAt[position]].x
  const right = position => cells[cellAt[position - 1]].x + cells[cellAt[position - 1]].width
  const style = getComputedStyle(document.documentElement)
  const color = name => style.getPropertyValue(name).trim()
  const baseline = 118
  const svg = element('svg', { viewBox: `0 0 ${x + 12} 190`, width: x + 12, height: 190, role: 'img', 'aria-label': `The candidate words of ${sentence}, with the path each segmenter chose` })
  const arc = (from, to, above, stroke, width, dash) => {
    const x1 = left(from) + 3
    const x2 = right(to) - 3
    const lift = Math.min(90, 18 + (x2 - x1) * 0.35) * (above ? -1 : 1)
    const y = above ? baseline - 32 : baseline + 12
    svg.append(element('path', { d: `M${x1} ${y} C${x1} ${y + lift} ${x2} ${y + lift} ${x2} ${y}`, fill: 'none', stroke, 'stroke-width': width, ...(dash ? { 'stroke-dasharray': '5 4' } : {}) }))
  }
  // Every multi-character candidate word, in the order the graph builds them.
  let offset = 0
  for (const { text: pieceText, han } of pieces) {
    if (han) {
      for (let i = 0; i < pieceText.length; i++) {
        for (const end of candidateEnds(pieceText, i)) if (end - i > 1) arc(offset + i, offset + end, true, color('--esp-line'), 2)
      }
    }
    offset += pieceText.length
  }
  for (const [start, end] of spans(best)) arc(start, end, true, color('--esp-done'), 3.5)
  for (const [start, end] of spans(greedy)) arc(start, end, false, color('--esp-write'), 2.5, true)
  cells.forEach(({ char, x: cellX, width }) => {
    svg.append(element('rect', { x: cellX + 2, y: baseline - 30, width: width - 4, height: 40, rx: 7, fill: color('--esp-bg'), stroke: color('--esp-line') }))
    const label = element('text', { x: cellX + width / 2, y: baseline - 1, 'text-anchor': 'middle' })
    label.textContent = char
    svg.append(label)
  })
  return svg
}

function update() {
  const sentence = $('text').value.trim()
  const greedy = forwardMaxMatch(sentence)
  const best = dagDp(sentence)
  const builtIn = intlSegment(sentence)
  $('rows').replaceChildren(
    row('Forward maximum matching', 'the longest known word first', wordList(greedy, best)),
    row('Graph + dynamic programming', 'the most likely split', wordList(best, greedy)),
    row('Your browser', 'Intl.Segmenter', wordList(builtIn, best)),
  )
  $('graph').replaceChildren(sentence ? drawGraph(sentence, best, greedy) : '')
  history.replaceState(null, '', `?text=${encodeURIComponent(sentence)}`)
}

for (const sentence of [...AMBIGUOUS, ...SENTENCES]) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'ghost'
  button.lang = 'zh-Hans'
  button.textContent = sentence
  button.addEventListener('click', () => {
    $('text').value = sentence
    update()
  })
  $('examples').append(button)
}
$('text').value = params.get('text') || AMBIGUOUS[0]
$('text').addEventListener('input', update)
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', update)
update()

// For the browser tests: `?selftest` checks every example and puts "pass"
// or the first failure on <html>.
addEventListener('error', event => { document.documentElement.dataset.selftest = `fail: ${event.message}` })
if (params.has('selftest')) {
  const all = [...SENTENCES, ...AMBIGUOUS]
  const joined = all.every(s => [forwardMaxMatch(s), dagDp(s), intlSegment(s)].every(words => words.join('') === s.replace(/\s/g, '')))
  const disagreements = all.filter(s => forwardMaxMatch(s).join() !== dagDp(s).join()).length
  document.documentElement.dataset.selftest = !joined ? 'fail: a split does not join back' : disagreements !== 4 ? `fail: ${disagreements} disagreements, expected 4` : 'pass'
}
