/**
 * LeetCode 7. Reverse Integer — https://leetcode.com/problems/reverse-integer/
 * Reverse the digits of a 32-bit signed integer; return 0 if the result does
 * not fit in 32 bits.
 *
 * Digit math: pop the last digit with x % 10, push it onto the result with
 * result · 10 + digit, and drop it from x with Math.trunc(x / 10). The
 * remainder keeps the sign of x, so negative numbers need no special case.
 * Stop as soon as the result leaves the 32-bit range.
 *
 * Time: O(d) for d digits. Space: O(1).
 */

const MAX = 2 ** 31 - 1
const MIN = -(2 ** 31)

export function reverse(x) {
  let result = 0
  while (x !== 0) {
    result = result * 10 + (x % 10)
    if (result > MAX || result < MIN) return 0
    x = Math.trunc(x / 10)
  }
  return result
}

if (import.meta.main) console.log(reverse(-123), reverse(1534236469))
