# 256. Paint House

English | [简体中文](README.zh-Hans.md)

Paint a row of houses in three colors at the lowest cost, with no two neighbors alike: brute force, memoization and tabulation of one recursion. [The problem on LeetCode](https://leetcode.com/problems/paint-house/) is Premium, but the code here runs without a subscription.

## Try it

```sh
node leetcode/0256-paint-house/brute-force.js    # 10: blue, green, blue costs 2 + 5 + 3
node leetcode/0256-paint-house/tabulation.js     # 10
node --test leetcode/0256-paint-house/solution.test.js
```

## Approaches, slowest first

| File | Time | Space | What changes | 20 houses | 10,000 houses |
| --- | --- | --- | --- | --- | --- |
| [`brute-force.js`](brute-force.js) | O(2ⁿ) | O(n) | Tries both other colors for every next house, recomputing the same subproblems. | 160 ms | – |
| [`memoization.js`](memoization.js) | O(n) | O(n) | Only 3n different questions exist; each is answered once. | 0.04 ms | – |
| [`tabulation.js`](tabulation.js) | O(n) | O(n) | Fills the same answers from the last house back to the first, without recursion. | < 0.01 ms | 0.97 ms |

A dash means the approach was left out: brute force would take far too long, and the memoized recursion, 10,000 calls deep, overflows the call stack on Node 24. Times: `npm run bench:leetcode` on 2026-09-30, Node 24.20.0, macOS 15.7 on an Apple silicon (arm64) Mac, the fastest of three runs. Compare the rows; the numbers themselves depend on the machine.

## How it works

cost(i, color) is the cheapest way to paint house i and all after it, when house i gets `color`: its own price plus the cheaper of cost(i + 1, ·) for the two other colors. The answer is the cheapest of the three colors for house 0. Each call makes two more, so the brute force doubles with every house. The question depends only on i and color, so memoization answers each of the 3n questions once, and tabulation fills them from the last house backwards. Only the next house's row is ever read, so three variables would be enough.

## Then and now

- **This folder's history.** [The old table version](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/256-paint-house/dp.js) filled its table inside the caller's `costs` and printed it on every call. The table is a copy now, and the tests check that `costs` is left alone.
- The three files follow the same recipe as [509](../0509-fibonacci-number/), [322](../0322-coin-change/) and [1143](../1143-longest-common-subsequence/): recursion, memoization, then a table.

## Limits

- The memoized recursion is one call deep per house: fine for LeetCode's limit of 100 houses, not for 10,000.
- Three colors are written into the table version. LeetCode 265, Paint House II, allows k colors; it is not included.

## Checks and credits

- [`solution.test.js`](solution.test.js) runs the three on the examples, compares them on 500 random rows of houses, checks that the input is left alone, and compares memoization and tabulation on 100 houses: 14 checks.
- Learning source: [LeetCode's own solution on leetcode.cn](https://leetcode.cn/problems/paint-house/solutions/245193/fen-shua-fang-zi-by-leetcode/).
- MIT license, like the rest of the repository.
