# 排序可视化

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

看 [`sorting/`](../sorting/) 里的十二种排序处理同一组数，一次读或写一步地进行，还能让两种排序并排比赛。

## 试一试

打开 [l-jovi.github.io/espresso-algorithm/visualizer](https://l-jovi.github.io/espresso-algorithm/visualizer/)，或者自己启动一个本地服务：

```sh
npm run serve                            # 然后打开 http://127.0.0.1:8080/visualizer/
node --test visualizer/visualizer.test.js
```

让冒泡排序和快速排序在 64 个数上比赛，[正是这一场](https://l-jovi.github.io/espresso-algorithm/visualizer/?sort=bubble&rival=quick&n=64&shape=random&seed=7)：快速排序 2,100 步就完成了，冒泡排序则需要 10,680 步。

## 里面有什么

| 文件 | 作用 |
| --- | --- |
| [`trace.js`](trace.js) | 在数组的 `Proxy` 上运行排序，记录每一次读、写和比较；`replay` 只凭写操作就能重建出结果。 |
| [`sorts.js`](sorts.js) | 能被追踪的十二种排序，从 `sorting/` 引入。 |
| [`visualizer.js`](visualizer.js) | 页面脚本：生成数字，追踪选中的排序，在画布上回放每一步。 |
| [`index.html`](index.html) | 页面的结构和控件。 |

可视化是站点三个页面中的一个；另外两个分别让 LeetCode 解法比赛（[`leetcode/race/`](../leetcode/race/)），以及为中文分词（[`nlp/word-segmentation/`](../nlp/word-segmentation/)）。首页是根目录下的 [`index.html`](../index.html)。所有页面共用 [`assets/site.css`](../assets/site.css)，以及 [`assets/language.js`](../assets/language.js)：它让页面就地在英文和中文之间切换。

## 原理

排序并不知道自己正被观察。它拿到的是这组数的 [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，一个挡在数组前面的对象。它的 `get` 和 `set` 拦截器看到每一次按下标的访问，记下来，再原样转交；一个会计数的比较函数则记下每一次比较。在你按下 Play 之前，页面已经用这种方式把排序运行过一遍。播放就是回放这份记录：读一次，一根柱子亮起；写一次，柱子的高度改变。

让两种排序比赛时，两者每秒走同样多的步数，所以需要操作更少的那个先完成。一步就是一次读、一次写或一次比较。

只有原地重排传入数组的排序才能被追踪。复制式归并排序和复制式快速排序会创建并返回新数组，没有写操作可以回放，所以没有收录。

## 过去与现在

- **第一个可视化** [`algorithm-canvas/`](https://github.com/L-Jovi/espresso-algorithm/tree/c0638300307449152cd9262b9156aa1177103bb8/algorithm-canvas) 是 norahiko 的 [sort-visualize](https://github.com/norahiko/sort-visualize) 的拷贝，基于 Knockout 框架，动画演示的是它自带的排序代码。它无法用键盘操作，画布在高分屏上会发虚。现在这个是从头写的，按屏幕的像素密度绘制每根柱子，展示的是本仓库自己的代码；[NOTICE.md](../NOTICE.md) 致谢了原作。
- **`Proxy`** 随 ES2015 出现。在它之前，要监视数组的每个下标，得为每个下标单独定义访问器；这里的第一个版本则自带了一份排序代码的副本，专门写成会汇报每一步。现在同一个函数原封不动地运行在测试里、`npm run bench` 里，以及这里。

## 刻意省略

- 归并排序先写进一个单独的缓冲区；只有复制回数组的那一步会被画出来，所以合并过程本身显示为一连串读操作。
- 这里计的是步数，不是时间：比赛显示的是哪种排序做的工作更少，而不是它在真实机器上要花多久。那由 `npm run bench` 来测。
- 最多 128 个数，好让每根柱子都看得见。

## 验证与来源

- [`visualizer.test.js`](visualizer.test.js) 检查 `trace` 按下标记录读和写，并检查十二种排序中的每一种在 300 组随机输入上，只回放写操作就能重建出排好序的数组。
- CI 会在 Chrome、Firefox 和 Safari 中用 `?selftest` 打开这个页面，由页面在浏览器里对四种初始顺序回放全部十二种排序。
- 感谢 norahiko 的 sort-visualize（MIT）提供了这个想法。与仓库其余部分一样，采用 MIT 许可证。
