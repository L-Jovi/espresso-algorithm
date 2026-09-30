# 5. 最长回文子串

[English](README.md) | 简体中文

> 对应英文版：2026-09-30。英文版更新后本页可能滞后。

字符串里正读反读都一样的最长片段：先为每个子串列一张表，再从每个中心向外扩展。[力扣上的题目。](https://leetcode.cn/problems/longest-palindromic-substring/)

## 试一试

```sh
node leetcode/0005-longest-palindromic-substring/tabulation.js              # aba
node leetcode/0005-longest-palindromic-substring/expand-around-center.js    # bab
node --test leetcode/0005-longest-palindromic-substring/solution.test.js
```

两个答案都对：“babad”有两个最长回文，返回哪一个都可以。

## 解法，从慢到快

| 文件 | 时间 | 空间 | 变化在哪里 | 2,000 个字母 |
| --- | --- | --- | --- | --- |
| [`tabulation.js`](tabulation.js) | O(n²) | O(n²) | 为每个子串记下它是不是回文。 | 32 ms |
| [`expand-around-center.js`](expand-around-center.js) | O(n²) | O(1) | 从 2n − 1 个中心分别向外扩展，遇到第一个不匹配就停。 | 0.10 ms |

输入是由“a”和“b”组成的随机文本。时间：2026-09-30 用 `npm run bench:leetcode` 测得，Node 24.20.0，macOS 15.7，Apple 芯片（arm64）的 Mac，取三次运行中最快的一次。请比较各行之间的差别；具体数字取决于机器。

## 原理

一个子串是回文，当且仅当它两端的字符相同，并且中间的部分也是回文。表格法正是按这条规则，把全部 n²/2 个子串都填一遍，不管文本长什么样。中心扩展把同一个事实反过来用：从中间出发（奇数长度从一个字符，偶数长度从两个字符之间的空隙），只要两端还相同就继续扩展。对大多数文本，扩展一两步就会停下，所以它在这里快了约 300 倍，尽管两者的最坏情况都是 O(n²)，比如 "aaaa…a" 这样的文本。

## 过去与现在

- **这个目录的来历。** [旧的中心扩展版](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/5-longest-palindromic-substring/expand-around-center.js)写的是 `let start = end = 0`，它只声明了 `start`，而让 `end` 成了全局变量；模块在严格模式下运行，这一行会直接抛出错误。表格版原来叫 `dynamic-planning.js`。

## 刻意省略

- Manacher 算法能在 O(n) 时间内求出答案，这里没有收录。
- 和 JavaScript 字符串的其他操作一样，这里按 UTF-16 编码单元比较，而不是按读者看到的字符。

## 验证与来源

- [`solution.test.js`](solution.test.js) 让两种解法跑示例，并在 1,000 个随机字符串上检查：每种解法返回的都是回文，而且和穷举所有子串找到的最长回文一样长：共 11 项检查。
- 与仓库其余部分一样，采用 MIT 许可证。
