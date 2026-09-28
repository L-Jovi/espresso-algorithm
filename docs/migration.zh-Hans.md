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

## 排序

现在位于 [`sorting/`](../sorting)，有测试和 README。

| 以前 | 现在 | 原因 |
| --- | --- | --- |
| [`basic-sort/bubble-sort/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/bubble-sort/index.js) | [`sorting/bubble-sort/bubble-sort.js`](../sorting/bubble-sort/bubble-sort.js) | 已导出并有测试；某一趟没有交换就提前结束。 |
| [`basic-sort/bubble-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/bubble-sort/index.py) | [`sorting/bubble-sort/bubble_sort.py`](../sorting/bubble-sort/bubble_sort.py) | 改为 Python 3。 |
| [`basic-sort/bidirectional-bubble-sort/another.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/bidirectional-bubble-sort/another.js) | [`sorting/bidirectional-bubble-sort/shrinking-bounds.js`](../sorting/bidirectional-bubble-sort/shrinking-bounds.js) | 每一趟停在最后一次交换位置的版本。 |
| [`basic-sort/bidirectional-bubble-sort/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/bidirectional-bubble-sort/index.js) | [`sorting/bidirectional-bubble-sort/fixed-bounds.js`](../sorting/bidirectional-bubble-sort/fixed-bounds.js) | 作为反例保留：它比普通冒泡还慢。 |
| [`basic-sort/bidirectional-bubble-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/bidirectional-bubble-sort/index.py) | [`sorting/bidirectional-bubble-sort/fixed_bounds.py`](../sorting/bidirectional-bubble-sort/fixed_bounds.py) | 改为 Python 3。 |
| [`basic-sort/selection-sort/once-swap.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/selection-sort/once-swap.js) | [`sorting/selection-sort/selection-sort.js`](../sorting/selection-sort/selection-sort.js) | 真正的选择排序：每一趟只交换一次。 |
| [`basic-sort/selection-sort/multiple-swap.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/selection-sort/multiple-swap.js) | [`sorting/selection-sort/exchange-sort.js`](../sorting/selection-sort/exchange-sort.js) | 改名：每找到一个更小的项就交换，这是交换排序。 |
| [`basic-sort/selection-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/selection-sort/index.py) | [`sorting/selection-sort/exchange_sort.py`](../sorting/selection-sort/exchange_sort.py) | 同样的原因改名。 |
| [`basic-sort/insertion-sort/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/insertion-sort/index.js) | [`sorting/insertion-sort/insertion-sort.js`](../sorting/insertion-sort/insertion-sort.js) | 已导出并有测试。 |
| [`basic-sort/insertion-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/insertion-sort/index.py) | [`sorting/insertion-sort/insertion_sort.py`](../sorting/insertion-sort/insertion_sort.py) | 修正：最小的一项会落到下标 1，所以 [5, 4] 排不好。 |
| [`basic-sort/shell-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/shell-sort/index.py) | [`sorting/shell-sort/shell_sort.py`](../sorting/shell-sort/shell_sort.py) | 改为 Python 3；新增 JavaScript 版 shell-sort.js。 |
| [`basic-sort/merge-sort/split-array-in-recursion.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/merge-sort/split-array-in-recursion.js) | [`sorting/merge-sort/top-down-copying.js`](../sorting/merge-sort/top-down-copying.js) | 不再使用会拖慢大输入的 shift()；现在是稳定排序。 |
| [`basic-sort/merge-sort/use-cursor-in-recursion.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/merge-sort/use-cursor-in-recursion.js) | [`sorting/merge-sort/top-down-indices.js`](../sorting/merge-sort/top-down-indices.js) | 修正：空数组会无限递归。 |
| [`basic-sort/merge-sort/use-cursor-without-recursion.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/merge-sort/use-cursor-without-recursion.js) | [`sorting/merge-sort/bottom-up.js`](../sorting/merge-sort/bottom-up.js) | 修正：长度为 5、9、11 等时会多出 undefined。 |
| [`basic-sort/merge-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/merge-sort/index.py) | [`sorting/merge-sort/top_down_copying.py`](../sorting/merge-sort/top_down_copying.py) | 改为 Python 3；现在是稳定排序。 |
| [`basic-sort/quick-sort/ensure-1-num-per-sort.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/quick-sort/ensure-1-num-per-sort.js) | [`sorting/quick-sort/two-way-copying.js`](../sorting/quick-sort/two-way-copying.js) | 不再从调用方的数组里删掉基准值。 |
| [`basic-sort/quick-sort/ensure-batch-num-per-sort.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/quick-sort/ensure-batch-num-per-sort.js) | [`sorting/quick-sort/three-way-in-place.js`](../sorting/quick-sort/three-way-in-place.js) | 修正：递归从下标 0 而不是 l 开始，4,000 项要跑 22 秒。现在取中间项作基准值。 |
| [`basic-sort/quick-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/quick-sort/index.py) | [`sorting/quick-sort/two_way_copying.py`](../sorting/quick-sort/two_way_copying.py) | 改为 Python 3；不再改动调用方的列表。 |
| [`basic-sort/heap-sort/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/heap-sort/index.js) | [`sorting/heap-sort/heap-sort.js`](../sorting/heap-sort/heap-sort.js) | 修正：根节点从未下沉，[1, 2] 会排成 [2, 1]。 |
| [`basic-sort/radix-sort/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/radix-sort/index.js) | [`sorting/radix-sort/radix-sort.js`](../sorting/radix-sort/radix-sort.js) | 修正：每一趟都读原数组，而且遇到负数就抛错。 |
| [`basic-sort/multiplication-table/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/multiplication-table/index.js) | 已退役 | 它只是打印九九乘法表：一个循环练习，不是排序。 |

## 数据结构与查找

现在位于 [`data-structures/`](../data-structures) 和 [`searching/`](../searching)，有测试和 README。原来的中文 README 成为新 README 的[中文镜像](../data-structures/README.zh-Hans.md)。

| 以前 | 现在 | 原因 |
| --- | --- | --- |
| [`data-structure/stack.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/stack.js) | [`data-structures/stack/stack.js`](../data-structures/stack/stack.js) | 修正：ArrayStack 不保存 push 的值，pop 也不返回任何东西。 |
| [`data-structure/queue/queue.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/queue/queue.js) | [`data-structures/queue/queue.js`](../data-structures/queue/queue.js) | 改为带私有数组的类；行为不变。 |
| [`data-structure/queue/circular-queue.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/queue/circular-queue.js) | [`data-structures/queue/circular-queue.js`](../data-structures/queue/circular-queue.js) | 修正：下标从不绕回，数组随每一项增长。方法改名，与 Queue 一致（enqueue、dequeue、front）。 |
| [`data-structure/queue/priority-queue.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/queue/priority-queue.js) | [`data-structures/queue/priority-queue.js`](../data-structures/queue/priority-queue.js) | 同样的有序数组设计；enqueue(value, priority) 与新的堆版本接口一致。 |
| 新增 | [`data-structures/queue/binary-heap-priority-queue.js`](../data-structures/queue/binary-heap-priority-queue.js) | 新增：同一接口建在二叉堆上，O(log n)。 |
| [`data-structure/linked-list/linked-list.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/linked-list/linked-list.js) | [`data-structures/linked-list/linked-list.js`](../data-structures/linked-list/linked-list.js) | 修正：越界下标会崩溃，indexOf("3") 会找到 3。 |
| [`data-structure/linked-list/doubly-linked-list.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/linked-list/doubly-linked-list.js) | [`data-structures/linked-list/doubly-linked-list.js`](../data-structures/linked-list/doubly-linked-list.js) | 补全：原来只有 addAt，而且第一次调用就抛错。 |
| [`data-structure/linked-list/reverse-linked-list.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/linked-list/reverse-linked-list.js) | [`data-structures/linked-list/reverse-linked-list.js`](../data-structures/linked-list/reverse-linked-list.js) | 已导出并有测试。 |
| [`data-structure/set.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/set.js) | [`data-structures/set/set.js`](../data-structures/set/set.js) | 修正：union 必然抛错；NaN 能被加入两次；values() 暴露了内部数组。 |
| [`data-structure/hash-table/hash-table.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/hash-table/hash-table.js) | [`data-structures/hash-table/hash-table.js`](../data-structures/hash-table/hash-table.js) | 修正：共用一个桶的键删不掉。原来的求和哈希保留为 sumHash，与多项式哈希并列。 |
| [`data-structure/tree/bst.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/tree/bst.js) | [`data-structures/tree/binary-search-tree.js`](../data-structures/tree/binary-search-tree.js) | 修正：删除根节点没有效果。add 改为循环；新增 inOrder。 |
| [`data-structure/tree/trie.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/tree/trie.js) | [`data-structures/tree/trie.js`](../data-structures/tree/trie.js) | 修正：一处拼写错误让 isWord 抛错。print 改为 words()；新增 startsWith。 |
| [`data-structure/tree/binary-tree-array.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/tree/binary-tree-array.js) | [`data-structures/tree/binary-tree-array.js`](../data-structures/tree/binary-tree-array.js) | 修正：树转数组时丢掉了 null，不是原操作的逆操作。节点改用与 LeetCode 一致的 val。 |
| [`data-structure/tree/total-nodes.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/tree/total-nodes.js) | [`data-structures/tree/count-nodes.js`](../data-structures/tree/count-nodes.js) | 改名；已导出并有测试。 |
| [`data-structure/graph.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/graph.js) | [`data-structures/graph/bfs.js`](../data-structures/graph/bfs.js) | 改为返回距离数组；队列不再使用 shift()。 |
| [`data-structure/fib.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/fib.js) | 已退役 | 已退役：它重复了 leetcode/509-fibonacci-number 里的两种写法。 |
| [`leetcode/kmp.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/kmp.js) | [`searching/kmp/kmp.js`](../searching/kmp/kmp.js) | 补全：原来的函数体是空的。 |
| 新增 | [`searching/binary-search/binary-search.js`](../searching/binary-search/binary-search.js) | 新增，为本仓库编写，并附 lowerBound。 |
| 新增 | [`searching/binary-search/BinarySearch.java`](../searching/binary-search/BinarySearch.java) | 新增：取代已从历史中移除的 GPL 教材拷贝。 |

## 经典问题

仍在 [`problems/`](../problems)，现在有测试和 README。

| 以前 | 现在 | 原因 |
| --- | --- | --- |
| [`problems/adding-large-numbers/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/adding-large-numbers/index.js) | [`problems/adding-large-numbers/digit-by-digit.js`](../problems/adding-large-numbers/digit-by-digit.js) | 现在会校验输入（原来 "-5" + "3" 会得到 "NaN8"），并去掉前导零。 |
| [`problems/array-deduplication/extra-array.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/array-deduplication/extra-array.js) | [`problems/array-deduplication/extra-array.js`](../problems/array-deduplication/extra-array.js) | 已导出并有测试；indexOf 对 NaN 的行为现在写进了说明。 |
| [`problems/array-deduplication/sort-first.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/array-deduplication/sort-first.js) | [`problems/array-deduplication/sort-first.js`](../problems/array-deduplication/sort-first.js) | 修正：原来按字符串对调用方的数组排序，10 会排在 9 前面。 |
| [`problems/array-deduplication/set.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/array-deduplication/set.js) | [`problems/array-deduplication/set.js`](../problems/array-deduplication/set.js) | 已导出并有测试。 |
| [`problems/knapsack-0-1/knapsack.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/knapsack-0-1/knapsack.js) | [`problems/knapsack-0-1/brute-force.js`](../problems/knapsack-0-1/brute-force.js) | 修正：背包装满后会忽略重量为 0 的物品。它的表格版本移到了 recursion-to-table.js。 |
| [`problems/knapsack-0-1/dp.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/knapsack-0-1/dp.js) | [`problems/knapsack-0-1/tabulation.js`](../problems/knapsack-0-1/tabulation.js) | 修正了同样的重量为 0 的情况；注释掉的完全背包版本改为在 README 中说明。 |
| [`problems/max-number-in-array/recursion.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/max-number-in-array/recursion.js) | [`problems/max-number-in-array/divide-and-conquer.js`](../problems/max-number-in-array/divide-and-conquer.js) | 修正：空数组会无限递归；现在像 Math.max() 一样返回 -Infinity。 |
| [`problems/netherlands-flag/quick-sort.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/netherlands-flag/quick-sort.js) | [`problems/dutch-national-flag/partition.js`](../problems/dutch-national-flag/partition.js) | 这里只保留划分；外层的快速排序在 sorting/quick-sort/three-way-in-place.js。 |
| [`problems/sum-left-smaller-num-in-array/recursion.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/sum-left-smaller-num-in-array/recursion.js) | [`problems/small-sum/merge-sort.js`](../problems/small-sum/merge-sort.js) | 不再对调用方的数组排序；新增暴力解作为参照。 |
| [`problems/fibonacci-sequence/`](https://github.com/L-Jovi/espresso-algorithm/tree/c0638300307449152cd9262b9156aa1177103bb8/problems/fibonacci-sequence/) | 已退役 | 已退役：四个文件与 leetcode/509-fibonacci-number 里的完全相同。 |

## 从全部历史中移除

以下内容已于 2026-09-28 从每一个提交中移除，因此没有可以链接的地方。

| 以前 | 原因 |
| --- | --- |
| `problems/eggs-hunt/` | 一道面试题，版权属于出题的公司。 |
| `libs/algs4.jar` | 教材《Algorithms, 4th Edition》的 GPL-3.0 配套库。仓库里没有任何代码运行它，它却占了仓库全部文件字节数的 83%。需要的话可以从 [algs4.cs.princeton.edu](https://algs4.cs.princeton.edu/code/) 下载。 |
| `data-structure/binary-search/BinarySearch.java` | 同一本教材 GPL-3.0 源码的原样拷贝。会由本仓库自己写的二分查找取代。 |

## 尚未转换

`algorithm-canvas/` 和 `leetcode/` 仍是旧的结构。每转换完一个，就会在这里补上对应的行。
