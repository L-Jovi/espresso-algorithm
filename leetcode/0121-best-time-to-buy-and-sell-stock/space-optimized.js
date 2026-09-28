/**
 * @param {number[]} prices
 * @return {number}
 * https://labuladong.github.io/algo/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E7%B3%BB%E5%88%97/%E5%9B%A2%E7%81%AD%E8%82%A1%E7%A5%A8%E9%97%AE%E9%A2%98.html
 * O(1)
 */
const maxProfit = function(prices) {
  const n = prices.length

  let dp_i_0 = 0
  let dp_i_1 = -Infinity

  for (let i = 0; i < n; i++) {
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
    dp_i_1 = Math.max(dp_i_1, -prices[i])
  }

  return dp_i_0
}


const prices = [7, 1, 5, 3, 6, 4]
console.log(maxProfit(prices))
