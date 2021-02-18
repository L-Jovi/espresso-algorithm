/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 * O(n^k)
 */
const coinChange = function(coins, amount) {
  const poolRest = (remain) => {
    // base case
    if (remain < 0) {
      return -1
    }
    if (remain === 0) {
      return 0
    }

    let count = Infinity
    for (let coin of coins) {
      const restCount = poolRest(remain - coin)
      if (restCount === -1) {
        continue
      }
      count = Math.min(count, restCount + 1)
    }

    return count !== Infinity ? count : -1
  }

  return poolRest(amount)
}


const coins = [1, 2, 5]
console.log(coinChange(coins, 11))
