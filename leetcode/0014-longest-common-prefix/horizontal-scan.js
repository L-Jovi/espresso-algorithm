/**
 * LeetCode 14. Longest Common Prefix — https://leetcode.com/problems/longest-common-prefix/
 * Return the longest string that every word in the list starts with.
 *
 * Horizontal scan: the common prefix of all the words is the common prefix
 * of the first word and the second, then of that result and the third, and
 * so on. It can only get shorter, so the scan stops as soon as it is empty.
 *
 * Time: O(S) for S characters in total. Space: O(1) besides the answer.
 */

export function longestCommonPrefix(strs) {
  let prefix = strs[0] ?? ''
  for (let i = 1; i < strs.length && prefix !== ''; i++) {
    let length = 0
    while (length < prefix.length && prefix[length] === strs[i][length]) length++
    prefix = prefix.slice(0, length)
  }
  return prefix
}

if (import.meta.main) console.log(longestCommonPrefix(['flower', 'flow', 'flight']))
