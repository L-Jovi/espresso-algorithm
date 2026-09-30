# 752. 打开转盘锁

[English](README.md) | 简体中文

> 对应英文版：2026-09-30。英文版更新后本页可能滞后。

在不经过任何禁止数字的前提下，用最少的次数打开四位转盘锁：先从起点搜索，再从两端同时搜索、在中间相遇。[力扣上的题目。](https://leetcode.cn/problems/open-the-lock/)

## 试一试

```sh
node leetcode/0752-open-the-lock/bfs.js                  # 6
node leetcode/0752-open-the-lock/bidirectional-bfs.js    # 6
node --test leetcode/0752-open-the-lock/solution.test.js
```

## 解法，从慢到快

| 文件 | 时间 | 空间 | 变化在哪里 | 目标 "8888" |
| --- | --- | --- | --- | --- |
| [`bfs.js`](bfs.js) | O(10⁴ · 8) | O(10⁴) | 按与 "0000" 的距离，一层一层地访问各个数字。 | 3.98 ms |
| [`bidirectional-bfs.js`](bidirectional-bfs.js) | O(10⁴ · 8) | O(10⁴) | 从两端各起一个搜索，轮流扩展，在相遇处停下。 | 0.49 ms |

死亡数字是 0001、0010、0100、1000、9999、8889、8898 和 8988。时间：2026-09-30 用 `npm run bench:leetcode` 测得，Node 24.20.0，macOS 15.7，Apple 芯片（arm64）的 Mac，取三次运行中最快的一次。请比较各行之间的差别；具体数字取决于机器。

## 原理

每个数字是一个结点，有八个邻居：把某一个转盘向上或向下拨一格。广度优先搜索按距离由近到远访问各个数字，所以第一次到达目标时，用的就是最少的次数。深 d 层的搜索最多会碰到大约 8^d 个数字；两个各深 d/2 层的搜索只碰到大约 2 · 8^(d/2) 个，少得多，双向搜索省下的时间就在这里。

双向搜索是否正确，取决于一个细节：一个数字要在被展开时才标记为已访问，而不是在被加入某一侧的集合时。如果提前标记，另一侧就再也无法加入这个数字，两个搜索可能擦肩而过、永远不会相遇；这种写法在 300 个随机转盘锁里有 299 个答错（实测）。

## 过去与现在

- **这个目录的来历。** [旧的 BFS](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/752-open-the-lock/breadth-first.js)用 `indexOf` 在死亡数字列表里查找每个数字，每次都要扫一遍整个列表；它还用 `shift()` 从队列里取数字，每次都要移动剩下的所有项。`Set` 能在 O(1) 内回答前一个问题，按层读取队列则解决了后一个。

## 刻意省略

- 两侧只是简单地轮流扩展。总是扩展较小的一侧是一种常见的改进，这里没有收录。

## 验证与来源

- [`solution.test.js`](solution.test.js) 让两种解法跑示例，在没有死亡数字时与“每个转盘走较短方向之和”对照，并在 300 个随机转盘锁上互相对照：共 12 项检查。
- 学习来源：[labuladong 的 BFS 算法解题套路框架](https://labuladong.online/zh/algo/essential-technique/bfs-framework/)。
- 与仓库其余部分一样，采用 MIT 许可证。
