/**
 * LeetCode 1143. Longest Common Subsequence —
 * https://leetcode.com/problems/longest-common-subsequence/
 * Return the length of the longest sequence of characters that appears in
 * both strings in the same order, though not necessarily side by side:
 * "ace" is a subsequence of "abcde".
 *
 * Tabulation: the recurrence of memoization.js, filled row by row without
 * recursion. table[i][j] is the answer for the first i characters of text1
 * and the first j of text2; the extra row and column of zeros stand for the
 * empty prefixes, so the first row and column need no special case.
 *
 * Time: O(m · n). Space: O(m · n); keeping two rows would do.
 */

export function longestCommonSubsequence(text1, text2) {
  const table = Array.from({ length: text1.length + 1 }, () => new Array(text2.length + 1).fill(0))
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      table[i][j] = text1[i - 1] === text2[j - 1]
        ? table[i - 1][j - 1] + 1
        : Math.max(table[i - 1][j], table[i][j - 1])
    }
  }
  return table[text1.length][text2.length]
}

if (import.meta.main) console.log(longestCommonSubsequence('abcde', 'ace'))
