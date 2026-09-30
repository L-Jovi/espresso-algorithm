/**
 * LeetCode 256. Paint House (Premium) — https://leetcode.com/problems/paint-house/
 * Paint a row of houses red, blue or green, where costs[i][c] is the price
 * of painting house i with color c and neighbors must differ in color.
 * Return the lowest total price.
 *
 * Memoization: the same recursion as brute-force.js, but cost(i, color)
 * depends on nothing else, so there are only 3n different questions.
 * Remember each answer the first time, and every later call returns at
 * once.
 *
 * The recursion is still one call deep per house. That is fine for
 * LeetCode's 100 houses, but 10,000 houses overflow the call stack on
 * Node 24 (measured); tabulation.js fills the same answers with a loop.
 *
 * Time: O(n). Space: O(n) for the memo and the recursion.
 * Learning source: https://leetcode.cn/problems/paint-house/solutions/245193/fen-shua-fang-zi-by-leetcode/
 */

const COLORS = [0, 1, 2]

export function minCost(costs) {
  if (costs.length === 0) return 0
  const memo = costs.map(() => new Array(COLORS.length))

  function cost(i, color) {
    if (memo[i][color] !== undefined) return memo[i][color]
    const rest = i === costs.length - 1 ? 0 : Math.min(...COLORS.filter(c => c !== color).map(c => cost(i + 1, c)))
    memo[i][color] = costs[i][color] + rest
    return memo[i][color]
  }

  return Math.min(...COLORS.map(color => cost(0, color)))
}

if (import.meta.main) console.log(minCost([[17, 2, 17], [16, 16, 5], [14, 3, 19]]))
