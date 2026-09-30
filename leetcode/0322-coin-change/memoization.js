/**
 * LeetCode 322. Coin Change — https://leetcode.com/problems/coin-change/
 * Return the fewest coins that add up to `amount`, using as many coins of
 * each value as needed, or −1 if no combination of coins works.
 *
 * Memoization: the recursion of brute-force.js depends on nothing but
 * `total`, so there are at most amount + 1 different questions. Remember
 * each answer: amount 11 with coins [1, 2, 5] now makes 34 calls instead
 * of 928 (measured).
 *
 * The recursion is still as deep as amount / smallest coin. With coins [1]
 * and LeetCode's largest amount, 10⁴, that is 10⁴ calls deep, which
 * overflows the call stack on Node 24 (measured); tabulation.js fills the
 * same answers with a loop.
 *
 * Time: O(amount · k) for k coin values. Space: O(amount).
 */

export function coinChange(coins, amount) {
  const memo = new Map()

  function fewest(total) {
    if (total === 0) return 0
    if (total < 0) return -1
    if (memo.has(total)) return memo.get(total)
    let best = Infinity
    for (const coin of coins) {
      const rest = fewest(total - coin)
      if (rest >= 0) best = Math.min(best, rest + 1)
    }
    memo.set(total, best === Infinity ? -1 : best)
    return memo.get(total)
  }

  return fewest(amount)
}

if (import.meta.main) console.log(coinChange([1, 2, 5], 11), coinChange([2], 3))
