/**
 * LeetCode 1143. Longest Common Subsequence —
 * https://leetcode.com/problems/longest-common-subsequence/
 * Return the length of the longest sequence of characters that appears in
 * both strings in the same order, though not necessarily side by side:
 * "ace" is a subsequence of "abcde".
 *
 * Memoization: the recursion of brute-force.js depends on nothing but i
 * and j, so there are only m · n different questions. Remember every
 * answer: the two 10-letter strings without a common letter now take 201
 * calls instead of 369,511 (measured).
 *
 * Time: O(m · n). Space: O(m · n) for the memo; the recursion is up to
 * m + n calls deep.
 */

export function longestCommonSubsequence(text1, text2) {
  const memo = Array.from({ length: text1.length }, () => new Array(text2.length))

  function lcs(i, j) {
    if (i < 0 || j < 0) return 0
    if (memo[i][j] === undefined) {
      memo[i][j] = text1[i] === text2[j] ? 1 + lcs(i - 1, j - 1) : Math.max(lcs(i - 1, j), lcs(i, j - 1))
    }
    return memo[i][j]
  }

  return lcs(text1.length - 1, text2.length - 1)
}

if (import.meta.main) console.log(longestCommonSubsequence('abcde', 'ace'))
