# 查找

[English](README.md) | 简体中文

> 对应英文版：2026-10-02。英文版更新后本页可能滞后。

在有序的数据里找一个数，或者在一段文本里找一个词，而不必把每一项都看一遍。

## 试一试

```sh
node searching/binary-search/binary-search.js      # 二分查找和 lower bound
java searching/binary-search/BinarySearch.java     # 同样的查找的 Java 版，带自检
node searching/kmp/kmp.js                          # KMP 字符串查找
```

KMP 示例打印的，正是这个文件最初那个未完成版本留下的几个问题的答案：

```text
strStr("mississippi", "issip"): 4
strStr("aaacaaab", "aaab"):     4
strStr("aaaaaaab", "aaab"):     4
prefix function of "aabaaab":   0 1 0 1 2 2 3
```

## 里面有什么

| 算法 | 一句话思路 | 时间 | 文件 |
| --- | --- | --- | --- |
| 二分查找 | 和中间项比较，丢掉不可能包含目标的那一半 | O(log n) | [`binary-search.js`](binary-search/binary-search.js)、[`BinarySearch.java`](binary-search/BinarySearch.java) |
| lower bound | 第一个不小于目标值的位置 | O(log n) | [`binary-search.js`](binary-search/binary-search.js) |
| KMP 字符串查找 | 失配之后，复用已经匹配的部分，而不是重新读一遍文本 | O(n + m) | [`kmp.js`](kmp/kmp.js) |

## 原理

**二分查找**维护一个区间 `[lo, hi]`：只要目标存在，它就一定在这个区间里。每一步把区间减半，所以一百万项的数组最多只需要 20 次比较。`lowerBound` 回答的是“它应该放在哪里”，在目标可能不存在时就需要这个，比如要在保持有序的前提下插入一个值。

JavaScript 版用 `lo + Math.floor((hi - lo) / 2)` 求中点。若改用 `>> 1` 这样的位移，数值会先被截成 32 位有符号整数，索引跨度达到 2³¹ 时中点就会变成负数；测试用一个虚拟的有序数组检查这些索引，无需分配几十亿个值。

**KMP** 先算出模式串的前缀函数：对每一个前缀，求出“既是它的真前缀、又是它的后缀”的最长长度。`"aabaaab"` 的前缀函数是 `0 1 0 1 2 2 3`。文本里某个字符失配时，前缀函数告诉我们，模式串还有多长一段仍然和刚读过的字符相匹配，于是只移动模式串，文本永远不回退。[LeetCode 28](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/) 问的正是这个问题。

## 过去与现在

- **一个著名的溢出。** 几十年来，教科书里的二分查找都用 `(lo + hi) / 2` 求中点。在定长整数下，一旦数组超过大约十亿项，这个和就会溢出。Joshua Bloch 在 2006 年[发现 JDK 自己的 `Arrays.binarySearch` 就有这个 bug](https://research.google/blog/extra-extra-read-all-about-it-nearly-all-binary-searches-and-mergesorts-are-broken/)，距离他写下这段代码已经过去九年；修复方法是计算 `lo + (hi - lo) / 2`，这里的两个文件都是这样写的。
- **内置函数。** JavaScript 没有数组的二分查找：`indexOf`、`includes`、`find` 都是从头扫描。Python 有 `bisect`，Java 有 `Arrays.binarySearch`。在文本里查找就用 `String.prototype.indexOf`；手写 KMP，是为了自己保证线性时间。
- **这个目录的来历。** 仓库里最早的二分查找，是教材《Algorithms, 4th Edition》中 `BinarySearch.java` 的原样拷贝（GPL-3.0），还附带了教材的库 jar。两者都已从历史中移除；这本书和[它的网站](https://algs4.cs.princeton.edu/11model/)仍然是学习这部分内容的好地方。KMP 文件原本只有一个空函数和几行示例调用，现在已经补全。

## 刻意省略

- 二分查找要求输入按传入的同一个比较函数排好序；输入无序时，结果没有意义。
- 目标出现多次时，`binarySearch` 返回其中一个位置，不一定是第一个；要第一个请用 `lowerBound`。
- KMP 和 `indexOf` 一样，按 UTF-16 编码单元比较，而不是按用户看到的字符。
- 没有收录其他字符串查找算法（Boyer–Moore、Rabin–Karp）。

## 验证与来源

- [`searching.test.js`](searching.test.js) 在 2,000 组含重复值的随机有序数组上，把二分查找和 lower bound 与线性扫描对照；在 5,000 段只含两个字母、部分匹配很常见的随机文本上，把 KMP 与 `indexOf` 对照。
- [`BinarySearch.java`](binary-search/BinarySearch.java) 运行时会在 10,000 组随机数组上与线性扫描对照自检。
- KMP 文件的第一个版本指向 labuladong 的一篇文章，它用动态规划把 KMP 构造成状态机。那个页面现在返回 404；截至 2026-09-30，这份笔记的新站点 [labuladong.online](https://labuladong.online/zh/algo/) 上也没有 KMP 的文章。这里的文件用的是同一算法的前缀函数写法。
- 与仓库其余部分一样，采用 MIT 许可证。
