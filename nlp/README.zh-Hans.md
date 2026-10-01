# 中文分词

[English](README.md) | 简体中文

> 对应英文版：2026-09-30。英文版更新后本页可能滞后。

中文书写时词与词之间没有空格，所以程序要先找出每个词从哪里开始、到哪里结束，才能去统计、检索或翻译。这里有两个用词表手写的分词器，并与 JavaScript 内置的分词器对照。

## 试一试

```sh
node nlp/word-segmentation/compare.js                     # 每个例句都用三种方法分词
node nlp/word-segmentation/dag-dp.js                      # 正确读出两个有歧义的句子
node --test nlp/word-segmentation/segmentation.test.js
```

[在线页面](https://l-jovi.github.io/espresso-algorithm/nlp/word-segmentation/)可以对你输入的任何句子做同样的对照，并画出候选词构成的图。对照输出的一部分：

```text
十五 个葡萄在这周六过期
  forward max match ≠ 十五 · 个 · 葡萄 · 在 · 这周 · 六 · 过期
  graph + DP          十五 · 个 · 葡萄 · 在 · 这 · 周六 · 过期
  Intl.Segmenter      十五 · 个 · 葡萄 · 在 · 这 · 周六 · 过期

结婚的和尚未结婚的
  forward max match ≠ 结婚 · 的 · 和尚 · 未 · 结婚 · 的
  graph + DP          结婚 · 的 · 和 · 尚未 · 结婚 · 的
  Intl.Segmenter      结婚 · 的 · 和 · 尚未 · 结婚 · 的
```

## 里面有什么

| 分词器 | 一句话思路 | 时间 | 文件 |
| --- | --- | --- | --- |
| 正向最大匹配 | 在每个位置取已知的最长词 | O(n · L) | [`forward-max-match.js`](word-segmentation/forward-max-match.js) |
| 词典建图 + 动态规划 | 在所有候选词构成的图中取概率最大的路径 | O(n · L) | [`dag-dp.js`](word-segmentation/dag-dp.js) |
| `Intl.Segmenter` | 交给 JavaScript 引擎内置的 Unicode 库 ICU | O(n) | [`intl-segmenter.js`](word-segmentation/intl-segmenter.js) |

n 是文本长度，L 是词表中最长词的长度。[`dictionary.js`](word-segmentation/dictionary.js) 存放词表和虚构的词频，[`sentences.js`](word-segmentation/sentences.js) 存放例句，[`compare.js`](word-segmentation/compare.js) 把三种结果并排打印。

## 原理

**正向最大匹配**从左往右读，每次都取它认识的最长的词。它又快又简单，但是贪心。在“这周六”（this Saturday）里，它先取走“这周”（this week），剩下一个“六”（six）；在“结婚的和尚未结婚的”里，它取走“和尚”，而不是“和 · 尚未”。

**词典建图加动态规划**同时考虑所有切分方式。每个候选词都是图上的一条边，从它的第一个字连到它最后一个字的下一个位置，于是每种切分都是图中的一条路径。一个词的概率是它的词频除以总数，一条路径的概率是其中各个词概率的乘积。动态规划从文本末尾往前算，记下从每个位置到末尾的最好得分，因此不必把每条路径都列出来，就能找到概率最大的那条。取对数可以把乘积变成求和。由于“和”和“尚未”都比“和尚”和“未”常见得多，正确的读法胜出。

**数字。** 数字和拉丁字母会在分词之前先切出来，所以 2023 保持完整。“二零二三”这样连续的中文数字会作为一个额外的候选词加入，因为没有哪个词表能收下所有的数；它只是候选，所以像“一直”这样的词在合适的地方依然会胜出。

## 过去与现在

- **这个目录的第一个版本** [`nlp/parse-text-demo`](https://github.com/L-Jovi/espresso-algorithm/tree/c0638300307449152cd9262b9156aa1177103bb8/nlp/parse-text-demo) 调用了两个库：`nodejieba`，一个封装 [jieba](https://github.com/fxsjy/jieba) 的 Node 原生模块；以及微软的 Recognizers-Text，用来识别数字和日期。它没有实现任何算法，依赖从未安装过，它的 lockfile 还触发了仓库的安全警报。这个目录改为把算法亲手写出来。
- **`Intl.Segmenter`** 自 Firefox 125 起在所有主流浏览器中可用：Chrome 和 Edge 87、Safari 14.1、Firefox 125；它于 2024-04-16 成为 Baseline（[web.dev](https://web.dev/blog/intl-segmenter)）。它不需要我们提供词表，但它的结果随 ICU 版本而定，也无法调整。在 ICU 78.3（Node 24.20）下，它把“圣女果”切成“圣女 · 果”，正是第一个版本不得不手动加进 jieba 的那个词；它还把“猕猴桃”切成三个单字，把“二零二三年”切成“二 · 零 · 二 · 三年”（2026-09-30 实测）。

## 刻意省略

- 词表只覆盖了例句，词频也是虚构的。真正的分词器会从大量文本中学到这些词频。
- 省略了 jieba 的第三步：用隐马尔可夫模型猜出词典里没有的词。
- 第一个版本还能识别数字和日期，比如“3 个明天过期的鸡蛋”。那是另一项任务，这里没有收录。
- `Intl.Segmenter` 在不同 ICU 版本下的结果不同，所以它的测试只检查切出的片段能拼回原句。

## 验证与来源

- [`segmentation.test.js`](word-segmentation/segmentation.test.js) 检查两个手写分词器在每个例句上的切分结果，以及正向最大匹配在哪里出错。它还检查“圣女果”和“一直”保持完整。在随机文本上检查三件事：切出的片段能拼回原文；在 500 段随机文本上，建图法的得分与穷举所有切分得到的最好得分相同；正向最大匹配的得分从不更高。
- 建图和选路的方法来自 [jieba](https://github.com/fxsjy/jieba)（MIT），它的 README 描述了同样的三个步骤。这里的代码是依照那份描述写的，不是复制的。
- 与仓库其余部分一样，采用 MIT 许可证。
