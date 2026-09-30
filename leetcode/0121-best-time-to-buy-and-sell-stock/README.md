# 121. Best Time to Buy and Sell Stock

English | [简体中文](README.zh-Hans.md)

Choose the best day to buy and a later day to sell: every pair of days, then a table with two states per day, then two variables. [The problem on LeetCode.](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

## Try it

```sh
node leetcode/0121-best-time-to-buy-and-sell-stock/brute-force.js        # 5: buy at 1, sell at 6
node leetcode/0121-best-time-to-buy-and-sell-stock/space-optimized.js    # 5
node --test leetcode/0121-best-time-to-buy-and-sell-stock/solution.test.js
```

## Approaches, slowest first

| File | Time | Space | What changes | 20,000 days | 1,000,000 days |
| --- | --- | --- | --- | --- | --- |
| [`brute-force.js`](brute-force.js) | O(n²) | O(1) | Tries every pair of a buying day and a later selling day. | 259 ms | – |
| [`tabulation.js`](tabulation.js) | O(n) | O(n) | Keeps, for every day, the best result with and without the share. | 0.30 ms | 13 ms |
| [`space-optimized.js`](space-optimized.js) | O(n) | O(1) | Each day reads only the day before, so two variables replace the table. | 0.29 ms | 1.36 ms |

A dash means brute force was left out: it would take minutes. Times: `npm run bench:leetcode` on 2026-09-30, Node 24.20.0, macOS 15.7 on an Apple silicon (arm64) Mac, the fastest of three runs. Compare the rows; the numbers themselves depend on the machine.

## How it works

At the end of each day you either hold the share or you don't. **free** is the best profit so far without it: you had none yesterday either, or you sell today. **held** is the best balance while holding it, negative because you paid: you held it yesterday, or you buy today. Only one trade is allowed, so a purchase always starts from a balance of 0.

The first day needs care. In the table, day 0 must allow buying, so held starts at −prices[0]. The two-variable version starts from the state before day 0, held = −∞, because its loop handles day 0 like any other day. The same two states, with more of them for more trades or a cooldown, solve the rest of the stock problems (122, 123, 188, 309 and 714).

## Then and now

- **This folder's history.** [The old table version](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/121-best-time-to-buy-and-sell-stock/dp.js) started day 0 with held = −∞, so it could never buy on day 0: [1, 5] returned 0 instead of 4. LeetCode's example, [7, 1, 5, 3, 6, 4], buys on day 1, which is how the bug went unnoticed. The file also printed its table twice per call.

## Limits

- One trade only. The other stock problems are not included.

## Checks and credits

- [`solution.test.js`](solution.test.js) runs the three on the examples, including a purchase on day 0, and compares them with brute force on 1,000 random price lists: 16 checks.
- Learning source: [labuladong, one method for all the stock problems](https://labuladong.online/zh/algo/dynamic-programming/stock-problem-summary/).
- MIT license, like the rest of the repository.
