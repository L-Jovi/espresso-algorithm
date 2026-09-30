# 215. 数组中的第K个最大元素

[English](README.md) | 简体中文

> 对应英文版：2026-09-30。英文版更新后本页可能滞后。

用 Python 找出数组中第 k 大的数：先排序再从末尾数，然后改用什么都不排的快速选择。[力扣上的题目。](https://leetcode.cn/problems/kth-largest-element-in-an-array/)

## 试一试

```sh
python3 leetcode/0215-kth-largest-element-in-an-array/quick_sort.py     # 5
python3 leetcode/0215-kth-largest-element-in-an-array/quickselect.py    # 4
npm run test:python
```

## 解法，从慢到快

| 文件 | 时间 | 空间 | 变化在哪里 | 100,000 个数 |
| --- | --- | --- | --- | --- |
| [`quick_sort.py`](quick_sort.py) | 平均 O(n log n) | O(n) | 用快速排序给副本排序，再从末尾读出第 k 个数。 | 166 ms |
| [`quickselect.py`](quickselect.py) | 平均 O(n) | O(n) | 每次划分之后，只在包含答案的那一侧继续。 | 20 ms |

作为对照，同样的输入下：`heapq.nlargest(k, nums)[-1]` 需要 142 ms，`sorted(nums)[-k]` 需要 17 ms。2026-09-30 用 `timeit` 测得，取三次运行中最快的一次，k = 50,000，Python 3.11.4，macOS 15.7，Apple 芯片（arm64）的 Mac。

## 原理

两个文件都围绕一个枢轴把数分成三组：比它大、和它相等、比它小。快速排序接着把两侧都排好序。快速选择只需要知道第 k 大的数在哪一组，而各组的大小就能说明：在较大的那组里，在枢轴的副本里（那么枢轴就是答案），或者在较小的那组里。其余的组直接丢掉。枢轴随机选取时，每一步平均丢掉固定的一部分，工作量像 n + n/2 + n/4 + … 这样递减，加起来是 O(n)。

第三组很关键。只有两组时，枢轴的所有副本都会落在同一侧，一个全是相同数的数组每层只能缩小一个数。

## 过去与现在

- **快速选择和快速排序一样古老。** Tony Hoare 在 1961 年以“Find”为名发表了它，和 Quicksort 刊登在同一期 Communications of the ACM 上（[Algorithm 65: Find](https://doi.org/10.1145/366622.366647)）。
- **今天的 Python** 有 [`heapq.nlargest`](https://docs.python.org/3/library/heapq.html#heapq.nlargest) 和 `sorted`。正如上面的实测，用 C 写的 `sorted` 比这个在 Python 里运行循环的快速选择还快：在这个规模下，复杂度更好并不一定更快。
- **这个目录的来历。** [旧的 quick_sort.py](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/215-kth-larges-element-in-an-array/quick-sort.py)用 `list.remove()` 删除枢轴，这会从调用方的列表里删掉一个数；它还只分成两组：1,000 个相同的数就会引发 `RecursionError`。目录名里还有一个拼写错误“larges”。

## 刻意省略

- 枢轴极其不走运时，快速选择会退化到 O(n²)；能限制最坏情况的 introselect 这里没有收录。
- 这道题只有 Python 版。

## 验证与来源

- [`test_kth_largest.py`](test_kth_largest.py) 让两种解法跑示例，在 1,000 个随机列表上与 `sorted` 对照，检查输入没有被改动，并运行 100,000 个相同的数。
- LintCode 上的同一道题：[Kth Largest Element](https://www.lintcode.com/problem/5/)。
- 与仓库其余部分一样，采用 MIT 许可证。
