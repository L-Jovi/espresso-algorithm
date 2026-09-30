/**
 * LeetCode 121. Best Time to Buy and Sell Stock —
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 * Given a stock's price on each day, return the largest profit from buying
 * on one day and selling on a later day, or 0 if no trade makes money.
 *
 * Tabulation over two states: at the end of day i you either hold the
 * share or you don't.
 * - free[i], the best profit without the share: you had none yesterday
 *   either, or you sell today. free[i] = max(free[i − 1], held[i − 1] + price).
 * - held[i], the best balance while holding it (negative, since you paid):
 *   you held it yesterday, or you buy today. Only one trade is allowed, so
 *   a purchase starts from a balance of 0. held[i] = max(held[i − 1], −price).
 * Day 0 starts the table with free[0] = 0 and held[0] = −prices[0]: buying
 * on day 0 must be possible. The answer is free on the last day.
 *
 * The same two-state table, with more states for more trades or a cooldown,
 * solves the whole family of stock problems (122, 123, 188, 309, 714).
 *
 * Time: O(n). Space: O(n); space-optimized.js keeps only the last day.
 * Learning source: https://labuladong.online/zh/algo/dynamic-programming/stock-problem-summary/
 */

export function maxProfit(prices) {
  const free = new Array(prices.length)
  const held = new Array(prices.length)
  free[0] = 0
  held[0] = -prices[0]
  for (let i = 1; i < prices.length; i++) {
    free[i] = Math.max(free[i - 1], held[i - 1] + prices[i])
    held[i] = Math.max(held[i - 1], -prices[i])
  }
  return free[prices.length - 1]
}

if (import.meta.main) console.log(maxProfit([7, 1, 5, 3, 6, 4]))
