# 121. 买卖股票的最佳时机

[English](README.md) | 简体中文

> 对应英文版：2026-09-30。英文版更新后本页可能滞后。

选出最适合买入的一天和之后最适合卖出的一天：先试遍所有日期组合，再用每天两种状态的表格，最后只用两个变量。[力扣上的题目。](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)

## 试一试

```sh
node leetcode/0121-best-time-to-buy-and-sell-stock/brute-force.js        # 5：在 1 买入，在 6 卖出
node leetcode/0121-best-time-to-buy-and-sell-stock/space-optimized.js    # 5
node --test leetcode/0121-best-time-to-buy-and-sell-stock/solution.test.js
```

## 解法，从慢到快

| 文件 | 时间 | 空间 | 变化在哪里 | 20,000 天 | 1,000,000 天 |
| --- | --- | --- | --- | --- | --- |
| [`brute-force.js`](brute-force.js) | O(n²) | O(1) | 试遍每一对“买入日、之后的卖出日”。 | 259 ms | – |
| [`tabulation.js`](tabulation.js) | O(n) | O(n) | 为每一天记下持有和不持有股票时的最好结果。 | 0.30 ms | 13 ms |
| [`space-optimized.js`](space-optimized.js) | O(n) | O(1) | 每天只读前一天的结果，所以两个变量就能代替表格。 | 0.29 ms | 1.36 ms |

破折号表示暴力解没有参加：它要跑好几分钟。时间：2026-09-30 用 `npm run bench:leetcode` 测得，Node 24.20.0，macOS 15.7，Apple 芯片（arm64）的 Mac，取三次运行中最快的一次。请比较各行之间的差别；具体数字取决于机器。

## 原理

每天结束时，你要么持有股票，要么不持有。**free** 是不持有股票时迄今最好的利润：要么昨天也没有，要么今天卖出。**held** 是持有股票时最好的余额，是负数，因为你付了钱：要么昨天就持有，要么今天买入。只允许一笔交易，所以买入总是从余额 0 开始。

第一天需要小心。在表格里，第 0 天必须允许买入，所以 held 从 −prices[0] 开始。两个变量的版本则从第 0 天之前的状态开始，held = −∞，因为它的循环会像处理其他日子一样处理第 0 天。同样的两种状态，交易次数更多或有冷冻期时再多加几种，就能解决其余的股票问题（122、123、188、309 和 714）。

## 过去与现在

- **这个目录的来历。** [旧的表格版](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/121-best-time-to-buy-and-sell-stock/dp.js)让第 0 天从 held = −∞ 开始，所以永远不会在第 0 天买入：[1, 5] 返回 0，而正确答案是 4。LeetCode 的示例 [7, 1, 5, 3, 6, 4] 是在第 1 天买入的，这个 bug 就这样一直没被发现。这个文件每次调用还会把表格打印两遍。

## 刻意省略

- 只做一笔交易。其余的股票问题没有收录。

## 验证与来源

- [`solution.test.js`](solution.test.js) 让三种解法跑示例（包括在第 0 天买入的情况），并在 1,000 组随机价格上与暴力解对照：共 16 项检查。
- 学习来源：[labuladong，一个方法团灭 LeetCode 股票买卖问题](https://labuladong.online/zh/algo/dynamic-programming/stock-problem-summary/)。
- 与仓库其余部分一样，采用 MIT 许可证。
