/**
 * The built-in segmenter: Intl.Segmenter with word granularity.
 *
 * JavaScript engines find word boundaries with ICU, the Unicode library
 * that browsers and Node include; for Chinese, ICU uses a large dictionary
 * of its own. It needs no word list from us and knows far more words than
 * dictionary.js, but its choices come with the ICU version and cannot be
 * changed: Node 24.20 (ICU 78.3) cuts 圣女果 (cherry tomato) into 圣女 · 果,
 * which is why the first version of this folder added that word to jieba
 * by hand.
 *
 * Time: linear in the length of the text.
 */

import { SENTENCES } from './sentences.js'

const segmenter = new Intl.Segmenter('zh-Hans', { granularity: 'word' })

export function intlSegment(sentence) {
  return [...segmenter.segment(sentence)].map(({ segment }) => segment).filter(segment => segment.trim() !== '')
}

if (import.meta.main) console.log(intlSegment(SENTENCES.at(-2)).join(' · '), `(ICU ${process.versions.icu})`)
