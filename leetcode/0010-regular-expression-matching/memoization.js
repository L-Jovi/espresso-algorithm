/**
 * LeetCode 10. Regular Expression Matching —
 * https://leetcode.com/problems/regular-expression-matching/
 * Tell whether a pattern matches the whole string, where "." matches any one
 * character and "x*" matches zero or more copies of x.
 *
 * Memoization: match(i, j) answers "does p from position j match s from
 * position i?". If p[j] is followed by "*", either skip "x*" entirely,
 * match(i, j + 2), or, when s[i] matches x, spend it on the star and keep the
 * same pattern position, match(i + 1, j). Otherwise one character must match
 * on both sides, match(i + 1, j + 1).
 *
 * There are only (m + 1)(n + 1) different questions, and the table answers
 * each one once. Without it, 20 × "a" against "a*a*a*a*a*a*b" takes 526,239
 * calls; with it, at most 294 answers are computed.
 *
 * Time: O(m · n). Space: O(m · n).
 */

export function isMatch(s, p) {
  const memo = Array.from({ length: s.length + 1 }, () => new Array(p.length + 1))

  function match(i, j) {
    if (memo[i][j] !== undefined) return memo[i][j]
    let result
    if (j === p.length) {
      result = i === s.length
    } else {
      const first = i < s.length && (p[j] === s[i] || p[j] === '.')
      result = p[j + 1] === '*'
        ? match(i, j + 2) || (first && match(i + 1, j))
        : first && match(i + 1, j + 1)
    }
    memo[i][j] = result
    return result
  }

  return match(0, 0)
}

if (import.meta.main) console.log(isMatch('aab', 'c*a*b'), isMatch('mississippi', 'mis*is*p*.'))
