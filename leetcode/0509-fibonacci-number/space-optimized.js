/**
 * LeetCode 509. Fibonacci Number — https://leetcode.com/problems/fibonacci-number/
 * Return F(n), where F(0) = 0, F(1) = 1 and F(n) = F(n − 1) + F(n − 2).
 *
 * Space-optimized: every entry of the table in tabulation.js needs only
 * the two entries before it, so two variables can replace the table.
 *
 * Time: O(n). Space: O(1).
 */

export function fib(n) {
  let previous = 0 // F(i)
  let current = 1 // F(i + 1)
  for (let i = 0; i < n; i++) [previous, current] = [current, previous + current]
  return previous
}

if (import.meta.main) console.log(fib(30))
