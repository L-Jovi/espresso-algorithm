/**
 * LeetCode 256. Paint House (Premium) — https://leetcode.com/problems/paint-house/
 * Paint a row of houses red, blue or green, where costs[i][c] is the price
 * of painting house i with color c and neighbors must differ in color.
 * Return the lowest total price.
 *
 * Brute force: cost(i, color) is the cheapest way to paint houses i and
 * after, when house i gets `color`. It is that house's price plus the
 * cheaper of cost(i + 1, other color) for the two other colors. Trying all
 * three colors for house 0 gives the answer. Every house doubles the number
 * of calls, because nothing is remembered.
 *
 * Time: O(2ⁿ). Space: O(n) for the recursion.
 * Learning source: https://leetcode.cn/problems/paint-house/solutions/245193/fen-shua-fang-zi-by-leetcode/
 */

const COLORS = [0, 1, 2]

export function minCost(costs) {
  if (costs.length === 0) return 0

  function cost(i, color) {
    if (i === costs.length - 1) return costs[i][color]
    return costs[i][color] + Math.min(...COLORS.filter(c => c !== color).map(c => cost(i + 1, c)))
  }

  return Math.min(...COLORS.map(color => cost(0, color)))
}

if (import.meta.main) console.log(minCost([[17, 2, 17], [16, 16, 5], [14, 3, 19]]))
