/**
 * LeetCode 121. Best Time to Buy and Sell Stock —
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 * Given a stock's price on each day, return the largest profit from buying
 * on one day and selling on a later day, or 0 if no trade makes money.
 *
 * Space-optimized: the table in tabulation.js only ever looks one day back,
 * so two variables are enough. They start from the state before day 0,
 * when nobody holds the share (held = −∞), and day 0 is handled by the loop
 * like every other day. Updating `free` before `held` on the same day is
 * safe: it could only sell a share bought that same day, for a profit of 0.
 *
 * Time: O(n). Space: O(1).
 * Learning source: https://labuladong.online/zh/algo/dynamic-programming/stock-problem-summary/
 */

export function maxProfit(prices) {
  let free = 0
  let held = -Infinity
  for (const price of prices) {
    free = Math.max(free, held + price)
    held = Math.max(held, -price)
  }
  return free
}

if (import.meta.main) console.log(maxProfit([7, 1, 5, 3, 6, 4]))
