/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function(coins, amount) {
  const map = {}

  const memory = (remain, map) => {
    if (remain in map) {
      return map[remain]
    }

    // base case
    if (remain < 0) {
      return -1
    }
    if (remain === 0) {
      return 0
    }

    let count = Infinity
    for (let coin of coins) {
      const restCount = memory(remain - coin, map)
      if (restCount === -1) {
        continue
      }

      count = Math.min(count, restCount + 1)
    }

    map[remain] = count !== Infinity ? count : -1
    return map[remain]
  }

  return memory(amount, map)
}


const coins = [1, 2, 5]
console.log(coinChange(coins, 11))
