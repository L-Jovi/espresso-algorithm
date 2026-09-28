# Classic problems

English | [简体中文](README.zh-Hans.md)

Six small problems, each teaching one technique: carrying digits, removing duplicates three ways, dynamic programming grown out of brute force, divide and conquer, a three-way partition, and counting pairs while merge sorting.

## Try it

```sh
node problems/adding-large-numbers/digit-by-digit.js   # add numbers too large for a double
node problems/knapsack-0-1/brute-force.js              # the same answer as the two table versions
npm test                                               # check every approach against the others
```

The first command shows why the problem exists:

```text
add("99", "99"): 198
as strings:   9007199254740993 + 1 = 9007199254740994
as numbers:   9007199254740993 + 1 = 9007199254740992
```

## What's inside

| Problem | Technique | Approaches, slowest first | Files |
| --- | --- | --- | --- |
| Adding large numbers | Add digit by digit, carrying the tens | digit by digit, O(n); checked against `BigInt` | [`digit-by-digit.js`](adding-large-numbers/digit-by-digit.js) |
| Array deduplication | Scanning, sorting, hashing | extra array O(n²) → sort first O(n log n) → `Set` O(n) | [`extra-array.js`](array-deduplication/extra-array.js), [`sort-first.js`](array-deduplication/sort-first.js), [`set.js`](array-deduplication/set.js) |
| 0-1 knapsack | From brute force to dynamic programming | brute force O(2ⁿ) → the recursion as a table O(n · W) → the classic table O(n · W) | [`brute-force.js`](knapsack-0-1/brute-force.js), [`recursion-to-table.js`](knapsack-0-1/recursion-to-table.js), [`tabulation.js`](knapsack-0-1/tabulation.js) |
| Max number in array | Divide and conquer | halves, O(n) | [`divide-and-conquer.js`](max-number-in-array/divide-and-conquer.js) |
| Dutch national flag | One-pass three-way partition | O(n), plus LeetCode 75 Sort Colors | [`partition.js`](dutch-national-flag/partition.js) |
| Small sum | Counting pairs during merge sort | brute force O(n²) → merge sort O(n log n) | [`brute-force.js`](small-sum/brute-force.js), [`merge-sort.js`](small-sum/merge-sort.js) |

## How it works

Every file begins with a comment that explains its idea, why it is correct and what it costs. Three of the problems are worth reading as a sequence:

- **Deduplication, three ways.** Scanning the result for every item is O(n²). Sorting first brings equal items together, but loses the original order. A `Set` answers "have I seen this?" in O(1) on average. The versions also disagree on `NaN`: `indexOf` compares with `===`, and `NaN === NaN` is false, so the first version keeps every `NaN`.
- **Knapsack, from brute force to a table.** The brute-force recursion `best(index, rest)` depends on only two numbers, so each answer can be stored in a table `dp[index][rest]` and filled in the order the recursion needs it. That translation, done step by step in `recursion-to-table.js`, is the general way to turn a brute-force search into dynamic programming; `tabulation.js` is the textbook form of the same table.
- **Small sum, counted by merge sort.** For every item, the small sum adds the earlier items that are smaller. Merge sort meets each such pair exactly once, when the two items sit in different halves, and because both halves are sorted it can count a whole block of pairs in one step. The same trick counts inversions.

## Then and now

- **`BigInt`** (ES2020) adds integers of any size: `(BigInt(a) + BigInt(b)).toString()`. The tests use it to check the hand-written addition, which shows the carrying that `BigInt` does for you.
- **`[...new Set(array)]`** (ES2015) is today's idiom for removing duplicates. Before `Set`, an O(n) version used a plain object as the lookup table, which turns every key into a string, so `1` and `'1'` counted as the same value.
- **`toSorted()`** (ES2023) returns a sorted copy, which is what `sort-first.js` needs: sorting the input itself would reorder the caller's array.
- **The Dutch national flag problem** was posed by Edsger Dijkstra in *A Discipline of Programming*. Its partition is the heart of three-way quick sort ([`three-way-in-place.js`](../sorting/quick-sort/three-way-in-place.js)).

## Limits

- `add` takes non-negative integers only; subtraction, multiplication and signs are left out.
- `sort-first.js` is meant for numbers: with a mix such as `[1, '1', 1]`, a numeric comparator treats all three as equal and cannot bring the two `1`s together.
- The knapsack tables need integer weights and capacity, and use O(n · W) memory; the brute force is exponential and practical only for a few dozen items.
- The partition does not keep the order of items inside each group.

## Checks and credits

- [`problems.test.js`](problems.test.js) checks every approach against the others and against a reference: `BigInt` for addition, `Set` for deduplication, brute force for knapsack and small sum, `Math.max` for the maximum, and the three-group property for the partition, on thousands of seeded random inputs. It also covers the cases that broke earlier versions: items of weight 0 in the knapsack, an empty array, and leading zeros.
- The deduplication approaches follow [this article](https://github.com/mqyqingfeng/Blog/issues/27); the knapsack table follows [labuladong's article](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485064&idx=1&sn=550705eb67f5e71487c8b218382919d6).
- MIT license, like the rest of the repository.
