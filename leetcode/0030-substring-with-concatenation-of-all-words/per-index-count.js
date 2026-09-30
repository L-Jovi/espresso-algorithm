/**
 * LeetCode 30. Substring with Concatenation of All Words —
 * https://leetcode.com/problems/substring-with-concatenation-of-all-words/
 * The words all have the same length. Return every position in s where
 * all of them appear back to back, each exactly as often as in the list,
 * in any order.
 *
 * Count per start position: count how often each word is needed. Then, for
 * every start position, cut the next words.length pieces out of s and tick
 * them off a copy of the counts; stop at the first piece that is not needed
 * (any more). If every piece was needed, the position is an answer.
 *
 * The counts are a Map: with a plain object, a word such as "constructor"
 * or "toString" is found on the object's prototype and breaks the count.
 * A sliding window per offset (0 … word length − 1) reuses the counts
 * between neighboring windows and brings the time down to O(n · w).
 *
 * Time: O(n · m · w) for n characters and m words of length w. Space: O(m).
 * Learning source: https://leetcode.cn/problems/substring-with-concatenation-of-all-words/solutions/40255/dong-hua-yan-shi-30-chuan-lian-suo-you-dan-ci-de-z/
 */

export function findSubstring(s, words) {
  if (words.length === 0) return []
  const wordLength = words[0].length
  const windowLength = words.length * wordLength
  const needed = new Map()
  for (const word of words) needed.set(word, (needed.get(word) ?? 0) + 1)

  const starts = []
  for (let start = 0; start + windowLength <= s.length; start++) {
    const left = new Map(needed)
    let matched = 0
    for (let at = start; matched < words.length; at += wordLength, matched++) {
      const piece = s.slice(at, at + wordLength)
      const count = left.get(piece) ?? 0
      if (count === 0) break
      left.set(piece, count - 1)
    }
    if (matched === words.length) starts.push(start)
  }
  return starts
}

if (import.meta.main) console.log(findSubstring('barfoothefoobarman', ['foo', 'bar']))
