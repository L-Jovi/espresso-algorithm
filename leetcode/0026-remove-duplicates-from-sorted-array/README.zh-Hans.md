# 26. 删除有序数组中的重复项

[English](README.md) | 简体中文

> 对应英文版：2026-09-30。英文版更新后本页可能滞后。

原地让有序数组的每个值只保留一次：先是删除重复项，然后改为把保留的值往前复制。[力扣上的题目。](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

## 试一试

```sh
node leetcode/0026-remove-duplicates-from-sorted-array/splice.js          # 5 [ 0, 1, 2, 3, 4 ]
node leetcode/0026-remove-duplicates-from-sorted-array/two-pointers.js    # 5 [ 0, 1, 2, 3, 4 ]
node --test leetcode/0026-remove-duplicates-from-sorted-array/solution.test.js
```

## 解法，从慢到快

| 文件 | 时间 | 空间 | 变化在哪里 | 20,000 个相同的数 |
| --- | --- | --- | --- | --- |
| [`splice.js`](splice.js) | O(n²) | O(1) | 删除每个重复项，而每次删除都要把数组后面的部分整体前移。 | 89 ms |
| [`two-pointers.js`](two-pointers.js) | O(n) | O(1) | 把每个新值复制到上一个保留值的后面，什么都不用移动。 | 0.15 ms |

时间：2026-09-30 用 `npm run bench:leetcode` 测得，Node 24.20.0，macOS 15.7，Apple 芯片（arm64）的 Mac，取三次运行中最快的一次。请比较各行之间的差别；具体数字取决于机器。

## 原理

`splice(i, 1)` 读起来很自然，“删掉这一个”，但它会把 i 之后的每一项都向左移一步。n 个相同的数需要删除 n − 1 次，每次都要移动剩下的部分：大约 n²/2 次移动。双指针版从不删除。`slow` 标记上一个保留的值，`fast` 在前面读，凡是和上一个保留值不同的值，就复制到下一个空位上。LeetCode 之后只读前 k 项，所以它们后面剩下什么都无所谓。

## 过去与现在

- **`[...new Set(nums)]`** 是今天 JavaScript 里去重的写法，但它会创建一个新数组，而这道题要求原地修改、只用 O(1) 的额外空间。[problems/array-deduplication](../../problems/array-deduplication/) 比较了三种生成新数组的去重方法。
- **这个目录的来历。** [旧的双指针版](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/26-remove-duplicates-from-sorted-array/2-pointers.js)遇到空数组时返回的是数组本身，而不是 0。

## 刻意省略

- 输入必须有序，相等的值才会挨在一起。
- 两种解法都会修改调用方的数组，这正是题目的要求。

## 验证与来源

- [`solution.test.js`](solution.test.js) 在示例和空数组上检查两种解法返回的个数和数组的前 k 项，并在 1,000 组随机有序数组上与 `Set` 对照：共 11 项检查。
- 与仓库其余部分一样，采用 MIT 许可证。
