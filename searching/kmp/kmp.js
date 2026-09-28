/**
 * Knuth–Morris–Pratt (KMP) string search.
 *
 * The brute-force search compares the pattern at every position of the text
 * and, after a mismatch, starts over one position later, forgetting what it
 * has already read. KMP never moves backwards in the text. It first computes,
 * for every prefix of the pattern, the length of the longest proper prefix
 * that is also a suffix (the "prefix function"). After a mismatch, that length
 * says how much of the pattern is already known to match, so the search only
 * shifts the pattern, never the text.
 *
 * Example: searching "aaab" in "aaaaaaab". When the fourth character fails,
 * the three a's just read are still a valid start, so KMP keeps them instead of
 * rereading them.
 *
 * Time: O(n + m) for a text of length n and a pattern of length m.
 * Space: O(m) for the prefix function.
 * Learning source: https://labuladong.online/algo/ (KMP, explained there with a
 * state machine; this file uses the equivalent prefix-function form).
 */

/**
 * prefix[i] = length of the longest proper prefix of pattern[0..i] that is also
 * a suffix of it.
 *
 * @param {string} pattern
 * @returns {number[]}
 */
export function prefixFunction(pattern) {
  const prefix = new Array(pattern.length).fill(0)
  for (let i = 1, length = 0; i < pattern.length; i++) {
    while (length > 0 && pattern[i] !== pattern[length]) length = prefix[length - 1]
    if (pattern[i] === pattern[length]) length++
    prefix[i] = length
  }
  return prefix
}

/**
 * The index of the first occurrence of `needle` in `haystack`, or -1.
 * An empty needle is found at index 0, like String.prototype.indexOf.
 *
 * @param {string} haystack
 * @param {string} needle
 * @returns {number}
 */
export function strStr(haystack, needle) {
  if (needle.length === 0) return 0
  const prefix = prefixFunction(needle)
  for (let i = 0, matched = 0; i < haystack.length; i++) {
    while (matched > 0 && haystack[i] !== needle[matched]) matched = prefix[matched - 1]
    if (haystack[i] === needle[matched]) matched++
    if (matched === needle.length) return i - needle.length + 1
  }
  return -1
}

if (import.meta.main) {
  console.log('strStr("mississippi", "issip"):', strStr('mississippi', 'issip'))
  console.log('strStr("aaacaaab", "aaab"):    ', strStr('aaacaaab', 'aaab'))
  console.log('strStr("aaaaaaab", "aaab"):    ', strStr('aaaaaaab', 'aaab'))
  console.log('prefix function of "aabaaab":  ', prefixFunction('aabaaab').join(' '))
}
