# 1143. Longest Common Subsequence

English | [简体中文](README.zh-Hans.md)

The longest sequence of characters that two strings share in the same order: brute force, memoization and a table. [The problem on LeetCode.](https://leetcode.com/problems/longest-common-subsequence/)

## Try it

```sh
node leetcode/1143-longest-common-subsequence/brute-force.js    # 3: "ace" is in both "abcde" and "ace"
node leetcode/1143-longest-common-subsequence/tabulation.js     # 3
node --test leetcode/1143-longest-common-subsequence/solution.test.js
```

## Approaches, slowest first

| File | Time | Space | What changes | 2 × 12 letters | 2 × 1,000 letters |
| --- | --- | --- | --- | --- | --- |
| [`brute-force.js`](brute-force.js) | O(2^(m + n)) | O(m + n) | Two 10-letter strings without a common letter take 369,511 calls. | 52 ms | – |
| [`memoization.js`](memoization.js) | O(m · n) | O(m · n) | Remembers each pair of prefixes: the same strings take 201 calls. | 0.05 ms | 31 ms |
| [`tabulation.js`](tabulation.js) | O(m · n) | O(m · n) | Fills the same answers row by row, without recursion. | 0.03 ms | 12 ms |

The 12-letter strings share no letter, the worst case for brute force; the 1,000-letter ones are random. A dash means brute force was left out. Times: `npm run bench:leetcode` on 2026-09-30, Node 24.20.0, macOS 15.7 on an Apple silicon (arm64) Mac, the fastest of three runs. Compare the rows; the numbers themselves depend on the machine.

## How it works

Look at the last character of each string. If they match, they end a common subsequence, and the rest is the answer for both strings without them, plus 1. If they do not, one of the two cannot be part of the answer: drop either one and keep the better result. The answer depends only on how long the two prefixes are, so there are m · n different questions. Memoization answers each once; the table fills them in order, with an extra row and column of zeros standing for the empty prefixes.

Unlike [718](../0718-maximum-length-of-repeated-subarray/), which asks for a common run without gaps, a subsequence may skip characters, so a mismatch keeps the best result so far instead of starting over at 0.

## Then and now

- **This folder's history.** [The old brute force](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/1143-longest-common-subsequence/brute-force.js) had no base case: once an index went below 0, `undefined === undefined` kept it recursing, and even ("abcde", "ace") overflowed the stack. [The old table](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/1143-longest-common-subsequence/dp.js) filled its first row and column with special code; the border of zeros replaces it. `memoization.js` is new, and completes the sequence.

## Limits

- The answer is the length. Walking back through the table from its last cell would recover the subsequence itself.
- The memoized recursion is up to m + n calls deep, 2,000 at LeetCode's limits, which Node handles.

## Checks and credits

- [`solution.test.js`](solution.test.js) runs the three on the examples, compares them on 500 random pairs with a reference that tries every subsequence, and compares memoization and tabulation on two 1,000-letter strings: 17 checks.
- MIT license, like the rest of the repository.
