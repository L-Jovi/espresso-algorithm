# 509. 斐波那契数

[English](README.md) | 简体中文

> 对应英文版：2026-09-30。英文版更新后本页可能滞后。

计算斐波那契数的五种方法，从指数时间一路降到对数时间，并且互相对照检查。[力扣上的题目。](https://leetcode.cn/problems/fibonacci-number/)

## 试一试

```sh
node leetcode/0509-fibonacci-number/recursion.js        # 832040，调用了 2,692,537 次
node leetcode/0509-fibonacci-number/fast-doubling.js    # 832040 8944394323791464
node --test leetcode/0509-fibonacci-number/solution.test.js
```

第二个数是 F(78)，JavaScript 的数能精确表示的最大斐波那契数。

## 解法，从慢到快

| 文件 | 时间 | 空间 | 变化在哪里 | n = 32 |
| --- | --- | --- | --- | --- |
| [`recursion.js`](recursion.js) | O(φⁿ) | O(n) | 把定义直接写成代码。它一遍又一遍地重算同样的值：fib(35) 要调用 29,860,703 次。 | 37 ms |
| [`memoization.js`](memoization.js) | O(n) | O(n) | 每个 F(k) 第一次算出后就记下来：fib(35) 只调用 69 次。 | < 0.01 ms |
| [`tabulation.js`](tabulation.js) | O(n) | O(n) | 从 F(0) 往上填同样的值，不用递归。 | < 0.01 ms |
| [`space-optimized.js`](space-optimized.js) | O(n) | O(1) | 只保留最后两个值，下一步只会读到它们。 | < 0.01 ms |
| [`fast-doubling.js`](fast-doubling.js) | O(log n) | O(1) | 用两个恒等式从 F(k) 直接跳到 F(2k)。 | < 0.01 ms |

φ ≈ 1.618 是黄金比例。时间：2026-09-30 用 `npm run bench:leetcode` 测得，Node 24.20.0，macOS 15.7，Apple 芯片（arm64）的 Mac，取三次运行中最快的一次。请比较各行之间的差别；具体数字取决于机器。

## 原理

朴素递归慢，是因为它记不住。fib(5) 要问 fib(4) 和 fib(3)，而 fib(4) 又要再问一次 fib(3)，于是调用形成一棵树，同样的问题在树里反复出现；n 每加 1，这棵树大约变大 φ 倍。

记忆化给递归加上记忆。表格法把方向反过来，从下往上填答案。填写的顺序一旦固定，就又能省下两处：每一步只读前两个值，所以两个变量就够了；而两个恒等式 F(2k) = F(k) · (2F(k + 1) − F(k)) 与 F(2k + 1) = F(k)² + F(k + 1)² 可以跳过绝大多数的值。

先递归，再记忆化，再列表格，最后减少变量：这是动态规划的通用做法，[322](../0322-coin-change/)、[256](../0256-paint-house/)、[1143](../1143-longest-common-subsequence/)、[121](../0121-best-time-to-buy-and-sell-stock/) 和 [53](../0053-maximum-subarray/) 的递进也遵循它。

## 过去与现在

- **`BigInt`**（ES2020）能表示任意大小的整数。用它来执行 `fast-doubling.js` 的步骤，可以精确算出 209 位的 F(1000)（[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)）。
- **Python 3.9 加入了 [`functools.cache`](https://docs.python.org/3/library/functools.html#functools.cache)**：在递归的 `fib` 上面加一行 `@cache`，它就变成了 `memoization.js`。
- **这个目录的来历。** 最初的四个文件都从一个已经不存在的 `libs/` 目录加载计时工具，所以一个也跑不起来；[表格版](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/509-fibonacci-number/dp.js)还在没有声明循环变量的情况下直接使用它。`problems/fibonacci-sequence/` 和 `data-structure/fib.js` 里还有两份相同的副本，已经退役，见[迁移清单](../../docs/migration.zh-Hans.md)。

## 刻意省略

- JavaScript 的数能精确表示到 F(78)；F(79) 已经大于 2⁵³。LeetCode 只要求到 n = 30。
- 在这个规模下，四种快的解法都不到 0.01 ms，计时分不出高下。O(n) 和 O(log n) 要在大得多的 n 上才能拉开差距，而那需要 `BigInt`。

## 验证与来源

- [`solution.test.js`](solution.test.js) 让五种解法跑七个 n 值（最大到 LeetCode 的上限 30），并让四种快的解法对每个不超过 78 的 n 与 `BigInt` 循环精确对照：共 36 项检查。
- 学习来源：[labuladong 的动态规划解题框架](https://labuladong.online/zh/algo/essential-technique/dynamic-programming-framework/)，它正是从这道题讲起的。
- 与仓库其余部分一样，采用 MIT 许可证。
