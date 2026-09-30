/**
 * LeetCode 22. Generate Parentheses — https://leetcode.com/problems/generate-parentheses/
 * List every well-formed string of n pairs of parentheses.
 *
 * Backtracking: build the string one character at a time and only make
 * choices that can still lead to a well-formed string. An opening
 * parenthesis is allowed while fewer than n have been used; a closing one
 * is allowed while it has an open one to close. Every string that reaches
 * length 2n is then well formed, so nothing is generated and thrown away.
 *
 * The number of answers is the n-th Catalan number (1, 2, 5, 14, 42, …),
 * which grows like 4ⁿ / n^1.5.
 *
 * Time: O(4ⁿ / √n): each answer of length 2n costs O(n) to build.
 * Space: O(n) for the recursion, besides the answers.
 * Learning source: the LeetCode discussion post "Easy to understand Java
 * backtracking solution" (#10100).
 */

export function generateParenthesis(n) {
  const strings = []

  function extend(prefix, open, close) {
    if (prefix.length === 2 * n) {
      strings.push(prefix)
      return
    }
    if (open < n) extend(prefix + '(', open + 1, close)
    if (close < open) extend(prefix + ')', open, close + 1)
  }

  extend('', 0, 0)
  return strings
}

if (import.meta.main) console.log(generateParenthesis(3))
