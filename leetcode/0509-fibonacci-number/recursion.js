/**
 * LeetCode 509. Fibonacci Number — https://leetcode.com/problems/fibonacci-number/
 * Return F(n), where F(0) = 0, F(1) = 1 and F(n) = F(n − 1) + F(n − 2).
 *
 * Recursion, straight from the definition. The two calls recompute the
 * same smaller values over and over: fib(35) makes 29,860,703 calls
 * (measured), and every step of n multiplies the count by about
 * φ ≈ 1.618, the golden ratio.
 *
 * Time: O(φⁿ). Space: O(n) for the recursion.
 */

export function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2)
}

if (import.meta.main) console.log(fib(30))
