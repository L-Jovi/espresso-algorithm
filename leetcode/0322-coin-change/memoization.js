/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function(coins, amount) {
  const map = {}

  const memory = (total, map) => {
    if (total in map) {
      return map[total]
    }

    // base case
    if (total < 0) {
      return -1
    }
    if (total === 0) {
      return 0
    }

    let count = Infinity
    for (let coin of coins) {
      const restCount = memory(total - coin, map)
      if (restCount === -1) {
        continue
      }

      count = Math.min(count, restCount + 1)
    }

    map[total] = count !== Infinity ? count : -1
    return map[total]
  }

  return memory(amount, map)
}


const coins = [1, 2, 5]
console.log(coinChange(coins, 11))
