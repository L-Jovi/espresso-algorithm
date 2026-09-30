# 322. Coin Change

English | [简体中文](README.zh-Hans.md)

Pay an amount with the fewest coins: one recursion written three times, each version faster than the one before. [The problem on LeetCode.](https://leetcode.com/problems/coin-change/)

## Try it

```sh
node leetcode/0322-coin-change/brute-force.js    # 3 -1: 11 = 5 + 5 + 1, and 3 cannot be paid with 2s
node leetcode/0322-coin-change/tabulation.js     # 3 -1
node --test leetcode/0322-coin-change/solution.test.js
```

## Approaches, slowest first

| File | Time | Space | What changes | amount 28 | amount 10,000 |
| --- | --- | --- | --- | --- | --- |
| [`brute-force.js`](brute-force.js) | exponential | O(amount) | Tries every coin as the last one, again and again for the same totals: amount 11 takes 928 calls. | 66 ms | – |
| [`memoization.js`](memoization.js) | O(amount · k) | O(amount) | Remembers the answer for each total: amount 11 takes 34 calls. | 0.02 ms | – |
| [`tabulation.js`](tabulation.js) | O(amount · k) | O(amount) | Fills the same answers from total 0 upwards, without recursion. | 0.02 ms | 0.97 ms |

k is the number of coin values; the coins are [1, 2, 5]. A dash means the approach was left out: brute force would take far too long, and the memoized recursion, 10,000 calls deep, overflows the call stack on Node 24. Times: `npm run bench:leetcode` on 2026-09-30, Node 24.20.0, macOS 15.7 on an Apple silicon (arm64) Mac, the fastest of three runs. Compare the rows; the numbers themselves depend on the machine.

## How it works

fewest(total) is 0 for a total of 0, and impossible below 0. Otherwise, some coin was paid last, so try each one and take the best of 1 + fewest(total − coin). The brute force asks the same totals many times; memoization answers each total once. Tabulation fills the totals in increasing order, so fewest[total − coin] is always ready when fewest[total] needs it.

Paying with the largest coin first does not always work. With coins [1, 3, 4] and amount 6, it pays 4 + 1 + 1, three coins, while 3 + 3 needs two. With coins [3, 4], one of the test cases, taking 4 first leaves 2, which cannot be paid at all. The table is the unbounded version of the [0-1 knapsack](../../problems/knapsack-0-1/): a coin may be used again, because a total can build on a smaller total that already contains it.

## Then and now

- **Python 3.9 added [`functools.cache`](https://docs.python.org/3/library/functools.html#functools.cache)**, which memoizes a function with one line. JavaScript has no built-in equivalent, so `memoization.js` keeps its answers in a `Map`.
- **This folder's history.** [The old table version](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/322-coin-change/dp.js) printed its whole table on every call, and the memoized version was called `memory.js`; the files are now named after their technique, as everywhere in this folder.

## Limits

- The memoized recursion is amount ÷ smallest coin calls deep. With coins [1] and LeetCode's largest amount, 10⁴, it overflows the call stack on Node 24, which is why the table is the version to use.
- The answer is the number of coins, not which coins; keeping the last coin of each total in a second table would give those.

## Checks and credits

- [`solution.test.js`](solution.test.js) runs the three on LeetCode's examples and the edge cases, compares them on 500 random coin sets, and checks the table on amount 10⁴: 17 checks.
- MIT license, like the rest of the repository.
