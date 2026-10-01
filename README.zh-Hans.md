# Espresso Algorithm

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

同一道题，试试不同的算法：从暴力解一路走到最优解。纯粹浓缩，像一杯 espresso。

[![CI](https://github.com/L-Jovi/espresso-algorithm/actions/workflows/ci.yml/badge.svg)](https://github.com/L-Jovi/espresso-algorithm/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

这里的每个算法都是一个小文件，一次就能读完；它旁边放着解同一道题的其他方法，还有一个让它们互相对照的测试。运行一个，让它和邻居比一比，再读一读更快的那个为什么更快。

**[打开在线站点 →](https://espresso.jovipro.com/)**

## 里面有什么

| 亮点 | 简介 |
| --- | --- |
| **看排序如何进行** | 十二种排序回放真实代码的每一次读和写，这些读写由 `Proxy` 记录下来。可以让两种排序在同一组数上比赛。 |
| **让解法比赛** | 十五道 LeetCode 题在你的浏览器里让各种解法比赛，比赛前先检查每种解法都给出 LeetCode 的答案。 |
| **六十道 LeetCode 题** | 每种解法一个文件。每个目录的测试让所有解法跑同一组用例，再在随机输入上与一个很慢但一眼就能看出正确的参照对照。 |
| **从暴力解到最优解** | `fib(35)` 用朴素递归要调用 29,860,703 次，用记忆化只要 69 次；零钱兑换、粉刷房子和最长公共子序列走的是同样的几步。 |
| **读懂中文** | 正向最大匹配，以及 jieba 的词典建图加动态规划，都亲手写出来，并与你的浏览器的 `Intl.Segmenter` 对照。 |
| **什么都不用装** | 没有依赖：Node 22.18 或更新的版本就能运行 JavaScript，Python 3.11 和 JDK 21 运行其余部分。 |

此外还有从栈到前缀树的数据结构、二分查找和 KMP，以及 0-1 背包、荷兰国旗这样的经典问题。

## 试一试

**在浏览器里：** 打开[在线站点](https://espresso.jovipro.com/)：[看排序如何进行](https://espresso.jovipro.com/visualizer/)、[让解法比赛](https://espresso.jovipro.com/leetcode/race/)，或者[找出一个中文句子里的词](https://espresso.jovipro.com/nlp/word-segmentation/)。

**在你的电脑上：**

```sh
git clone https://github.com/L-Jovi/espresso-algorithm.git
cd espresso-algorithm
node leetcode/0509-fibonacci-number/recursion.js   # 832040，调用了 2,692,537 次
npm test                                           # 所有 JavaScript 测试
npm run serve                                      # 站点，位于 http://127.0.0.1:8080/
```

什么都不用安装。`npm run bench` 让各种排序比赛，`npm run bench:leetcode` 让 LeetCode 的各种解法比赛；`npm run check` 还会运行 Python 和 Java 的检查。

## 怎样读这个仓库

每个分区是一个目录，都有中英文 README；目录里的每个文件都以所用的技巧命名：`brute-force.js`、`memoization.js`、`two-pointers.js`。每个文件开头的注释说明它解决什么、思路是什么、为什么正确、代价多大；结尾是一个示例，用 `node` 运行这个文件就会打印出来。

每份 README 都按同样的顺序：

1. **试一试**：运行什么，应该看到什么。
2. **里面有什么**：算法或解法的一览表。
3. **原理**：用大白话讲思路，以及从哪个文件读起。
4. **过去与现在**：以前是怎么做的，今天的语言提供了什么。
5. **刻意省略**：这个小版本有意没做的部分。
6. **验证与来源**：哪些测试覆盖了它，思路从哪里来。

刚接触算法？从排序开始。准备面试？从 LeetCode 和它的十个递进开始。

## 学习路径

| 分区 | 里面有什么 | 从哪里开始 |
| --- | --- | --- |
| [排序](sorting/) | 从冒泡到基数的十四种排序，部分有 Python 版，还有一个让它们比赛的计时脚本 | 冒泡排序，然后是归并排序 |
| [查找](searching/) | JavaScript 和 Java 的二分查找与 lower bound，以及 KMP 字符串查找 | 二分查找 |
| [数据结构](data-structures/) | 栈、队列、二叉堆、链表、集合、哈希表、树、前缀树和图 | 用环形缓冲区实现的队列 |
| [经典问题](problems/) | 大数相加、三种去重方法、从暴力解到表格法的 0-1 背包，等等 | 背包问题 |
| [LeetCode](leetcode/) | 六十道题；其中十道有 README，从暴力解一路讲到最优解 | [509](leetcode/0509-fibonacci-number/)，然后是 [322](leetcode/0322-coin-change/) |
| [中文分词](nlp/) | 两种分词算法，与 `Intl.Segmenter` 对照 | 那两个有歧义的句子 |
| [排序可视化](visualizer/) | 站点如何回放真实的排序 | [`trace.js`](visualizer/trace.js) |

## 过去与现在

大部分代码最早写于 2018 到 2022 年之间。从那以后，所有 JavaScript 引擎的排序都变得稳定，`Map`、`BigInt` 和 `Proxy` 取代了旧的变通写法，`Intl.Segmenter` 也不再需要原生模块就能找出中文里的词。[过去与现在](docs/then-and-now.zh-Hans.md)讲述了这些变化，每个日期都附有来源。

## 为什么叫“espresso”？

浓缩咖啡是大多数咖啡的起点：拿铁和卡布奇诺都是加了奶的浓缩咖啡。在作者以咖啡命名的几个仓库里，算法扮演的正是这个角色：其余一切赖以建立的、小而浓缩的核心。

这个系列的其他仓库：[latte-web](https://github.com/L-Jovi/latte-web)（Web，最日常的调配）、[roaster-linux](https://github.com/L-Jovi/roaster-linux)（Linux 工具，烘焙咖啡豆的地方）、[barista-services](https://github.com/L-Jovi/barista-services)（服务，咖啡师）和 cappuccino-ios（iOS 应用，比拿铁更轻；2026 年已退役）。

## 项目状态

由 [@L-Jovi](https://github.com/L-Jovi) 维护的个人学习合集。它不是产品：没有发布版本，也没有软件包。CI 检查每一次改动：Node 22.18、22、24 和 26 上的 JavaScript 测试，Python 3.11 和 3.14，Java 21 和 25，仓库检查，以及 Chrome、Firefox 和 Safari 中的站点；一切通过后，站点才从 `main` 部署。[检查覆盖了什么、没有覆盖什么](docs/verification.md)。

这个仓库在 2026 年 9 月重新整理过。[迁移清单](docs/migration.zh-Hans.md)列出了每个旧路径的新位置。

## 参与贡献

欢迎提 issue 和 pull request。请先阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 和[写作规范](docs/writing.zh-Hans.md)；安全问题请按 [SECURITY.md](SECURITY.md) 的说明私下报告。每位参与者都遵守[行为准则](CODE_OF_CONDUCT.md)。

## 许可证

原创代码和文档采用 [MIT](LICENSE) 许可证。[NOTICE.md](NOTICE.md) 致谢了这个仓库学习借鉴过的作品。
