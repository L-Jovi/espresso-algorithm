# 过去与现在

[English](then-and-now.md) | 简体中文

> 对应英文版：2026-09-30。英文版更新后本页可能滞后。

这里的代码最早写于 2018 到 2022 年之间。本页记录从那以后，语言、工具，以及这些题解所来自的网站发生了哪些变化，也说明旧版本为什么仍然值得一读。每个分区的 README 都有一小节自己的“过去与现在”；这里把完整的来龙去脉放在一起。

## 排序变得稳定，也可以不改动输入

- **过去。** JavaScript 引擎可以把相等的项排成任意顺序。先按一个字段排序、再按另一个字段排序，可能会打乱第一次的顺序。
- **变化。** V8 7.0（2018 年）把排序换成了稳定的 TimSort（[V8 博客](https://v8.dev/blog/array-sort)），ECMAScript 2019 则要求所有引擎的排序都必须稳定（[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sort_stability)）。Python 使用 Timsort 的时间要长得多；Python 3.11 把合并各段的方式改成了 Munro 和 Wild 的 Powersort 策略（[changelog，bpo-34561](https://docs.python.org/3/whatsnew/changelog.html)）。
- **现在。** `toSorted()`（ES2023）返回排好序的副本（[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)），所以解法不必再打乱调用方的数组。旧的 LeetCode 题解里有五个这样做过，现在都改为对副本排序。
- **为什么仍值得手写。** [`sorting/`](../sorting/) 展示了稳定性为什么重要、合并做了什么，以及快速排序为什么需要好的枢轴。测试会把每种排序与内置排序对照。

## 查找表变成了 Map

- **过去。** 普通对象是 JavaScript 里常用的哈希表。
- **变化。** `Map`（ES2015）只包含放进去的键。普通对象还会对它从 `Object.prototype` 继承来的一切作出回应，所以 LeetCode 30、811、1297 的旧版本会把 `"constructor"` 这样的单词数错（[MDN：对象与 Map 的比较](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps)）。
- **现在。** 这个仓库里所有的表都是 `Map`。ES2025 为 `Set` 加上了 `union`、`intersection` 等集合运算，自 2024 年起属于 Baseline（[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/union)）；[`data-structures/`](../data-structures/) 把手写的集合与它们对照。

## 数超出了 2⁵³

- **过去。** JavaScript 的数只在 2⁵³ 以内是精确的整数，所以相加大数只能按字符串逐位相加。
- **变化。** `BigInt`（ES2020）能表示任意大小的整数（[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)）。
- **现在。** [`problems/adding-large-numbers`](../problems/adding-large-numbers/) 的测试用 `BigInt` 检查逐位相加的结果；[LeetCode 509](../leetcode/0509-fibonacci-number/) 的快速倍增法改用 `BigInt` 写时，可以精确算出 209 位的 F(1000)。

## 不改代码也能观察代码

- **过去。** 这里的第一个排序可视化自带了一份排序代码的副本，专门写成会汇报每一步。
- **变化。** `Proxy`（ES2015）可以挡在数组前面，看到每一次按下标的读和写（[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)）。
- **现在。** [可视化](../visualizer/)运行的正是测试检查的那些函数，回放 `Proxy` 记录下来的内容。

## 中文分词不再需要原生模块

- **过去。** 第一个分词示例调用 `nodejieba`，一个封装 jieba 分词器的 Node 原生模块，还得手动把“圣女果”加进它的词典。
- **变化。** `Intl.Segmenter` 用 JavaScript 引擎内置的 ICU 库寻找词的边界；Firefox 125 支持之后，它于 2024-04-16 成为 Baseline（[web.dev](https://web.dev/blog/intl-segmenter)）。
- **现在。** [`nlp/`](../nlp/) 亲手写出两种分词算法，并与 `Intl.Segmenter` 对照。在 ICU 78.3 下，它仍然把“圣女果”切成“圣女 · 果”：内置的词典没法教它新词。

## 代码周围的工具

- **测试。** 第一个版本没有测试，随机输入来自从未安装过的 `mockjs`。Node 内置的测试运行器在 Node 20 中成为稳定功能（[公告](https://nodejs.org/en/blog/announcements/v20-release-announce)）；这里的所有测试都用 `node:test`，并使用带种子的随机输入，所以出错的输入可以重放。
- **模块里的示例。** `import.meta.main`（Node 24.2.0 和 22.18.0，[文档](https://nodejs.org/api/esm.html)）告诉模块它是否被直接运行，所以每个文件都能在运行时打印示例，在被测试 import 时保持安静。
- **持续集成。** 仓库最初使用 Travis CI。2020 年 11 月，Travis 把没有付费方案的公开仓库转入额度有限的免费试用（[Travis CI 博客](https://blog.travis-ci.com/2020-11-02-travis-ci-new-billing)）。CI 现在运行在 GitHub Actions 上，还会在 Chrome、Firefox 和 Safari 中测试站点。
- **依赖。** 旧的 lockfile 指向 `registry.npm.taobao.org`，它现在返回的 TLS 证书已经过期（2026-09-30 检查）。这个仓库现在已经完全没有依赖。
- **Java。** 自 Java 11 起，`java File.java` 可以不经编译直接运行单个源文件（[JEP 330](https://openjdk.org/jeps/330)）；这里的 Java 文件就是这样运行，并自己检查答案。

## 题解来自的网站

- 截至 2026-09-30，`leetcode-cn.com` 会跳转到 `leetcode.cn`，旧的 `/solution/<名称>/` 地址会跳转到 `/solutions/<id>/<名称>/`。LeetCode 28 原名“Implement strStr()”，现在叫“Find the Index of the First Occurrence in a String”。
- labuladong 的算法笔记从 `labuladong.github.io` 搬到了 [labuladong.online](https://labuladong.online/zh/algo/)，旧页面现在返回 404。文件头链接的都是新地址，每一个都在 2026-09-30 检查过。
