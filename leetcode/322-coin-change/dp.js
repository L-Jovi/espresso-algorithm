/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function(coins, amount) {
  // 0 ~ amount
  const dp = Array.from(Array(amount + 1), () => Infinity)
  // base case
  dp[0] = 0

  // bottom up
  for (let remain = 0; remain < dp.length; remain++) {
    for (let coin of coins) {
      if (remain - coin < 0) {
        continue
      }

      dp[remain] = Math.min(dp[remain], dp[remain - coin] + 1)
    }
  }

  return dp[amount] === Infinity ?  -1 : dp[amount]
}


const coins = [1, 2, 5]
console.log(coinChange(coins, 11))
