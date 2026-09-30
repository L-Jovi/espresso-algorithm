/**
 * LeetCode 8. String to Integer (atoi) — https://leetcode.com/problems/string-to-integer-atoi/
 * Read an integer from the start of a string the way C's atoi does: skip
 * leading spaces, take an optional sign and then digits, ignore whatever
 * follows, and clamp the result to the 32-bit signed range.
 *
 * Regex: /^ *([+-]?\d+)/ describes exactly the part to read. If it does not
 * match (for example "words 42"), the answer is 0. Number() turns the digits
 * into a double; long digit strings lose precision only beyond 2^53, far
 * outside the 32-bit range, where the clamp gives the same answer anyway.
 *
 * Time: O(n). Space: O(n) for the matched text.
 */

const MAX = 2 ** 31 - 1
const MIN = -(2 ** 31)

export function myAtoi(s) {
  const match = /^ *([+-]?\d+)/.exec(s)
  if (!match) return 0
  const value = Math.min(Math.max(Number(match[1]), MIN), MAX)
  return value === 0 ? 0 : value // "-0" reads as 0, not -0
}

if (import.meta.main) console.log(myAtoi('   -42'), myAtoi('1337c0d3'), myAtoi('91283472332'))
