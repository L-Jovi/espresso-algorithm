/**
 * LeetCode 121. Best Time to Buy and Sell Stock —
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 * Given a stock's price on each day, return the largest profit from buying
 * on one day and selling on a later day, or 0 if no trade makes money.
 *
 * Brute force: try every pair of a buying day and a later selling day.
 *
 * Time: O(n²). Space: O(1).
 */

export function maxProfit(prices) {
  let best = 0
  for (let buy = 0; buy < prices.length; buy++) {
    for (let sell = buy + 1; sell < prices.length; sell++) best = Math.max(best, prices[sell] - prices[buy])
  }
  return best
}

if (import.meta.main) console.log(maxProfit([7, 1, 5, 3, 6, 4]))
