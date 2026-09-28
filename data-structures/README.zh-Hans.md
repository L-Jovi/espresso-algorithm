# 数据结构

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

栈、队列、链表、集合、哈希表、树和一个图搜索，全部从零实现，并各自和今天内置的同类类型做对照。

## 试一试

```sh
node data-structures/hash-table/hash-table.js     # 在变位词上比较两种哈希函数
node data-structures/tree/binary-search-tree.js   # 删除搜索树的根节点
npm test                                           # 用一个简单的模型检查每一种结构
```

第一条命令说明了哈希函数为什么重要。在 16 个桶里，把字符编码相加的哈希会把每一组变位词（abc/bca/cab、act/cat/tac、dog/god、listen/silent/enlist）都放进同一个桶；多项式哈希则会把它们分散开：

```text
sum hash        bucket sizes: 0 0 0 0 0 0 3 0 3 0 2 0 0 0 0 3
polynomial hash bucket sizes: 1 0 2 0 1 1 2 2 0 0 0 0 2 0 0 0
```

## 里面有什么

| 结构 | 一句话思路 | 主要操作 | JavaScript 今天的内置对应 | 文件 |
| --- | --- | --- | --- | --- |
| 栈 | 后进先出 | push、pop、peek：O(1) | 数组的 `push` 和 `pop` | [`stack.js`](stack/stack.js) |
| 队列 | 先进先出 | 入队 O(1)，出队 O(n)（`shift`） | 没有 | [`queue.js`](queue/queue.js) |
| 循环队列 | 放在数组里、两端会绕回的队列 | 入队、出队：均摊 O(1) | 没有 | [`circular-queue.js`](queue/circular-queue.js) |
| 优先队列（有序数组） | 让各项始终按优先级排好 | 入队 O(n)，出队 O(n) | 没有 | [`priority-queue.js`](queue/priority-queue.js) |
| 优先队列（二叉堆） | 存放在数组里的小顶堆 | 入队、出队：O(log n) | 没有 | [`binary-heap-priority-queue.js`](queue/binary-heap-priority-queue.js) |
| 单链表 | 每个节点指向下一个节点 | add、indexOf、elementAt：O(n) | 没有 | [`linked-list.js`](linked-list/linked-list.js)、[`reverse-linked-list.js`](linked-list/reverse-linked-list.js) |
| 双向链表 | 节点双向相连，并记住两端 | 两端 O(1)，中间 O(n) | 没有 | [`doubly-linked-list.js`](linked-list/doubly-linked-list.js) |
| 集合 | 每个元素最多出现一次 | has 为 O(n)；并集等运算 O(n · m) | `Set`，从 ES2025 起带有 `union`、`intersection`、`difference`、`isSubsetOf` | [`set.js`](set/set.js) |
| 哈希表 | 用哈希函数把键映射到桶；冲突时共用一个桶 | add、lookup、remove：平均 O(1) | `Map` | [`hash-table.js`](hash-table/hash-table.js) |
| 二叉搜索树 | 小的放左边，大的放右边 | 树高为 h 时 O(h) | 没有 | [`binary-search-tree.js`](tree/binary-search-tree.js) |
| 字典树 | 按字母逐个存放单词 | 长度为 L 的单词 O(L) | 没有 | [`trie.js`](tree/trie.js) |
| 树 ⇄ 数组 | LeetCode 的层序格式，以及数节点 | O(n) | 没有 | [`binary-tree-array.js`](tree/binary-tree-array.js)、[`count-nodes.js`](tree/count-nodes.js) |
| 图搜索 | 用广度优先搜索求跳数 | 邻接矩阵上 O(V²) | 没有 | [`bfs.js`](graph/bfs.js) |

## 原理

每个文件开头的注释都讲了思路，以及每个操作的代价。建议的阅读顺序：

1. **栈和队列**，然后是**循环队列**：在数组上移动两个下标，而不是移动元素本身。
2. **链表**：用指针代替位置，以及双向链表每次修改都必须更新的四条链接。
3. **哈希表**，然后是**集合**：为什么 `Set` 的 `has` 是 O(1)，而 `MySet` 的是 O(n)。
4. **优先队列**：同一个接口，分别建在有序数组和堆上，代价相差很大。
5. **树**，最后是**图**。

有几组故意并排保留，因为差别本身就是要学的东西：`Stack`（自己数元素个数）和 `ArrayStack`（交给数组去数）、`Queue` 和 `CircularQueue`、两种优先队列，以及两种哈希函数。

## 过去与现在

- **ES2015** 新增了 `Map` 和 `Set`，也就是语言内置的哈希表。它们会保留插入顺序，而普通对象并不对每一种键都保证这一点。
- **ES2022** 新增了私有字段。这里最早的版本把状态藏在闭包里（`function Queue() { const collection = [] … }`）；现在的类改用 `#items`，把同一件事说得更直接。读取最后一项用 `Array.prototype.at(-1)`。
- **ES2025** 给 `Set` 加上了集合运算：[`union`、`intersection`、`difference`、`symmetricDifference`、`isSubsetOf`、`isSupersetOf`、`isDisjointFrom`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)，Node.js 22 起可用，2024 年 6 月起所有主流浏览器都已支持。`MySet` 手写实现了其中四种，它的测试会拿内置方法的结果来核对。
- **JavaScript 仍然没有的**：队列、优先队列、链表和平衡树。Python 自带 `collections.deque` 和 `heapq`，Java 自带 `ArrayDeque`、`PriorityQueue` 和 `TreeMap`。
- **亲手搭一遍能学到什么**：内置类型背后的代价。例如为什么长数组上的 `shift()` 会变慢，为什么哈希函数必须考虑字符的顺序，为什么按顺序插入数据的树会退化成链表。

## 刻意省略

- 哈希表不会扩容；真正的哈希表会随着装满而扩容，让每个桶都保持很短。
- 二叉搜索树不会自平衡。有序的输入会把它变成一条链；`add` 和 `inOrder` 用的是循环，`remove` 则每一层递归一次。
- 图的部分只有邻接矩阵上的广度优先搜索：没有深度优先搜索，没有权重，也没有邻接表。
- `MySet` 把元素存在数组里，所以 `has` 要扫描全部元素。
- 这些类都不能用 `for … of` 遍历；请使用 `toArray()` 或 `values()`。

## 验证与来源

- [`data-structures.test.js`](data-structures.test.js) 让每一种结构执行数千次随机操作，每一步之后都与一个普通数组、`Map` 或 `Set` 比较。它还检查：`MySet` 与 ES2025 的 `Set` 方法是否一致、求和哈希的变位词冲突、搜索树删除根节点、字典树与单词列表是否一致、LeetCode 树数组的往返转换，以及 300 个随机图上的广度优先搜索距离。
- 最早版本的接口清单参考了[这篇文章](https://zhuanlan.zhihu.com/p/77702278)；循环队列参考了[这一篇](https://blog.csdn.net/fansongy/article/details/6784954)；树的遍历讲解见[这里](https://segmentfault.com/a/1190000016226334)。
- 与仓库其余部分一样，采用 MIT 许可证。
