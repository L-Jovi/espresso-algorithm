# 256. 粉刷房子

[English](README.md) | 简体中文

> 对应英文版：2026-09-30。英文版更新后本页可能滞后。

用三种颜色粉刷一排房子，相邻的房子颜色不能相同，求最低花费：同一个递归的暴力解、记忆化和表格法。[力扣上的题目](https://leetcode.cn/problems/paint-house/)是会员题，但运行这里的代码不需要订阅。

## 试一试

```sh
node leetcode/0256-paint-house/brute-force.js    # 10：蓝、绿、蓝，花费 2 + 5 + 3
node leetcode/0256-paint-house/tabulation.js     # 10
node --test leetcode/0256-paint-house/solution.test.js
```

## 解法，从慢到快

| 文件 | 时间 | 空间 | 变化在哪里 | 20 栋房子 | 10,000 栋房子 |
| --- | --- | --- | --- | --- | --- |
| [`brute-force.js`](brute-force.js) | O(2ⁿ) | O(n) | 下一栋房子的另外两种颜色都要试，同样的子问题被反复计算。 | 160 ms | – |
| [`memoization.js`](memoization.js) | O(n) | O(n) | 不同的问题只有 3n 个，每个只回答一次。 | 0.04 ms | – |
| [`tabulation.js`](tabulation.js) | O(n) | O(n) | 从最后一栋房子往前填同样的答案，不用递归。 | < 0.01 ms | 0.97 ms |

破折号表示该解法没有参加：暴力解会慢得无法等待，而 10,000 层深的记忆化递归在 Node 24 上会让调用栈溢出。时间：2026-09-30 用 `npm run bench:leetcode` 测得，Node 24.20.0，macOS 15.7，Apple 芯片（arm64）的 Mac，取三次运行中最快的一次。请比较各行之间的差别；具体数字取决于机器。

## 原理

cost(i, color) 表示第 i 栋房子涂成 `color` 时，粉刷它以及之后所有房子的最低花费：它自己的价钱，加上另外两种颜色的 cost(i + 1, ·) 中较便宜的那个。答案是第 0 栋房子三种颜色中最便宜的一个。每次调用会再发起两次调用，所以暴力解每多一栋房子就翻一倍。这个问题只取决于 i 和颜色，所以记忆化只需把 3n 个问题各回答一次，表格法则从最后一栋房子往前填。每次只会读到下一栋房子的那一行，所以三个变量就够了。

## 过去与现在

- **这个目录的来历。** [旧的表格版](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/256-paint-house/dp.js)直接在调用方的 `costs` 里填表，每次调用还会把它打印出来。现在表格是一份副本，测试也会检查 `costs` 没有被改动。
- 这三个文件和 [509](../0509-fibonacci-number/)、[322](../0322-coin-change/)、[1143](../1143-longest-common-subsequence/) 遵循同一套做法：递归，记忆化，再列表格。

## 刻意省略

- 记忆化递归每栋房子深一层：对 LeetCode 最多 100 栋房子的限制没有问题，对 10,000 栋就不行了。
- 表格版里写死了三种颜色。LeetCode 265“粉刷房子 II”允许 k 种颜色，这里没有收录。

## 验证与来源

- [`solution.test.js`](solution.test.js) 让三种解法跑示例，在 500 排随机房子上互相对照，检查输入没有被改动，并在 100 栋房子上对照记忆化和表格法：共 14 项检查。
- 学习来源：[力扣官方在 leetcode.cn 上的题解](https://leetcode.cn/problems/paint-house/solutions/245193/fen-shua-fang-zi-by-leetcode/)。
- 与仓库其余部分一样，采用 MIT 许可证。
