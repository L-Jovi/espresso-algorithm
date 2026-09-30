/**
 * LeetCode 1143. Longest Common Subsequence —
 * https://leetcode.com/problems/longest-common-subsequence/
 * Return the length of the longest sequence of characters that appears in
 * both strings in the same order, though not necessarily side by side:
 * "ace" is a subsequence of "abcde".
 *
 * Brute force: lcs(i, j) is the answer for the first i + 1 characters of
 * text1 and the first j + 1 of text2. If their last characters match, those
 * end a common subsequence: 1 + lcs(i − 1, j − 1). Otherwise drop the last
 * character of one string or of the other, and keep the better result. An
 * empty prefix has nothing in common, which ends the recursion. The same
 * pairs (i, j) are solved again and again: two 10-letter strings without a
 * common letter make 369,511 calls (measured).
 *
 * Time: O(2^(m + n)) in the worst case. Space: O(m + n) for the recursion.
 */

export function longestCommonSubsequence(text1, text2) {
  function lcs(i, j) {
    if (i < 0 || j < 0) return 0
    if (text1[i] === text2[j]) return 1 + lcs(i - 1, j - 1)
    return Math.max(lcs(i - 1, j), lcs(i, j - 1))
  }
  return lcs(text1.length - 1, text2.length - 1)
}

if (import.meta.main) console.log(longestCommonSubsequence('abcde', 'ace'))
