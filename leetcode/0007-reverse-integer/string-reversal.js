/**
 * LeetCode 7. Reverse Integer — https://leetcode.com/problems/reverse-integer/
 * Reverse the digits of a 32-bit signed integer; return 0 if the result does
 * not fit in 32 bits.
 *
 * String reversal: turn the number into its digits, reverse them, and turn
 * the result back into a number. JavaScript numbers are doubles, so a
 * reversed value outside the 32-bit range is still exact and can be compared
 * with the limits directly.
 *
 * Time: O(d) for d digits. Space: O(d).
 */

const MAX = 2 ** 31 - 1
const MIN = -(2 ** 31)

export function reverse(x) {
  const digits = String(Math.abs(x)).split('').reverse().join('')
  const result = Math.sign(x) * Number(digits)
  return result > MAX || result < MIN ? 0 : result
}

if (import.meta.main) console.log(reverse(-123), reverse(1534236469))
