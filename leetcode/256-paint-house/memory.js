/**
 * @param {number[][]} costs
 * @return {number}
 * https://leetcode-cn.com/problems/paint-house/solution/fen-shua-fang-zi-by-leetcode/
 */
const minCost = (costs) => {
  const map = {}
  return Math.min(
    paintPay(costs, map, 0, 0),
    paintPay(costs, map, 0, 1),
    paintPay(costs, map, 0, 2)
  )
}

const paintPay = (costs, map, i, color) => {
  const key = i + '_' + color
  if (key in map) {
    return map[key]
  }

  let pay = costs[i][color]

  // backtrack
  if (i === costs.length - 1) {
    return pay
  }

  if (color === 0) {
    pay += Math.min(
      paintPay(costs, map, i + 1, 1),
      paintPay(costs, map, i + 1, 2)
    )
  } else if (color === 1) {
    pay += Math.min(
      paintPay(costs, map, i + 1, 0),
      paintPay(costs, map, i + 1, 2)
    )
  } else if (color === 2) {
    pay += Math.min(
      paintPay(costs, map, i + 1, 0),
      paintPay(costs, map, i + 1, 1)
    )
  }

  map[key] = pay

  return pay
}


const costs = [
  [17, 2, 17],
  [16, 16, 5],
  [14, 3, 19]
]
console.log(minCost(costs))
