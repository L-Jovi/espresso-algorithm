# 509. Fibonacci Number

English | [简体中文](README.zh-Hans.md)

Five ways to compute a Fibonacci number, from exponential time down to logarithmic, checked against each other. [The problem on LeetCode.](https://leetcode.com/problems/fibonacci-number/)

## Try it

```sh
node leetcode/0509-fibonacci-number/recursion.js        # 832040, after 2,692,537 calls
node leetcode/0509-fibonacci-number/fast-doubling.js    # 832040 8944394323791464
node --test leetcode/0509-fibonacci-number/solution.test.js
```

The second number is F(78), the largest Fibonacci number that a JavaScript number holds exactly.

## Approaches, slowest first

| File | Time | Space | What changes | n = 32 |
| --- | --- | --- | --- | --- |
| [`recursion.js`](recursion.js) | O(φⁿ) | O(n) | The definition as code. It recomputes the same values again and again: fib(35) makes 29,860,703 calls. | 37 ms |
| [`memoization.js`](memoization.js) | O(n) | O(n) | Remembers each F(k) the first time it is computed: fib(35) makes 69 calls. | < 0.01 ms |
| [`tabulation.js`](tabulation.js) | O(n) | O(n) | Fills the same values from F(0) upwards, without recursion. | < 0.01 ms |
| [`space-optimized.js`](space-optimized.js) | O(n) | O(1) | Keeps only the last two values, the only ones the next step reads. | < 0.01 ms |
| [`fast-doubling.js`](fast-doubling.js) | O(log n) | O(1) | Jumps from F(k) to F(2k) with two identities. | < 0.01 ms |

φ ≈ 1.618 is the golden ratio. Times: `npm run bench:leetcode` on 2026-09-30, Node 24.20.0, macOS 15.7 on an Apple silicon (arm64) Mac, the fastest of three runs. Compare the rows; the numbers themselves depend on the machine.

## How it works

Plain recursion is slow because it forgets. fib(5) asks for fib(4) and fib(3), and fib(4) asks for fib(3) again, so the calls form a tree in which the same questions come back over and over; the tree grows by a factor of about φ with each step of n.

Memoization gives the recursion a memory. Tabulation turns it around and fills the answers from the bottom up. Once the order is fixed, two more savings appear: each step reads only the two values before it, so two variables are enough, and two identities, F(2k) = F(k) · (2F(k + 1) − F(k)) and F(2k + 1) = F(k)² + F(k + 1)², skip most values altogether.

Recursion, then memoization, then a table, then fewer variables: this is the general recipe of dynamic programming, and the progressions of [322](../0322-coin-change/), [256](../0256-paint-house/), [1143](../1143-longest-common-subsequence/), [121](../0121-best-time-to-buy-and-sell-stock/) and [53](../0053-maximum-subarray/) follow it too.

## Then and now

- **`BigInt`** (ES2020) holds integers of any size. With it, the steps of `fast-doubling.js` compute F(1000), a number of 209 digits, exactly ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)).
- **Python 3.9 added [`functools.cache`](https://docs.python.org/3/library/functools.html#functools.cache)**: one `@cache` line above a recursive `fib` turns it into `memoization.js`.
- **This folder's history.** The four original files each loaded a timer from a `libs/` folder that no longer exists, so none of them ran, and [the table version](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/509-fibonacci-number/dp.js) used its loop counter without declaring it. Two copies of the same files, in `problems/fibonacci-sequence/` and `data-structure/fib.js`, were retired; see the [migration ledger](../../docs/migration.md).

## Limits

- JavaScript numbers are exact up to F(78); F(79) is larger than 2⁵³. LeetCode asks only up to n = 30.
- At this size the four fast approaches all finish in under 0.01 ms, so the bench cannot tell them apart. O(n) and O(log n) separate only on much larger n, which needs `BigInt`.

## Checks and credits

- [`solution.test.js`](solution.test.js) runs all five on seven values of n up to LeetCode's 30, and checks the four fast ones exactly against a `BigInt` loop for every n up to 78: 36 checks.
- Learning source: [labuladong's framework for dynamic programming](https://labuladong.online/zh/algo/essential-technique/dynamic-programming-framework/), which starts from this problem.
- MIT license, like the rest of the repository.
