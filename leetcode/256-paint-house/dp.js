/**
 * @param {number[][]} costs
 * @return {number}
 * https://leetcode-cn.com/problems/paint-house/solution/fen-shua-fang-zi-by-leetcode/
 */
const minCost = (costs) => {
  if (costs.length === 0) {
    return 0
  }
  // from last row bottom -> top backtrack
  for (let i = costs.length - 2; i >= 0; i--) {
    // direct modify costs, or copy another one
    costs[i][0] += Math.min(costs[i + 1][1], costs[i + 1][2])
    costs[i][1] += Math.min(costs[i + 1][0], costs[i + 1][2])
    costs[i][2] += Math.min(costs[i + 1][0], costs[i + 1][1])
  }

  console.log(costs)

  // 1st row collect min pay
  return Math.min(costs[0][0], costs[0][1], costs[0][2])
}


const costs = [
  [17, 2, 17],
  [16, 16, 5],
  [14, 3, 19]
]
console.log(minCost(costs))
