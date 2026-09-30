# 26. Remove Duplicates from Sorted Array

English | [简体中文](README.zh-Hans.md)

Keep each value of a sorted array once, in place: first by deleting the repeats, then by copying the kept values forward. [The problem on LeetCode.](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

## Try it

```sh
node leetcode/0026-remove-duplicates-from-sorted-array/splice.js          # 5 [ 0, 1, 2, 3, 4 ]
node leetcode/0026-remove-duplicates-from-sorted-array/two-pointers.js    # 5 [ 0, 1, 2, 3, 4 ]
node --test leetcode/0026-remove-duplicates-from-sorted-array/solution.test.js
```

## Approaches, slowest first

| File | Time | Space | What changes | 20,000 equal numbers |
| --- | --- | --- | --- | --- |
| [`splice.js`](splice.js) | O(n²) | O(1) | Deletes each repeat, and every deletion shifts the rest of the array. | 89 ms |
| [`two-pointers.js`](two-pointers.js) | O(n) | O(1) | Copies each new value just after the last one kept; nothing is shifted. | 0.15 ms |

Times: `npm run bench:leetcode` on 2026-09-30, Node 24.20.0, macOS 15.7 on an Apple silicon (arm64) Mac, the fastest of three runs. Compare the rows; the numbers themselves depend on the machine.

## How it works

`splice(i, 1)` reads naturally, "delete this one", but it moves every item after i one step to the left. An array of n equal numbers needs n − 1 deletions, each moving what is left: about n²/2 moves. The two-pointer version never deletes. `slow` marks the last value kept, `fast` reads ahead, and each value that differs from the last one kept is copied to the next free place. LeetCode then reads only the first k items, so whatever remains after them does not matter.

## Then and now

- **`[...new Set(nums)]`** is today's way to remove duplicates in JavaScript, but it builds a new array, while this problem asks for the change in place with O(1) extra space. [problems/array-deduplication](../../problems/array-deduplication/) compares three copying approaches.
- **This folder's history.** [The old two-pointer version](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/26-remove-duplicates-from-sorted-array/2-pointers.js) returned the array itself instead of 0 for an empty array.

## Limits

- The input must be sorted, so that equal values sit side by side.
- Both approaches change the caller's array; that is what the problem asks for.

## Checks and credits

- [`solution.test.js`](solution.test.js) checks the returned count and the first k items of both on the examples and an empty array, and compares them with a `Set` on 1,000 random sorted arrays: 11 checks.
- MIT license, like the rest of the repository.
