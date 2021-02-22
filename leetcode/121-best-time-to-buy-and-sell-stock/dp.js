/**
 * @param {number[]} prices
 * @return {number}
 * https://labuladong.github.io/algo/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E7%B3%BB%E5%88%97/%E5%9B%A2%E7%81%AD%E8%82%A1%E7%A5%A8%E9%97%AE%E9%A2%98.html
 *
 * dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
                 max(   选择 rest  ,           选择 sell      )
   解释：今天我没有持有股票，有两种可能：
   要么是我昨天就没有持有，然后今天选择 rest，所以我今天还是没有持有；
   要么是我昨天持有股票，但是今天我 sell 了，所以我今天没有持有股票了。


   dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
                 max(   选择 rest  ,           选择 buy         )

   解释：今天我持有着股票，有两种可能：
   要么我昨天就持有着股票，然后今天选择 rest，所以我今天还持有着股票；
   要么我昨天本没有持有，但今天我选择 buy，所以今天我就持有股票了。

   本题中，k 可以忽略（只能交易一次 k = 1）
 */
const maxProfit = function(prices) {
  const n = prices.length
  const dp = Array.from(Array(n), () => Array(2).fill(0))
  console.log('init : ', dp)

  dp[0][0] = 0
  dp[0][1] = -Infinity 

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
