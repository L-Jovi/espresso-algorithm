/**
 * A small word list with made-up frequencies, for the two hand-written
 * segmenters in this folder.
 *
 * A real segmenter learns how often each word occurs from a large body of
 * text. These counts are invented, but kept in a believable order: 的 is
 * far more common than 猕猴桃 (kiwi fruit). The list holds the words of the
 * example sentences and little more, so the segmenters show their
 * algorithms rather than the size of a dictionary.
 */

export const FREQUENCIES = new Map([
  // Very common words.
  ['的', 50000], ['和', 30000], ['在', 20000], ['是', 20000], ['这', 20000], ['下', 20000], ['个', 20000],
  ['有', 15000], ['小', 10000], ['年', 10000], ['月', 5000], ['日', 3000], ['至', 2000], ['未', 1000],
  ['一直', 1500],
  // Time.
  ['明天', 2000], ['后天', 800], ['前天', 500], ['大前天', 100], ['大后天', 100],
  ['下个', 300], ['个月', 600], ['下个月', 800], ['这周', 300], ['下周', 300], ['周六', 800], ['周三', 800],
  // Food and containers.
  ['鸡蛋', 500], ['苹果', 800], ['牛奶', 600], ['巧克力', 300], ['香蕉', 400], ['葡萄', 400], ['猕猴桃', 100],
  ['桃子', 300], ['杨梅', 100], ['圣女', 100], ['圣女果', 50], ['黄瓜', 300], ['小黄瓜', 50], ['瓶', 500], ['块', 800],
  // Expiry.
  ['过期', 300], ['有效', 1000], ['有效期', 400],
  // The two classic ambiguous sentences.
  ['结婚', 1500], ['和尚', 200], ['尚未', 500], ['研究', 5000], ['研究生', 800], ['生命', 3000], ['命', 300], ['起源', 500],
])

export const TOTAL = [...FREQUENCIES.values()].reduce((sum, count) => sum + count, 0)
const MAX_WORD_LENGTH = Math.max(...[...FREQUENCIES.keys()].map(word => word.length))

// No word list can hold every number, so a run of Chinese numerals such as
// 三十五 or 二零二三 is one more candidate word, with this made-up count.
// It is only a candidate: a word that begins with a numeral, such as 一直
// (always), still wins where it fits.
export const NUMBER_FREQUENCY = 1000
const NUMERAL = /[零〇一二两三四五六七八九十百千万]/

/** Code-point boundaries expressed as UTF-16 offsets, like String.slice. */
export function characterOffsets(text) {
  const offsets = [0]
  for (const character of text) offsets.push(offsets.at(-1) + character.length)
  return offsets
}

/**
 * The end positions (exclusive) of every candidate word that starts at
 * `start` in a run of Chinese characters, shortest first: the single
 * character, which is always allowed so that unknown characters still
 * form a word, every dictionary word found there, and the run of numerals
 * starting there. Positions are UTF-16 offsets; start must be a code-point
 * boundary, and no candidate splits a surrogate pair.
 */
export function candidateEnds(text, start) {
  const firstEnd = start + (text.codePointAt(start) > 0xffff ? 2 : 1)
  const ends = new Set([firstEnd])
  for (let end = firstEnd; end <= Math.min(text.length, start + MAX_WORD_LENGTH); end += text.codePointAt(end) > 0xffff ? 2 : 1) {
    if (FREQUENCIES.has(text.slice(start, end))) ends.add(end)
  }
  let numeralsEnd = start
  while (numeralsEnd < text.length && NUMERAL.test(text[numeralsEnd])) numeralsEnd++
  if (numeralsEnd > start) ends.add(numeralsEnd)
  return [...ends].sort((a, b) => a - b)
}

/** How often a candidate word occurs: its count, the number count, or 1 for an unknown character. */
export function frequency(word) {
  if (FREQUENCIES.has(word)) return FREQUENCIES.get(word)
  if ([...word].every(char => NUMERAL.test(char))) return NUMBER_FREQUENCY
  return 1
}

/**
 * Split a sentence into the runs of Chinese characters, which need
 * segmenting, and the pieces between them: digits and Latin letters stay
 * together, as in 2023; any other character stands alone; spaces are
 * dropped. jieba splits its input the same way before it segments.
 */
export function splitScripts(sentence) {
  return (sentence.match(/\p{Script=Han}+|[A-Za-z0-9]+|\S/gu) ?? []).map(text => ({ text, han: /\p{Script=Han}/u.test(text) }))
}
