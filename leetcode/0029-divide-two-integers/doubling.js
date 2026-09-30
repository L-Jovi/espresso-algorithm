/**
 * LeetCode 29. Divide Two Integers — https://leetcode.com/problems/divide-two-integers/
 * Divide two 32-bit integers, rounding toward zero, without multiplication,
 * division or remainder; clamp the one quotient that overflows,
 * −2³¹ / −1, to 2³¹ − 1.
 *
 * Doubling: instead of subtracting the divisor once per step, keep doubling
 * it, by adding it to itself, until one more doubling would pass what is
 * left of the dividend. Subtract that chunk, add its count (1, 2, 4, …) to
 * the quotient, and repeat on the rest. Each round removes more than half
 * of what is left, so a quotient of q needs only about log₂ q rounds.
 *
 * Adding a number to itself also avoids JavaScript's shift operators, which
 * work on 32-bit signed integers: 1 << 31 is already negative.
 *
 * Time: O(log² q) for a quotient q. Space: O(1).
 * Learning source: https://github.com/azl397985856/leetcode/blob/master/problems/29.divide-two-integers.md
 */

const MAX = 2 ** 31 - 1
const MIN = -(2 ** 31)

export function divide(dividend, divisor) {
  if (dividend === MIN && divisor === -1) return MAX
  const negative = (dividend < 0) !== (divisor < 0)
  const step = Math.abs(divisor)
  let rest = Math.abs(dividend)
  let quotient = 0
  while (rest >= step) {
    let chunk = step
    let count = 1
    while (chunk + chunk <= rest) {
      chunk += chunk
      count += count
    }
    rest -= chunk
    quotient += count
  }
  return negative ? 0 - quotient : quotient // 0 − 0 is +0, while −0 would be −0
}

if (import.meta.main) console.log(divide(10, 3), divide(7, -3), divide(MIN, -1))
