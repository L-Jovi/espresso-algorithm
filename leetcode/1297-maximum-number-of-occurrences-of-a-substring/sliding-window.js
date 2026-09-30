/**
 * LeetCode 1297. Maximum Number of Occurrences of a Substring —
 * https://leetcode.com/problems/maximum-number-of-occurrences-of-a-substring/
 * Among the substrings of s that have at most maxLetters different letters
 * and a length from minSize to maxSize, return how often the most frequent
 * one occurs; occurrences may overlap.
 *
 * A sliding window of length minSize only: if a longer substring occurs k
 * times, its first minSize letters occur at least k times as well, and
 * have no more different letters. So the best count is always reached at
 * length minSize, and maxSize is not needed. Slide a window of that length
 * along s and count, in a Map, the windows that pass the letter test. With
 * a plain object, a window such as "constructor" found the inherited
 * constructor function, and its count turned into text.
 *
 * Time: O(n · minSize): each window's letters go through a Set.
 * Space: O(n) for the counts.
 * Learning source: https://leetcode.cn/problems/maximum-number-of-occurrences-of-a-substring/solutions/59796/java-hashmap-by-npe_tle/
 */

export function maxFreq(s, maxLetters, minSize, maxSize) {
  const counts = new Map()
  let best = 0
  for (let start = 0; start + minSize <= s.length; start++) {
    const window = s.slice(start, start + minSize)
    if (new Set(window).size > maxLetters) continue
    const count = (counts.get(window) ?? 0) + 1
    counts.set(window, count)
    best = Math.max(best, count)
  }
  return best
}

if (import.meta.main) console.log(maxFreq('aababcaab', 2, 3, 4))
