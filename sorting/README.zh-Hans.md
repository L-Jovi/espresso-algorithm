# 排序

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

十四种给数字排序的写法，从冒泡排序到基数排序，每一种都在同样的输入上和内置排序对照检查。

## 试一试

```sh
node sorting/quick-sort/three-way-in-place.js   # 给 12 个随机数排序
npm run bench                                    # 让所有排序在 1,000 到 100,000 个数上比赛
npm test                                         # 检查每一种排序（以及仓库里的其他部分）
```

随机数带种子，所以第一条命令每次都打印同样的输入：

```text
input:  -98 -88 96 40 4 -19 -7 -52 11 46 -49 -69
sorted: -98 -88 -69 -52 -49 -19 -7 4 11 40 46 96
```

想看其中十二种排序一次读或写一步地运行，打开[排序可视化](https://espresso.jovipro.com/visualizer/)。

## 里面有什么

| 算法 | 一句话思路 | 时间：平均 / 最坏 | 额外空间 | 稳定 | 文件 |
| --- | --- | --- | --- | --- | --- |
| 冒泡排序 | 交换逆序的相邻两项，直到某一趟一次都没交换 | O(n²) / O(n²)，已有序时 O(n) | O(1) | 是 | [`bubble-sort.js`](bubble-sort/bubble-sort.js)、[`bubble_sort.py`](bubble-sort/bubble_sort.py) |
| 双向冒泡排序 | 先向右冒泡，再向左冒泡；每一趟停在最后一次交换的位置 | O(n²) / O(n²) | O(1) | 是 | [`shrinking-bounds.js`](bidirectional-bubble-sort/shrinking-bounds.js)、[`fixed-bounds.js`](bidirectional-bubble-sort/fixed-bounds.js)、[`fixed_bounds.py`](bidirectional-bubble-sort/fixed_bounds.py) |
| 选择排序 | 把剩下部分里最小的一项换到最前面 | O(n²) / O(n²) | O(1) | 否 | [`selection-sort.js`](selection-sort/selection-sort.js) |
| 交换排序 | 后面只要有更小的一项就立刻交换 | O(n²) / O(n²) | O(1) | 否 | [`exchange-sort.js`](selection-sort/exchange-sort.js)、[`exchange_sort.py`](selection-sort/exchange_sort.py) |
| 插入排序 | 把每一项插入它左边已经排好的部分 | O(n²) / O(n²)，已有序时 O(n) | O(1) | 是 | [`insertion-sort.js`](insertion-sort/insertion-sort.js)、[`insertion_sort.py`](insertion-sort/insertion_sort.py) |
| 希尔排序 | 对相隔一段间隔的项做插入排序，间隔逐步缩小 | 取决于间隔序列 / O(n²) | O(1) | 否 | [`shell-sort.js`](shell-sort/shell-sort.js)、[`shell_sort.py`](shell-sort/shell_sort.py) |
| 归并排序 | 分别排好两半，再把两个有序的半边合并 | O(n log n) / O(n log n) | O(n) | 是 | [`top-down-copying.js`](merge-sort/top-down-copying.js)、[`top-down-indices.js`](merge-sort/top-down-indices.js)、[`bottom-up.js`](merge-sort/bottom-up.js)、[`merge.js`](merge-sort/merge.js)、[`top_down_copying.py`](merge-sort/top_down_copying.py) |
| 快速排序 | 以一个基准值为界分成两边，再分别排序 | O(n log n) / O(n²) | 原地版 O(log n)，复制版 O(n) | 否 | [`two-way-copying.js`](quick-sort/two-way-copying.js)、[`three-way-in-place.js`](quick-sort/three-way-in-place.js)、[`two_way_copying.py`](quick-sort/two_way_copying.py) |
| 堆排序 | 建一个大顶堆，然后反复把最大值移到末尾 | O(n log n) / O(n log n) | O(1) | 否 | [`heap-sort.js`](heap-sort/heap-sort.js) |
| 基数排序 | 按每一位数字分桶，从最低位开始 | d 位数时 O(d · (n + 10)) | O(n) | 是 | [`radix-sort.js`](radix-sort/radix-sort.js) |

**稳定**的意思是：相等的项保持原来的先后顺序。按一个字段排好之后再按另一个字段排序时，这一点很重要：稳定的第二次排序会保留第一次排序在相等项之间的顺序。

## 原理

每个文件开头的注释都讲了它的思路，以及为什么行得通。建议的阅读顺序：

1. **冒泡、插入、选择。** 它们都维护一段已经就位的部分，每一趟扩大一项，所以是 O(n²)。
2. **归并排序**，先看 `top-down-copying.js`，再看 `top-down-indices.js` 和 `bottom-up.js`：同一个思路，分别写成对副本递归、对下标区间递归，以及完全不用递归的循环。
3. **快速排序**，先看 `two-way-copying.js`，再看 `three-way-in-place.js`。
4. **堆排序**和**基数排序**：一个藏在数组里的树，以及一种从不比较两个数的排序。

有几个目录故意保留两个版本，因为两者的差别本身就是要学的东西：

- **固定边界与收缩边界的双向冒泡。** 来回冒泡只有在每一趟都停在最后一次交换的位置时才划算。不这样做的固定边界版，在下面的比赛里比普通冒泡还慢约 1.7 倍。
- **选择排序与交换排序。** 比较次数相同，但前者每一趟只交换一次，后者每找到一个更小的项就交换一次。
- **两路与三路快速排序。** 把所有等于基准值的项都放到同一边，会让“全部相同的数组”成为最坏情况。三路版把它们一次性放到位。

### 比赛结果

2026-09-28 在 Apple M4 Max 上用 Node 24.20.0 运行 `npm run bench` 的结果（单位为毫秒，取三次中最快的一次）。耗时取决于机器，请比较各行之间的差别，而不是绝对数值。

```text
algorithm                              1,000    10,000   100,000
----------------------------------------------------------------
bubble sort                             0.55        53         –
shaker sort, fixed bounds               1.00        89         –
shaker sort, shrinking bounds           0.50        53         –
exchange sort                           0.60        56         –
selection sort                          0.37        35         –
insertion sort                          0.17        13         –
shell sort                              0.08      0.99        14
merge sort, top down, copying           0.15      2.12        25
merge sort, top down, indices           0.04      0.74      8.51
merge sort, bottom up                   0.12      1.19        14
quick sort, two-way, copying            0.10      1.10        14
quick sort, three-way, in place         0.10      0.71      7.04
heap sort                               0.08      0.60      6.74
radix sort                              0.19      1.25      2.90
built-in Array.prototype.sort           0.07      0.97        13
```

数据量扩大十倍，O(n²) 的排序大约慢了 100 倍（1,000 → 10,000），而 O(n log n) 的排序只慢了大约 10 到 12 倍（10,000 → 100,000）。

## 过去与现在

- **引擎。** 2018 年之前，V8（Chrome 和 Node.js 的引擎）对超过 10 项的数组使用不稳定的快速排序。[V8 7.0 把 `Array.prototype.sort` 换成了 TimSort](https://v8.dev/blog/array-sort)，一种由归并排序和插入排序组合而成的稳定排序；从 ES2019 起，语言规范要求所有引擎的排序都必须稳定。
- **Python** 从 2.3 版起就使用 TimSort。[Python 3.11 把它的合并策略换成了 Powersort 的策略](https://www.wild-inter.net/posts/powersort-in-python-3.11)，后者被证明接近最优。
- **返回副本而不是修改原数组。** ES2023 新增了 [`toSorted()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)，它返回排好序的副本，不改动原数组，行为和 `top-down-copying.js` 一样。
- **手写一遍还能教你什么。** 库里的排序正是由这些部件组成的：TimSort 就是对短片段做插入排序，再加上归并。在上面的比赛里，带比较函数的内置排序对纯整数并不是最快的；它要支持任意比较函数并保证稳定，这是有代价的。

## 刻意省略

- 基于比较的排序都接受比较函数；基数排序只接受安全整数。
- 基准值总是取中间项。精心构造的输入仍然可以把它逼到 O(n²)；换成随机基准值，就能让每一种输入的期望时间都是 O(n log n)。
- 两路快速排序遇到全部相同的数组时，每一项都要多递归一层，大约 5,500 个相同值就会让调用栈溢出（Node 24，默认栈大小）。三路版正是为了解决这个问题。
- 没有采用生产级排序的那些技巧：短区间改用插入排序、识别已经有序的片段、galloping 合并。
- 其中七种排序有 Python 版本。

## 验证与来源

- [`sorting.test.js`](sorting.test.js) 让每一种 JavaScript 排序跑同样的小输入（包括所有曾经让旧版本出错的输入），并在 1,000 组带种子的随机数组上与内置排序对照。它还检查稳定性、比较函数、是否改动输入，以及几种较快的排序在 20,000 项输入上的表现。
- [`test_sorting.py`](test_sorting.py) 对 Python 版本做同样的检查，对照的是 `sorted()`。
- 堆排序参考了[这篇文章](https://www.cnblogs.com/chengxiao/p/6129630.html)；基数排序参考了[这一篇](https://segmentfault.com/a/1190000021342923)。
- 与仓库其余部分一样，采用 MIT 许可证。
