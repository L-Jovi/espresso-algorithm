# 1143. 最长公共子序列

[English](README.md) | 简体中文

> 对应英文版：2026-10-02。英文版更新后本页可能滞后。

两个字符串按相同顺序共有的最长字符序列：暴力解、记忆化和表格法。[力扣上的题目。](https://leetcode.cn/problems/longest-common-subsequence/)

## 试一试

```sh
node leetcode/1143-longest-common-subsequence/brute-force.js    # 3："ace" 同时在 "abcde" 和 "ace" 里
node leetcode/1143-longest-common-subsequence/tabulation.js     # 3
node --test leetcode/1143-longest-common-subsequence/solution.test.js
```

## 解法，从慢到快

| 文件 | 时间 | 空间 | 变化在哪里 | 2 × 12 个字母 | 2 × 1,000 个字母 |
| --- | --- | --- | --- | --- | --- |
| [`brute-force.js`](brute-force.js) | O(2^(m + n)) | O(m + n) | 两个没有公共字母的 10 字母字符串要调用 369,511 次。 | 52 ms | – |
| [`memoization.js`](memoization.js) | O(m · n) | O(m · n) | 记下每一对前缀的答案：同样的字符串只调用 201 次。 | 0.05 ms | 31 ms |
| [`tabulation.js`](tabulation.js) | O(m · n) | O(m · n) | 逐行填写同样的答案，不用递归。 | 0.03 ms | 12 ms |

12 个字母的两个字符串没有公共字母，这是暴力解最坏的情况；1,000 个字母的是随机生成的。破折号表示暴力解没有参加。时间：2026-09-30 用 `npm run bench:leetcode` 测得，Node 24.20.0，macOS 15.7，Apple 芯片（arm64）的 Mac，取三次运行中最快的一次。请比较各行之间的差别；具体数字取决于机器。

## 原理

看两个字符串的最后一个字符。如果相同，它们就是某个公共子序列的结尾，答案等于去掉它们之后两个字符串的答案再加 1。如果不同，两者中至少有一个不会出现在答案里：分别去掉其中一个，取较好的结果。答案只取决于两个前缀的长度，所以不同的问题只有 m · n 个。记忆化让每个问题只回答一次；表格法按顺序填写它们，多出的一行一列零代表空前缀。

[718](../0718-maximum-length-of-repeated-subarray/) 要求的是没有间隔的公共段；子序列则可以跳过字符，所以不匹配时保留目前最好的结果，而不是从 0 重新开始。

## 过去与现在

- **这个目录的来历。** [旧的暴力解](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/1143-longest-common-subsequence/brute-force.js)没有递归出口：下标一旦小于 0，`undefined === undefined` 就让它一直递归下去，连 ("abcde", "ace") 都会让调用栈溢出。[旧的表格版](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/1143-longest-common-subsequence/dp.js)用专门的代码填第一行和第一列，现在由一圈零代替。`memoization.js` 是新写的，补全了这个序列。

## 刻意省略

- 答案只是长度。从表格的最后一格往回走，就能还原出子序列本身。
- 记忆化递归最深 m + n 层，在 LeetCode 的限制下是 2,000 层。Node 测试仍在 1,000 字母的输入上对照两种高效解法。Safari 26.6.1 的 Worker 在比赛的 1,000 字母输入上发生了调用栈溢出（[CI 记录](https://github.com/L-Jovi/espresso-algorithm/actions/runs/36994200335/job/110797053849)，2026-10-02）。共用的比赛配置现用 200 字母的字符串对比记忆化和表格法，1,000 字母的一项不再运行记忆化。上表保留的是此前 Node 的测量结果。

## 验证与来源

- [`solution.test.js`](solution.test.js) 让三种解法跑示例，在 500 对随机字符串上与一个穷举所有子序列的参照对照，并在两个 1,000 字母的字符串上对照记忆化和表格法：共 17 项检查。
- 与仓库其余部分一样，采用 MIT 许可证。
