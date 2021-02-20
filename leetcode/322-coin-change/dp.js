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
  for (let total = 0; total < dp.length; total++) {
    for (let coin of coins) {
      if (total - coin < 0) {
        continue
      }

      // choice
      dp[total] = Math.min(
        dp[total],
        dp[total - coin] + 1
      )
    }
  }

  console.log('dp: ', dp)
  return dp[amount] === Infinity ? -1 : dp[amount]
}


const coins = [1, 2, 5]
console.log(coinChange(coins, 11))
