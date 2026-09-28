/**
 * 0-1 knapsack, the classic table over prefixes of the items.
 *
 * dp[i][w] is the largest value obtainable from the first i items with
 * capacity w. Item i either stays out, leaving dp[i − 1][w], or goes in, giving
 * values[i − 1] + dp[i − 1][w − weights[i − 1]] when it fits. The first row
 * (no items) is all zeros, and the answer is dp[n][capacity].
 *
 * This is recursion-to-table.js read in the other direction: rows grow with the
 * number of items considered instead of shrinking with it. The capacity loop
 * starts at 0, so an item of weight 0 is counted even with a full bag.
 *
 * Letting an item be taken again, the "unbounded" knapsack, only changes which
 * row the take option reads from; that version is the same idea as
 * leetcode/322-coin-change.
 *
 * Time: O(n · capacity). Space: O(n · capacity).
 * Learning source: labuladong's knapsack article,
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485064&idx=1&sn=550705eb67f5e71487c8b218382919d6
 */

/**
 * @param {number[]} weights non-negative integers
 * @param {number[]} values
 * @param {number} capacity non-negative integer
 * @returns {number}
 */
export function knapsack(weights, values, capacity) {
  const n = weights.length
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w]
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], values[i - 1] + dp[i - 1][w - weights[i - 1]])
      }
    }
  }
  return dp[n][capacity]
}

if (import.meta.main) {
  console.log('weights [2, 1, 3], values [4, 2, 3], capacity 4 →', knapsack([2, 1, 3], [4, 2, 3], 4))
}
