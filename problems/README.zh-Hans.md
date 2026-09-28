# 经典问题

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

六个小问题，每个讲一种技巧：逐位进位、用三种方法去重、从暴力解长出动态规划、分治、三向划分，以及在归并排序中顺便数数对。

## 试一试

```sh
node problems/adding-large-numbers/digit-by-digit.js   # 相加大到 double 装不下的数
node problems/knapsack-0-1/brute-force.js              # 和两种表格解法得到同样的答案
npm test                                               # 让每一种解法互相对照检查
```

第一条命令说明了这个问题为什么存在：

```text
add("99", "99"): 198
as strings:   9007199254740993 + 1 = 9007199254740994
as numbers:   9007199254740993 + 1 = 9007199254740992
```

## 里面有什么

| 问题 | 技巧 | 解法（从慢到快） | 文件 |
| --- | --- | --- | --- |
| 大数相加 | 逐位相加，向前进位 | 逐位相加，O(n)；用 `BigInt` 核对 | [`digit-by-digit.js`](adding-large-numbers/digit-by-digit.js) |
| 数组去重 | 扫描、排序、哈希 | 额外数组 O(n²) → 先排序 O(n log n) → `Set` O(n) | [`extra-array.js`](array-deduplication/extra-array.js)、[`sort-first.js`](array-deduplication/sort-first.js)、[`set.js`](array-deduplication/set.js) |
| 0-1 背包 | 从暴力解到动态规划 | 暴力 O(2ⁿ) → 把递归写成表格 O(n · W) → 经典表格 O(n · W) | [`brute-force.js`](knapsack-0-1/brute-force.js)、[`recursion-to-table.js`](knapsack-0-1/recursion-to-table.js)、[`tabulation.js`](knapsack-0-1/tabulation.js) |
| 数组中的最大值 | 分治 | 对半分，O(n) | [`divide-and-conquer.js`](max-number-in-array/divide-and-conquer.js) |
| 荷兰国旗问题 | 一次遍历的三向划分 | O(n)，附 LeetCode 75 颜色分类 | [`partition.js`](dutch-national-flag/partition.js) |
| 小和问题 | 在归并排序中数数对 | 暴力 O(n²) → 归并排序 O(n log n) | [`brute-force.js`](small-sum/brute-force.js)、[`merge-sort.js`](small-sum/merge-sort.js) |

## 原理

每个文件开头的注释都讲了它的思路、为什么正确，以及代价。其中三个问题适合按顺序读：

- **去重的三种写法。** 为每一项都扫描一遍结果是 O(n²)。先排序能让相等的项挨在一起，但会丢掉原来的顺序。`Set` 平均 O(1) 就能回答“见过没有”。这几种写法对 `NaN` 的处理也不同：`indexOf` 用 `===` 比较，而 `NaN === NaN` 是 false，所以第一种写法会保留每一个 `NaN`。
- **背包：从暴力解到表格。** 暴力递归 `best(index, rest)` 只依赖两个数，所以每个答案都可以存进表格 `dp[index][rest]`，并按递归需要的顺序填写。`recursion-to-table.js` 一步步演示了这个转换，它是把暴力搜索变成动态规划的通用方法；`tabulation.js` 是同一张表格的教科书写法。
- **小和：用归并排序来数。** 对每一项，小和要加上它前面所有比它小的项。归并排序恰好会在两项分属左右两半时遇到每一对一次，而且两半都已有序，所以一步就能数完一整段数对。同样的技巧可以用来数逆序对。

## 过去与现在

- **`BigInt`**（ES2020）可以相加任意大小的整数：`(BigInt(a) + BigInt(b)).toString()`。测试用它来核对手写的加法，而手写版展示的正是 `BigInt` 替你完成的进位。
- **`[...new Set(array)]`**（ES2015）是今天去重的惯用写法。在有 `Set` 之前，O(n) 的做法是拿普通对象当查找表，但它会把每个键都变成字符串，于是 `1` 和 `'1'` 被当成同一个值。
- **`toSorted()`**（ES2023）返回排好序的副本，正是 `sort-first.js` 需要的：直接对输入排序会打乱调用方的数组。
- **荷兰国旗问题**由 Edsger Dijkstra 在《A Discipline of Programming》中提出。它的划分方法是三路快速排序（[`three-way-in-place.js`](../sorting/quick-sort/three-way-in-place.js)）的核心。

## 刻意省略

- `add` 只接受非负整数；没有做减法、乘法和正负号。
- `sort-first.js` 面向数字：遇到 `[1, '1', 1]` 这样的混合数组，数值比较函数会认为三者相等，因而无法把两个 `1` 放到一起。
- 背包的表格需要整数重量和整数容量，占用 O(n · W) 的内存；暴力解是指数级的，只适合几十个物品以内。
- 划分不保留各组内部元素的原有顺序。

## 验证与来源

- [`problems.test.js`](problems.test.js) 在数千组带种子的随机输入上，让每一种解法互相对照，并与一个参照对照：加法对照 `BigInt`，去重对照 `Set`，背包和小和对照暴力解，最大值对照 `Math.max`，划分则检查“三组”这一性质。它还覆盖了曾经让旧版本出错的情况：背包里重量为 0 的物品、空数组，以及前导零。
- 去重的几种写法参考了[这篇文章](https://github.com/mqyqingfeng/Blog/issues/27)；背包的表格参考了 [labuladong 的文章](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485064&idx=1&sn=550705eb67f5e71487c8b218382919d6)。
- 与仓库其余部分一样，采用 MIT 许可证。
