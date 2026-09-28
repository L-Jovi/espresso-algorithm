/**
 * 0-1 knapsack, a table derived from the brute-force recursion.
 *
 * brute-force.js calls best(index, rest) with index from 0 to n and rest from
 * 0 to capacity, and the result depends only on those two numbers. So store
 * every result in a table dp[index][rest] instead of recomputing it. Each entry
 * needs only the row index + 1, so fill the rows from the last item back to
 * the first, following the recursion's own rule:
 *
 *   dp[i][j] = max(dp[i + 1][j], values[i] + dp[i + 1][j − weights[i]])
 *
 * The answer is dp[0][capacity], the same call the recursion starts with.
 * Turning "what does the recursion depend on" into "which table to fill, in
 * which order" is the general way from brute force to dynamic programming.
 *
 * Time: O(n · capacity). Space: O(n · capacity).
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
  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j <= capacity; j++) {
      const leave = dp[i + 1][j]
      const take = j >= weights[i] ? values[i] + dp[i + 1][j - weights[i]] : -Infinity
      dp[i][j] = Math.max(leave, take)
    }
  }
  return dp[0][capacity]
}

if (import.meta.main) {
  console.log('weights [3, 2, 4, 7], values [5, 6, 3, 19], capacity 11 →', knapsack([3, 2, 4, 7], [5, 6, 3, 19], 11))
}
