# 文件去哪了？

[English](migration.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

2026 年 9 月，这个仓库从一堆脚本重新整理成一组有测试、有文档的分区。本页列出每个旧路径的新位置。指向旧文件的链接都对应 [`c063830`](https://github.com/L-Jovi/espresso-algorithm/tree/c0638300307449152cd9262b9156aa1177103bb8)，也就是整理开始前的最后一个提交。

每转换完一个目录，就在这里补上对应的行。还没转换的目录列在最后。

## 仓库工具

| 以前 | 现在 | 原因 |
| --- | --- | --- |
| [`.travis.yml`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/.travis.yml) | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) | Travis CI 已不再为开源项目提供免费构建，而且这个文件用的还是 Node 12。 |
| [`.tern-project`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/.tern-project)、[`jsconfig.json`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/jsconfig.json) | 已删除 | 编辑器配置，指向的是代码从没用过的库，以及一个并不存在的 `src/` 目录。 |
| [`yarn.lock`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/yarn.lock) 和 `package.json` 里的依赖 | 已删除 | 仓库不再有任何依赖。这个 lockfile 指向的镜像源也已经关闭。 |
| [`libs/swap.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/libs/swap.js) | [`shared/swap.js`](../shared/swap.js) | 还是同一个工具函数，现在会拒绝越界的下标。 |
| [`libs/timer.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/libs/timer.js) | [`shared/measure.js`](../shared/measure.js) | 改用高精度时钟，并返回结果，而不是直接打印。 |
| [`libs/random-list.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/libs/random-list.js) | [`shared/random.js`](../shared/random.js) | 原来依赖一直没装上的 `mockjs`。新的生成器带种子，出错的输入可以原样重现。 |
| [`nlp/parse-text-demo/`](https://github.com/L-Jovi/espresso-algorithm/tree/c0638300307449152cd9262b9156aa1177103bb8/nlp/parse-text-demo) | 已退役；之后会补一个分词算法示例 | 它只是打印两个库的输出，没有实现算法；它的 lockfile 还带来了全部安全告警。 |

## 从全部历史中移除

以下内容已于 2026-09-28 从每一个提交中移除，因此没有可以链接的地方。

| 以前 | 原因 |
| --- | --- |
| `problems/eggs-hunt/` | 一道面试题，版权属于出题的公司。 |
| `libs/algs4.jar` | 教材《Algorithms, 4th Edition》的 GPL-3.0 配套库。仓库里没有任何代码运行它，它却占了仓库全部文件字节数的 83%。需要的话可以从 [algs4.cs.princeton.edu](https://algs4.cs.princeton.edu/code/) 下载。 |
| `data-structure/binary-search/BinarySearch.java` | 同一本教材 GPL-3.0 源码的原样拷贝。会由本仓库自己写的二分查找取代。 |

## 尚未转换

`algorithm-canvas/`、`basic-sort/`、`data-structure/`、`leetcode/` 和 `problems/` 仍是旧的结构。每转换完一个，就会在这里补上对应的行。
