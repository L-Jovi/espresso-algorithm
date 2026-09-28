/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function(prices) {
  const length = prices.length
  let max = 0

  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      max = Math.max(max, prices[j] - prices[i])
    }
  }

  return max
}


const prices = [7, 1, 5, 3, 6, 4]
console.log(maxProfit(prices))
