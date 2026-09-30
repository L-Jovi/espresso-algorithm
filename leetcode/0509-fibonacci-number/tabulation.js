/**
 * LeetCode 509. Fibonacci Number — https://leetcode.com/problems/fibonacci-number/
 * Return F(n), where F(0) = 0, F(1) = 1 and F(n) = F(n − 1) + F(n − 2).
 *
 * Tabulation: memoization turned inside out. Instead of recursing down
 * from n and remembering answers on the way back, fill table[0 … n] from
 * the bottom up, each entry the sum of the two before it. No recursion,
 * so no stack depth to worry about.
 *
 * Time: O(n). Space: O(n) for the table.
 * Learning source: https://labuladong.online/zh/algo/essential-technique/dynamic-programming-framework/
 */

export function fib(n) {
  const table = [0, 1]
  for (let i = 2; i <= n; i++) table[i] = table[i - 1] + table[i - 2]
  return table[n]
}

if (import.meta.main) console.log(fib(30))
