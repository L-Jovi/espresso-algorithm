/**
 * Forward maximum matching: the simplest segmenter that uses a word list.
 *
 * Chinese is written without spaces between words, so before a program can
 * count, search or translate words, it has to find where they begin and
 * end. Forward maximum matching reads a run of Chinese characters from the
 * left, takes the longest candidate word that starts at the current
 * position, and continues right after it.
 *
 * It is fast and needs nothing but the list, but it is greedy: the longest
 * word at one position can take a character that a better split needs
 * next. In 结婚的和尚未结婚的 (the married and the not yet married) it
 * takes 和尚 (monk) where the sentence means 和 · 尚未 (and · not yet);
 * dag-dp.js compares whole splits instead.
 *
 * Time: O(n · L) for n characters and words of at most L characters.
 */

import { candidateEnds, splitScripts } from './dictionary.js'
import { AMBIGUOUS } from './sentences.js'

export function forwardMaxMatch(sentence) {
  const words = []
  for (const { text, han } of splitScripts(sentence)) {
    if (!han) {
      words.push(text)
      continue
    }
    for (let start = 0; start < text.length;) {
      const end = candidateEnds(text, start).at(-1) // the longest candidate
      words.push(text.slice(start, end))
      start = end
    }
  }
  return words
}

if (import.meta.main) {
  for (const sentence of AMBIGUOUS) console.log(forwardMaxMatch(sentence).join(' · '))
}
