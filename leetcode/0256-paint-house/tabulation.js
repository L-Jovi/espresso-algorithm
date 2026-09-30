/**
 * LeetCode 256. Paint House (Premium) — https://leetcode.com/problems/paint-house/
 * Paint a row of houses red, blue or green, where costs[i][c] is the price
 * of painting house i with color c and neighbors must differ in color.
 * Return the lowest total price.
 *
 * Tabulation: fill the memo of memoization.js without recursion, from the
 * last house back to the first, since cost(i, ·) needs only cost(i + 1, ·).
 * The table is a copy, because filling it inside `costs` would change the
 * caller's array. Only the row below is ever read, so three variables would
 * be enough, as in the space-optimized versions of 53 and 121.
 *
 * Time: O(n). Space: O(n) for the table.
 * Learning source: https://leetcode.cn/problems/paint-house/solutions/245193/fen-shua-fang-zi-by-leetcode/
 */

export function minCost(costs) {
  if (costs.length === 0) return 0
  const table = costs.map(row => [...row])
  for (let i = table.length - 2; i >= 0; i--) {
    const below = table[i + 1]
    table[i][0] += Math.min(below[1], below[2])
    table[i][1] += Math.min(below[0], below[2])
    table[i][2] += Math.min(below[0], below[1])
  }
  return Math.min(...table[0])
}

if (import.meta.main) console.log(minCost([[17, 2, 17], [16, 16, 5], [14, 3, 19]]))
