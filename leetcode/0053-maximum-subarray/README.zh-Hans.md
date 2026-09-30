# 53. 最大子数组和

[English](README.md) | 简体中文

> 对应英文版：2026-09-30。英文版更新后本页可能滞后。

相邻的数能加出的最大和：从试遍每个子数组，一路到只用一个变量扫一遍。[力扣上的题目。](https://leetcode.cn/problems/maximum-subarray/)

## 试一试

```sh
node leetcode/0053-maximum-subarray/brute-force.js        # 6：4 − 1 + 2 + 1
node leetcode/0053-maximum-subarray/space-optimized.js    # 6
node --test leetcode/0053-maximum-subarray/solution.test.js
```

## 解法，从慢到快

| 文件 | 时间 | 空间 | 变化在哪里 | 10,000 个数 | 1,000,000 个数 |
| --- | --- | --- | --- | --- | --- |
| [`brute-force.js`](brute-force.js) | O(n²) | O(1) | 试遍每个子数组，每个起点维护一个累加和。 | 52 ms | – |
| [`tabulation.js`](tabulation.js) | O(n) | O(n) | dp[i] 是以 i 结尾的最大和，它要么接上 dp[i − 1]，要么从 nums[i] 重新开始。 | 0.04 ms | 4.92 ms |
| [`space-optimized.js`](space-optimized.js) | O(n) | O(1) | 只会读到 dp[i − 1]，所以一个变量就能代替表格。 | 0.02 ms | 1.66 ms |

破折号表示暴力解没有参加：它要跑好几分钟。时间：2026-09-30 用 `npm run bench:leetcode` 测得，Node 24.20.0，macOS 15.7，Apple 芯片（arm64）的 Mac，取三次运行中最快的一次。请比较各行之间的差别；具体数字取决于机器。

## 原理

最好的子数组总在某处结束。设 dp[i] 为恰好在 i 结束的子数组的最大和。它要么就是 nums[i] 本身，要么接在以 i − 1 结尾的最好子数组后面；dp[i − 1] 为负时只会拖后腿，所以丢掉。答案是 dp[i] 中最大的那个。一边扫描一边只保留最后一个 dp 值，这就是所谓的 Kadane 算法。

## 过去与现在

- **这个目录的来历。** [旧的暴力解](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/53-maximum-subarray/dp.js)当时叫 dp.js，它把所有 n² 个和存进一张表：到 50,000 个数时内存耗尽，而 LeetCode 允许 100,000 个。它还从 0 开始比较，所以全是负数的数组会返回 0。[旧的 dp-compress.js](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/53-maximum-subarray/dp-compress.js)（现在的 `tabulation.js`）结果正确，但仍然用着 O(n) 的表；`space-optimized.js` 是新写的。两个文件里原本都复制了题面，现在已经删掉。

## 刻意省略

- LeetCode 在进阶里建议试试 O(n log n) 的分治解法，这里没有收录。
- 答案只是和，不包括子数组的起止位置。

## 验证与来源

- [`solution.test.js`](solution.test.js) 让三种解法跑示例（包括全是负数的数组），在 1,000 组随机数组上与一个把每个子数组都加一遍的参照对照，并在 100,000 个数上对照两种线性解法：共 20 项检查。
- 表格法的学习来源：[leetcode.cn 上的一篇题解](https://leetcode.cn/problems/maximum-subarray/solutions/42428/zui-da-zi-xu-he-cshi-xian-si-chong-jie-fa-bao-li-f/)。
- 与仓库其余部分一样，采用 MIT 许可证。
