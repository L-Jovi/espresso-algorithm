/**
 * A graph of candidate words plus dynamic programming, the core of the
 * jieba segmenter.
 *
 * Every candidate word in a run of Chinese characters is an edge of a
 * graph, from the word's first position to the position after its last,
 * so every way to split the run is a path from its start to its end. A
 * word's probability is its frequency divided by the total, and a split is
 * as likely as the product of its words' probabilities. Dynamic
 * programming finds the most likely path from the end backwards: best[i],
 * the best log probability of the text from position i on, is the largest
 * log p(word) + best[j] over the edges i → j. Logarithms turn the product
 * into a sum, which stays in range where a product of small numbers would
 * round to 0.
 *
 * Comparing whole splits fixes the greedy mistakes of forward-max-match.js:
 * 和 · 尚未 (and · not yet) beats 和尚 · 未 (monk · not), because 和 and 尚未
 * are both far more common than 和尚 and 未.
 *
 * Time: O(n · L) for n characters and words of at most L characters.
 * Learning source: jieba (https://github.com/fxsjy/jieba, MIT), which cuts
 * with the same graph and path; it adds a hidden Markov model for words
 * that are not in its dictionary, which this file leaves out.
 */

import { candidateEnds, characterOffsets, frequency, splitScripts, TOTAL } from './dictionary.js'
import { AMBIGUOUS } from './sentences.js'

export function dagDp(sentence) {
  const words = []
  for (const { text, han } of splitScripts(sentence)) {
    if (han) words.push(...bestSplit(text))
    else words.push(text)
  }
  return words
}

function bestSplit(text) {
  const logTotal = Math.log(TOTAL)
  const best = new Array(text.length + 1).fill(-Infinity)
  const next = new Array(text.length) // where the best word starting at i ends
  best[text.length] = 0
  for (const i of characterOffsets(text).slice(0, -1).reverse()) {
    for (const j of candidateEnds(text, i)) {
      const score = Math.log(frequency(text.slice(i, j))) - logTotal + best[j]
      if (score > best[i]) {
        best[i] = score
        next[i] = j
      }
    }
  }
  const words = []
  for (let i = 0; i < text.length; i = next[i]) words.push(text.slice(i, next[i]))
  return words
}

if (import.meta.main) {
  for (const sentence of AMBIGUOUS) console.log(dagDp(sentence).join(' · '))
}
