# 322. 零钱兑换

[English](README.md) | 简体中文

> 对应英文版：2026-09-30。英文版更新后本页可能滞后。

用最少的硬币凑出一个金额：同一个递归写三遍，一版比一版快。[力扣上的题目。](https://leetcode.cn/problems/coin-change/)

## 试一试

```sh
node leetcode/0322-coin-change/brute-force.js    # 3 -1：11 = 5 + 5 + 1，而 3 无法只用 2 凑出
node leetcode/0322-coin-change/tabulation.js     # 3 -1
node --test leetcode/0322-coin-change/solution.test.js
```

## 解法，从慢到快

| 文件 | 时间 | 空间 | 变化在哪里 | 金额 28 | 金额 10,000 |
| --- | --- | --- | --- | --- | --- |
| [`brute-force.js`](brute-force.js) | 指数级 | O(amount) | 把每种硬币都当作最后付的一枚来试，同样的金额被反复求解：金额 11 要调用 928 次。 | 66 ms | – |
| [`memoization.js`](memoization.js) | O(amount · k) | O(amount) | 记下每个金额的答案：金额 11 只调用 34 次。 | 0.02 ms | – |
| [`tabulation.js`](tabulation.js) | O(amount · k) | O(amount) | 从金额 0 往上填同样的答案，不用递归。 | 0.02 ms | 0.97 ms |

k 是硬币面值的种数；这里的硬币是 [1, 2, 5]。破折号表示该解法没有参加：暴力解会慢得无法等待，而 10,000 层深的记忆化递归在 Node 24 上会让调用栈溢出。时间：2026-09-30 用 `npm run bench:leetcode` 测得，Node 24.20.0，macOS 15.7，Apple 芯片（arm64）的 Mac，取三次运行中最快的一次。请比较各行之间的差别；具体数字取决于机器。

## 原理

金额为 0 时 fewest(total) 是 0，金额小于 0 则无解。否则，总有一枚硬币是最后付的，于是逐一试过每种硬币，取 1 + fewest(total − coin) 中最好的一个。暴力解会把同样的金额问很多遍；记忆化让每个金额只求解一次。表格法按金额从小到大填写，所以 fewest[total] 需要 fewest[total − coin] 时，它总是已经算好了。

先付最大的硬币并不总是对的。硬币为 [1, 3, 4]、金额为 6 时，它会付 4 + 1 + 1，三枚，而 3 + 3 只要两枚。测试中的一个用例是硬币 [3, 4]：先拿 4 会剩下 2，根本付不出来。这张表是 [0-1 背包](../../problems/knapsack-0-1/)的“完全背包”版本：同一种硬币可以再用，因为一个金额可以建立在一个已经包含这种硬币的更小金额之上。

## 过去与现在

- **Python 3.9 加入了 [`functools.cache`](https://docs.python.org/3/library/functools.html#functools.cache)**，一行就能为函数加上记忆化。JavaScript 没有内置的对应物，所以 `memoization.js` 把答案存在一个 `Map` 里。
- **这个目录的来历。** [旧的表格版](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/322-coin-change/dp.js)每次调用都会打印整张表，记忆化版原来叫 `memory.js`；现在这些文件都以所用的技巧命名，和这个目录里的其他文件一样。

## 刻意省略

- 记忆化递归的深度是“金额 ÷ 最小面值”。硬币为 [1]、金额为 LeetCode 允许的最大值 10⁴ 时，它在 Node 24 上会让调用栈溢出，所以应该使用表格版。
- 答案只是硬币的枚数，不包括是哪几枚；在第二张表里记下每个金额最后付的那枚硬币，就能还原出来。

## 验证与来源

- [`solution.test.js`](solution.test.js) 让三种解法跑 LeetCode 的示例和边界情况，在 500 组随机硬币上互相对照，并用金额 10⁴ 检查表格版：共 17 项检查。
- 与仓库其余部分一样，采用 MIT 许可证。
