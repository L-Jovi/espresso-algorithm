/**
 * LeetCode 322. Coin Change — https://leetcode.com/problems/coin-change/
 * Return the fewest coins that add up to `amount`, using as many coins of
 * each value as needed, or −1 if no combination of coins works.
 *
 * Brute force: fewest(total) is 0 for a total of 0, and impossible below
 * 0. Otherwise try every coin as the last one paid, and take the best of
 * 1 + fewest(total − coin). The same totals are solved again and again:
 * amount 11 with coins [1, 2, 5] makes 928 calls (measured).
 *
 * Time: exponential in amount. Space: O(amount / smallest coin) for the
 * recursion.
 */

export function coinChange(coins, amount) {
  function fewest(total) {
    if (total === 0) return 0
    if (total < 0) return -1
    let best = Infinity
    for (const coin of coins) {
      const rest = fewest(total - coin)
      if (rest >= 0) best = Math.min(best, rest + 1)
    }
    return best === Infinity ? -1 : best
  }

  return fewest(amount)
}

if (import.meta.main) console.log(coinChange([1, 2, 5], 11), coinChange([2], 3))
