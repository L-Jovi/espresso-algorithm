# 53. Maximum Subarray

English | [简体中文](README.zh-Hans.md)

The largest sum of neighboring numbers, from trying every subarray down to one pass with one variable. [The problem on LeetCode.](https://leetcode.com/problems/maximum-subarray/)

## Try it

```sh
node leetcode/0053-maximum-subarray/brute-force.js        # 6: 4 − 1 + 2 + 1
node leetcode/0053-maximum-subarray/space-optimized.js    # 6
node --test leetcode/0053-maximum-subarray/solution.test.js
```

## Approaches, slowest first

| File | Time | Space | What changes | 10,000 numbers | 1,000,000 numbers |
| --- | --- | --- | --- | --- | --- |
| [`brute-force.js`](brute-force.js) | O(n²) | O(1) | Tries every subarray, with one running sum per start position. | 52 ms | – |
| [`tabulation.js`](tabulation.js) | O(n) | O(n) | dp[i], the best sum that ends at i, either extends dp[i − 1] or starts over at nums[i]. | 0.04 ms | 4.92 ms |
| [`space-optimized.js`](space-optimized.js) | O(n) | O(1) | Only dp[i − 1] is ever read, so one variable replaces the table. | 0.02 ms | 1.66 ms |

A dash means brute force was left out: it would take minutes. Times: `npm run bench:leetcode` on 2026-09-30, Node 24.20.0, macOS 15.7 on an Apple silicon (arm64) Mac, the fastest of three runs. Compare the rows; the numbers themselves depend on the machine.

## How it works

The best subarray ends somewhere. Let dp[i] be the best sum of a subarray that ends exactly at i. Either it is nums[i] alone, or it continues the best subarray ending at i − 1; a negative dp[i − 1] can only make things worse, so it is dropped. The answer is the largest dp[i]. Keeping only the last dp value while walking the array is known as Kadane's algorithm.

## Then and now

- **This folder's history.** [The old brute force](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/53-maximum-subarray/dp.js), then called dp.js, stored all n² sums in a table: it ran out of memory at 50,000 numbers, while LeetCode allows 100,000. It also started from 0, so an array of only negative numbers returned 0. [The old dp-compress.js](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/53-maximum-subarray/dp-compress.js), now `tabulation.js`, was correct but still used an O(n) table; `space-optimized.js` is new. Both files had the problem statement copied in; it is gone.

## Limits

- LeetCode suggests a divide-and-conquer solution as a follow-up, O(n log n); it is not included.
- The answer is the sum, not where the subarray starts and ends.

## Checks and credits

- [`solution.test.js`](solution.test.js) runs the three on the examples, including an array of only negative numbers, compares them with a reference that adds up every subarray on 1,000 random arrays, and compares the linear versions on 100,000 numbers: 20 checks.
- Learning source for the table: [a write-up on leetcode.cn](https://leetcode.cn/problems/maximum-subarray/solutions/42428/zui-da-zi-xu-he-cshi-xian-si-chong-jie-fa-bao-li-f/).
- MIT license, like the rest of the repository.
