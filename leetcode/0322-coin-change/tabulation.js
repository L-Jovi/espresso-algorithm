/**
 * LeetCode 322. Coin Change — https://leetcode.com/problems/coin-change/
 * Return the fewest coins that add up to `amount`, using as many coins of
 * each value as needed, or −1 if no combination of coins works.
 *
 * Tabulation: fill fewest[0 … amount] from the smallest total up, so
 * fewest[total − coin] is ready whenever fewest[total] needs it; Infinity
 * marks totals that cannot be paid. There is no recursion, so any amount
 * works. This is the unbounded version of the 0-1 knapsack in
 * problems/knapsack-0-1: a coin can be used again, because a total may
 * build on a smaller total that already contains that coin.
 *
 * Time: O(amount · k) for k coin values. Space: O(amount).
 */

export function coinChange(coins, amount) {
  const fewest = new Array(amount + 1).fill(Infinity)
  fewest[0] = 0
  for (let total = 1; total <= amount; total++) {
    for (const coin of coins) {
      if (coin <= total) fewest[total] = Math.min(fewest[total], fewest[total - coin] + 1)
    }
  }
  return fewest[amount] === Infinity ? -1 : fewest[amount]
}

if (import.meta.main) console.log(coinChange([1, 2, 5], 11), coinChange([2], 3))
