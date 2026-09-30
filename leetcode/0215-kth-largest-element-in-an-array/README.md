# 215. Kth Largest Element in an Array

English | [简体中文](README.zh-Hans.md)

Find the k-th largest number in an array, in Python: sort it and count from the end, then quickselect, which sorts nothing. [The problem on LeetCode.](https://leetcode.com/problems/kth-largest-element-in-an-array/)

## Try it

```sh
python3 leetcode/0215-kth-largest-element-in-an-array/quick_sort.py     # 5
python3 leetcode/0215-kth-largest-element-in-an-array/quickselect.py    # 4
npm run test:python
```

## Approaches, slowest first

| File | Time | Space | What changes | 100,000 numbers |
| --- | --- | --- | --- | --- |
| [`quick_sort.py`](quick_sort.py) | O(n log n) on average | O(n) | Sorts a copy with quick sort, and reads the k-th number from the end. | 166 ms |
| [`quickselect.py`](quickselect.py) | O(n) on average | O(n) | After each split, continues only on the side that holds the answer. | 20 ms |

For comparison, on the same input: `heapq.nlargest(k, nums)[-1]` takes 142 ms and `sorted(nums)[-k]` 17 ms. Measured with `timeit`, the fastest of three runs, with k = 50,000 on Python 3.11.4, macOS 15.7 on an Apple silicon (arm64) Mac, 2026-09-30.

## How it works

Both files split the numbers around a pivot into three groups: larger than the pivot, equal to it, and smaller. Quick sort then sorts both sides. Quickselect only needs to know which group holds the k-th largest, and the group sizes tell: among the larger numbers, among the copies of the pivot (then the pivot is the answer), or among the smaller ones. The other groups are dropped. With a random pivot, each step drops a constant share on average, so the work shrinks like n + n/2 + n/4 + …, which adds up to O(n).

The third group matters. With only two groups, every copy of the pivot lands on the same side, and an array of equal numbers shrinks by one number per level.

## Then and now

- **Quickselect is as old as quick sort.** Tony Hoare published it as "Find" in 1961, in the same issue of Communications of the ACM as Quicksort ([Algorithm 65: Find](https://doi.org/10.1145/366622.366647)).
- **Today's Python** has [`heapq.nlargest`](https://docs.python.org/3/library/heapq.html#heapq.nlargest) and `sorted`. As measured above, `sorted`, written in C, beats this quickselect, whose loops run in Python: a better complexity does not always win at this size.
- **This folder's history.** [The old quick_sort.py](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/215-kth-larges-element-in-an-array/quick-sort.py) removed the pivot with `list.remove()`, which deleted a number from the caller's list, and split into two groups: 1,000 equal numbers raised `RecursionError`. The folder name also had a typo, "larges".

## Limits

- Quickselect is O(n²) with extremely unlucky pivots; the introselect variant bounds the worst case and is not included.
- Only Python versions exist for this problem.

## Checks and credits

- [`test_kth_largest.py`](test_kth_largest.py) runs both on the examples, compares them with `sorted` on 1,000 random lists, checks that the input is left alone, and runs 100,000 equal numbers.
- The same problem on LintCode: [Kth Largest Element](https://www.lintcode.com/problem/5/).
- MIT license, like the rest of the repository.
