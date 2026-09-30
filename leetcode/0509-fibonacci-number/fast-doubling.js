/**
 * LeetCode 509. Fibonacci Number — https://leetcode.com/problems/fibonacci-number/
 * Return F(n), where F(0) = 0, F(1) = 1 and F(n) = F(n − 1) + F(n − 2).
 *
 * Fast doubling: two identities jump from F(k) and F(k + 1) straight to
 *   F(2k)     = F(k) · (2 · F(k + 1) − F(k))
 *   F(2k + 1) = F(k)² + F(k + 1)²
 * (they follow from the matrix power [[1, 1], [1, 0]]ᵏ). Read the bits of
 * n from the highest: every bit doubles k, and a 1 bit then adds one more
 * step. So F(n) takes about log₂ n rounds instead of n additions.
 *
 * JavaScript numbers are exact integers up to 2⁵³: F(78) still fits, F(79)
 * does not. LeetCode asks only up to n = 30; with BigInt values, the same
 * steps compute any F(n) exactly.
 *
 * Time: O(log n). Space: O(1).
 */

export function fib(n) {
  let a = 0 // F(k)
  let b = 1 // F(k + 1)
  let bit = 1
  while (bit <= n) bit *= 2
  for (bit /= 2; bit >= 1; bit /= 2) {
    const even = a * (2 * b - a) // F(2k)
    const odd = a * a + b * b // F(2k + 1)
    if (n & bit) [a, b] = [odd, even + odd]
    else [a, b] = [even, odd]
  }
  return a
}

if (import.meta.main) console.log(fib(30), fib(78))
