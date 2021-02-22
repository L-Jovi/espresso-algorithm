/**
 * @param {number[]} prices
 * @return {number}
 * https://labuladong.github.io/algo/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E7%B3%BB%E5%88%97/%E5%9B%A2%E7%81%AD%E8%82%A1%E7%A5%A8%E9%97%AE%E9%A2%98.html
 */
const maxProfit = function(prices) {
  const n = prices.length
  const dp = Array.from(Array(n), () => Array(2).fill(0))
  console.log('init : ', dp)

  dp[0][0] = 0
  dp[0][1] = -prices[0]

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(
      dp[i - 1][0],
      dp[i - 1][1] + prices[i]
    )

    dp[i][1] = Math.max(
      dp[i - 1][1],
      - prices[i]
    )
  }

  console.log('dp : ', dp)
  return dp[n - 1][0]
}


const prices = [7, 1, 5, 3, 6, 4]
console.log(maxProfit(prices))
