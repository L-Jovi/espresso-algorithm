/**
 * LeetCode 509. Fibonacci Number — https://leetcode.com/problems/fibonacci-number/
 * Return F(n), where F(0) = 0, F(1) = 1 and F(n) = F(n − 1) + F(n − 2).
 *
 * Memoization: the recursion of recursion.js, but every F(k) is remembered
 * the first time it is computed, so each is computed once: fib(35) makes
 * 69 calls instead of 29,860,703 (measured).
 *
 * Time: O(n). Space: O(n) for the memo and the recursion.
 */

export function fib(n) {
  const memo = new Map()
  const f = k => {
    if (k < 2) return k
    if (!memo.has(k)) memo.set(k, f(k - 1) + f(k - 2))
    return memo.get(k)
  }
  return f(n)
}

if (import.meta.main) console.log(fib(30))
