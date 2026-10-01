# LeetCode 题解

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

六十道 LeetCode 题，每题一个目录，每种解法一个文件，再用一个测试文件让所有解法互相对照。

## 试一试

```sh
node leetcode/0001-two-sum/hash-map.js                          # 解 LeetCode 的示例
node --test leetcode/0509-fibonacci-number/solution.test.js     # 五种解法，36 项检查
npm run bench:leetcode                                          # 让各种解法比赛，约 12 秒
```

同样的比赛也能在你的浏览器里进行，见[比赛页面](https://espresso.jovipro.com/leetcode/race/)。在 Node 里，比赛会为每道题打印一张表，最慢的解法在最上面。第 509 题是这样的：

```text
509. Fibonacci Number
                            n = 32
  recursion                     37
  memoization               < 0.01
  tabulation                < 0.01
  space-optimized           < 0.01
  fast doubling             < 0.01
```

## 里面有什么

目录名由题号和题目网址里的名字组成。目录里的每个文件以所用的技巧命名，不用打开文件就能看出有哪些解法。标注“会员题”的题目需要订阅 LeetCode 才能打开，但运行这里的代码不需要。

| # | 题目 | 解法 | 一句话思路 |
| --- | --- | --- | --- |
| [1](0001-two-sum/) | [两数之和](https://leetcode.cn/problems/two-sum/) | `brute-force` → `hash-map` | 记下每个数的位置，用 O(1) 查找 target − x。 |
| [2](0002-add-two-numbers/) | [两数相加](https://leetcode.cn/problems/add-two-numbers/) | `digit-by-digit`、`dummy-head` | 逐位相加并进位，和笔算一样。 |
| [3](0003-longest-substring-without-repeating-characters/) | [无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/) | `sliding-window` | 维护一个没有重复的窗口；遇到重复时，窗口起点直接跳过上一次出现的位置。 |
| [4](0004-median-of-two-sorted-arrays/) | [寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/) | `merge` → `binary-search` | 在较短的数组上二分查找切分点，让左右两半一样多。 |
| [5](0005-longest-palindromic-substring/) | [最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/) | `tabulation` → `expand-around-center` | 从 2n − 1 个可能的中心分别向外扩展。 |
| [6](0006-zigzag-conversion/) | [Z 字形变换](https://leetcode.cn/problems/zigzag-conversion/) | `simulation` | 在各行之间上下来回走，把每个字符放进它所在的行。 |
| [7](0007-reverse-integer/) | [整数反转](https://leetcode.cn/problems/reverse-integer/) | `string-reversal`、`digit-math`，以及两者的 Java 版 | 逐位弹出、压入，在结果超出 32 位之前停下。 |
| [8](0008-string-to-integer-atoi/) | [字符串转换整数 (atoi)](https://leetcode.cn/problems/string-to-integer-atoi/) | `regex` | 一个正则表达式读出符号和数字，再截断到 32 位范围。 |
| [9](0009-palindrome-number/) | [回文数](https://leetcode.cn/problems/palindrome-number/) | `digit-math` | 把数字倒过来重建一遍，再比较。 |
| [10](0010-regular-expression-matching/) | [正则表达式匹配](https://leetcode.cn/problems/regular-expression-matching/) | `memoization` | 比较两个后缀，每一对位置只求解一次。 |
| [11](0011-container-with-most-water/) | [盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/) | `two-pointers` | 从最宽的一对开始，每次把较短的一边向内移。 |
| [12](0012-integer-to-roman/) | [整数转罗马数字](https://leetcode.cn/problems/integer-to-roman/) | `greedy`、`lookup-table` | 每次写下能放得下的最大符号，CM 这样的组合也算在内。 |
| [13](0013-roman-to-integer/) | [罗马数字转整数](https://leetcode.cn/problems/roman-to-integer/) | `lookup-table` | 有两个字母的组合就读组合，否则读一个字母。 |
| [14](0014-longest-common-prefix/) | [最长公共前缀](https://leetcode.cn/problems/longest-common-prefix/) | `horizontal-scan` | 一个词一个词地缩短前缀。 |
| [15](0015-3sum/) | [三数之和](https://leetcode.cn/problems/3sum/) | `two-pointers` | 先排序，固定最小的数，再从两端向中间收拢。 |
| [16](0016-3sum-closest/) | [最接近的三数之和](https://leetcode.cn/problems/3sum-closest/) | `two-pointers` | 和三数之和一样地走，同时记住最接近的和。 |
| [17](0017-letter-combinations-of-a-phone-number/) | [电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/) | `backtracking` | 每个数字选一个字母，一位接一位。 |
| [18](0018-4sum/) | [四数之和](https://leetcode.cn/problems/4sum/) | `two-pointers` | 三数之和再多一层循环。 |
| [19](0019-remove-nth-node-from-end-of-list/) | [删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/) | `fast-slow-pointers`、`fast-slow-pointers-dummy-head` | 两个指针相隔 n 个结点；哑结点让头结点不再是特例。 |
| [20](0020-valid-parentheses/) | [有效的括号](https://leetcode.cn/problems/valid-parentheses/) | `stack`，JavaScript 与 Python 版 | 左括号入栈；每个右括号都必须和栈顶匹配。 |
| [21](0021-merge-two-sorted-lists/) | [合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/) | `recursion` | 较小的头结点在前，后面接上其余部分的合并结果。 |
| [22](0022-generate-parentheses/) | [括号生成](https://leetcode.cn/problems/generate-parentheses/) | `backtracking` | 还有剩余就加“(”，有未闭合的就加“)”。 |
| [23](0023-merge-k-sorted-lists/) | [合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/) | `brute-force` → `divide-and-conquer` | 两两合并，一轮接一轮。 |
| [24](0024-swap-nodes-in-pairs/) | [两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/) | `recursion` | 交换前两个结点，剩下的交给递归。 |
| [25](0025-reverse-nodes-in-k-group/) | [K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/) | `iteration`、`recursion` | 剪下 k 个结点，翻转，再接回去。 |
| [26](0026-remove-duplicates-from-sorted-array/) | [删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/) | `splice` → `two-pointers` | 把每个新值往前复制，而不是删除重复项。 |
| [27](0027-remove-element/) | [移除元素](https://leetcode.cn/problems/remove-element/) | `two-pointers` | 把要保留的项复制到前面。 |
| [28](0028-find-the-index-of-the-first-occurrence-in-a-string/) | [找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/) | `brute-force` → `kmp` | 前缀表让查找在文本中永不回退。 |
| [29](0029-divide-two-integers/) | [两数相除](https://leetcode.cn/problems/divide-two-integers/) | `doubling` | 减去不断翻倍的除数块。 |
| [30](0030-substring-with-concatenation-of-all-words/) | [串联所有单词的子串](https://leetcode.cn/problems/substring-with-concatenation-of-all-words/) | `per-index-count`，JavaScript 与 Python 版 | 在每个起点，把单词从计数表上逐个勾掉。 |
| [46](0046-permutations/) | [全排列](https://leetcode.cn/problems/permutations/) | `backtracking` | 放一个还没用过的数，继续，再把它拿回来。 |
| [51](0051-n-queens/) | [N 皇后](https://leetcode.cn/problems/n-queens/) | `backtracking` | 每行一个皇后；跳过受到攻击的列和对角线。 |
| [53](0053-maximum-subarray/) | [最大子数组和](https://leetcode.cn/problems/maximum-subarray/) | `brute-force` → `tabulation` → `space-optimized` | 以当前项结尾的最大和，要么接上前一个，要么从头开始。 |
| [105](0105-construct-binary-tree-from-preorder-and-inorder-traversal/) | [从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | `divide-and-conquer` | 前序给出根，中序把两棵子树分开。 |
| [106](0106-construct-binary-tree-from-inorder-and-postorder-traversal/) | [从中序与后序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) | `divide-and-conquer` | 同上，只是根在后序的末尾。 |
| [111](0111-minimum-depth-of-binary-tree/) | [二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/) | `bfs` | 逐层搜索，遇到第一个叶子就停。 |
| [114](0114-flatten-binary-tree-to-linked-list/) | [二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/) | `post-order` | 先展开两边，再把左边的链移到右边。 |
| [116](0116-populating-next-right-pointers-in-each-node/) | [填充每个节点的下一个右侧节点指针](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/) | `pre-order` → `iteration` | 沿着已经连好的 next 指针，逐层往下连。 |
| [121](0121-best-time-to-buy-and-sell-stock/) | [买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/) | `brute-force` → `tabulation` → `space-optimized` | 每天两种状态：持有股票，或者不持有。 |
| [208](0208-implement-trie-prefix-tree/) | [实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/) | `trie` | 单词共用公共前缀的结点。 |
| [211](0211-design-add-and-search-words-data-structure/) | [添加与搜索单词 - 数据结构设计](https://leetcode.cn/problems/design-add-and-search-words-data-structure/) | `trie-dfs` | 遇到“.”时，前缀树的查找要试遍每个分支。 |
| [215](0215-kth-largest-element-in-an-array/) | [数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/) | `quick_sort` → `quickselect`，Python 版 | 快速选择只保留答案所在的那一边。 |
| [226](0226-invert-binary-tree/) | [翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/) | `recursion` | 交换每个结点的两个孩子。 |
| [236](0236-lowest-common-ancestor-of-a-binary-tree/) | [二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/) | `post-order` | 第一个在两侧分别找到 p 和 q 的结点。 |
| [256](0256-paint-house/) | [粉刷房子](https://leetcode.cn/problems/paint-house/)（会员题） | `brute-force` → `memoization` → `tabulation` | 从每栋房子起的最低花费，建立在下一栋房子之上。 |
| [314](0314-binary-tree-vertical-order-traversal/) | [二叉树的垂直遍历](https://leetcode.cn/problems/binary-tree-vertical-order-traversal/)（会员题） | `bfs` | 广度优先的顺序本来就是从上到下、从左到右。 |
| [322](0322-coin-change/) | [零钱兑换](https://leetcode.cn/problems/coin-change/) | `brute-force` → `memoization` → `tabulation` | 先求出每个更小金额所需的最少硬币数。 |
| [509](0509-fibonacci-number/) | [斐波那契数](https://leetcode.cn/problems/fibonacci-number/) | `recursion` → `memoization` → `tabulation` → `space-optimized` → `fast-doubling` | 从指数时间一路到对数时间。 |
| [654](0654-maximum-binary-tree/) | [最大二叉树](https://leetcode.cn/problems/maximum-binary-tree/) | `divide-and-conquer` | 最大的数作根，两边用同样的方法构造。 |
| [718](0718-maximum-length-of-repeated-subarray/) | [最长重复子数组](https://leetcode.cn/problems/maximum-length-of-repeated-subarray/) | `tabulation` | 同时在两个位置结束的公共段有多长。 |
| [752](0752-open-the-lock/) | [打开转盘锁](https://leetcode.cn/problems/open-the-lock/) | `bfs` → `bidirectional-bfs` | 从两端同时搜索，在中间相遇。 |
| [811](0811-subdomain-visit-count/) | [子域名访问计数](https://leetcode.cn/problems/subdomain-visit-count/) | `hash-map` | 把访问次数加到域名本身，以及每个点之后的后缀上。 |
| [876](0876-middle-of-the-linked-list/) | [链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/) | `fast-slow-pointers` | 快指针走两步，慢指针走一步。 |
| [881](0881-boats-to-save-people/) | [救生艇](https://leetcode.cn/problems/boats-to-save-people/) | `greedy` | 最重的人和最轻的人能同船就同船。 |
| [1143](1143-longest-common-subsequence/) | [最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/) | `brute-force` → `memoization` → `tabulation` | 比较最后的两个字符，匹配就接上，不匹配就丢掉其中一个。 |
| [1221](1221-split-a-string-in-balanced-strings/) | [分割平衡字符串](https://leetcode.cn/problems/split-a-string-in-balanced-strings/) | `regex-window` → `balance-counter` | L 与 R 的差每回到 0 一次，就切一刀。 |
| [1280](1280-students-and-examinations/) | [学生们参加各科测试的次数](https://leetcode.cn/problems/students-and-examinations/) | `joins`，SQL 版 | 用 CROSS JOIN 得到每一对，用 LEFT JOIN 接上考试记录。 |
| [1290](1290-convert-binary-number-in-a-linked-list-to-integer/) | [二进制链表转整数](https://leetcode.cn/problems/convert-binary-number-in-a-linked-list-to-integer/) | `powers-of-two` → `one-pass` | value = 2 · value + bit。 |
| [1297](1297-maximum-number-of-occurrences-of-a-substring/) | [子串的最大出现次数](https://leetcode.cn/problems/maximum-number-of-occurrences-of-a-substring/) | `sliding-window` | 只需要看允许的最小长度的窗口。 |
| [1710](1710-maximum-units-on-a-truck/) | [卡车上的最大单元数](https://leetcode.cn/problems/maximum-units-on-a-truck/) | `greedy` | 先装每箱单元最多的箱子。 |

箭头表示这些解法构成一个序列，一个比一个快；顿号表示它们是代价相近的几种写法。

## 原理

每个文件开头的注释用一句话概括题目，解释思路和它为什么成立，并给出时间和空间复杂度。用 `node` 运行文件会打印示例；被 import 时则什么都不打印。

每个目录的 `solution.test.js` 让所有解法跑同一组用例：LeetCode 的示例，以及曾经让旧版本出错的边界情况。然后在几百到几千组带种子的随机输入上，把它们和一个参照对照：参照很慢，但一眼就能看出是对的，比如穷举所有组合、`RegExp` 或 `indexOf` 这样的内置函数，或者一个公式。测试用到几个共用工具：[`shared/linked-list.js`](../shared/linked-list.js)、[`data-structures/tree/binary-tree-array.js`](../data-structures/tree/binary-tree-array.js) 和 [`shared/random-tree.js`](../shared/random-tree.js) 用来构造链表和树，[`shared/check.js`](../shared/check.js) 负责跑用例表。

### 按技巧分类

- **双指针：** 11、15、16、18、26、27、881；**快慢指针：** 19、876。
- **滑动窗口：** 3、1297；**每个窗口一份计数：** 30。
- **哈希表或查找表：** 1、12、13、811。
- **栈：** 20。
- **链表：** 2、19、21、23、24、25、876、1290。
- **二叉树：** 105、106、114、116、226、236、654；**逐层遍历：** 111、314；**前缀树：** 208、211。
- **图上的广度优先搜索：** 752。
- **回溯：** 17、22、46、51。
- **分治：** 23、105、106、654；**二分查找：** 4；**选择：** 215。
- **动态规划：** 5、10、53、121、256、322、509、718、1143。
- **贪心：** 12、881、1221、1710。
- **数位与二进制：** 2、7、9、29、1290。
- **字符串：** 6、8、14、28。
- **SQL：** 1280。

### 从暴力解到最优解

下面这些目录里有一整串解法。其中十道题有自己的 README，一步一步讲清这个过程：[5](0005-longest-palindromic-substring/)、[26](0026-remove-duplicates-from-sorted-array/)、[53](0053-maximum-subarray/)、[121](0121-best-time-to-buy-and-sell-stock/)、[215](0215-kth-largest-element-in-an-array/)、[256](0256-paint-house/)、[322](0322-coin-change/)、[509](0509-fibonacci-number/)、[752](0752-open-the-lock/) 和 [1143](1143-longest-common-subsequence/)。

| 题目 | 输入 | 最慢 | 最快 |
| --- | --- | --- | --- |
| 1. 两数之和 | 10,000 个数 | 暴力解，65 ms | 哈希表，1.17 ms |
| 4. 寻找两个正序数组的中位数 | 2 × 1,000,000 个数 | 归并，60 ms | 二分查找，0.01 ms |
| 5. 最长回文子串 | 2,000 个字母 | 表格法，32 ms | 中心扩展，0.10 ms |
| 26. 删除有序数组中的重复项 | 20,000 个相同的数 | splice，89 ms | 双指针，0.15 ms |
| 28. 找出字符串中第一个匹配项的下标 | 在 50,001 个字母里找 "a…ab" | 暴力解，404 ms | KMP，2.21 ms |
| 53. 最大子数组和 | 10,000 个数 | 暴力解，52 ms | 空间优化版，0.02 ms |
| 116. 填充每个节点的下一个右侧节点指针 | 65,535 个结点 | 前序递归，164 ms | 逐层迭代，0.72 ms |
| 121. 买卖股票的最佳时机 | 20,000 天 | 暴力解，259 ms | 空间优化版，0.29 ms |
| 256. 粉刷房子 | 20 栋房子 | 暴力解，160 ms | 表格法，< 0.01 ms |
| 322. 零钱兑换 | 金额 28 | 暴力解，66 ms | 表格法，0.02 ms |
| 509. 斐波那契数 | n = 32 | 递归，37 ms | 快速倍增，< 0.01 ms |
| 752. 打开转盘锁 | "8888"，8 个死亡数字 | BFS，3.98 ms | 双向 BFS，0.49 ms |
| 1143. 最长公共子序列 | 2 × 12 个字母 | 暴力解，52 ms | 表格法，0.03 ms |
| 1221. 分割平衡字符串 | 20,000 个字母 | 正则窗口，61 ms | 计数法，0.48 ms |

2026-09-30 用 `npm run bench:leetcode` 测得：Node 24.20.0，macOS 15.7，Apple 芯片（arm64）的 Mac，取三次运行中最快的一次。你测到的时间会不同，同一台机器上两次运行之间也会不同；但各行之间的大差距不会变。

## 过去与现在

- **拿普通对象当哈希表。** 在 `Map`（ES2015）出现之前，普通对象是 JavaScript 里常用的查找表。它的键包括从 `Object.prototype` 继承来的一切，所以 30、811、1297 的旧版本遇到 `"constructor"` 这样的单词会算错：811 打印出了 `function Object() { [native code] }1 constructor`。这里所有的表都换成了 `Map`，它只包含放进去的东西（[MDN：对象与 Map 的比较](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps)）。
- **对副本排序。** `array.sort()` 原地排序，所以 15、16、18、881、1710 的旧版本会打乱调用方的数组。[`toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)（ES2023）返回排好序的副本，测试也会检查输入没有被改动。
- **地址变了。** 截至 2026-09-30，旧的 `leetcode-cn.com/…/solution/…` 链接会跳转到 `leetcode.cn/…/solutions/<id>/…`；原来在 `labuladong.github.io` 的笔记搬到了 [labuladong.online](https://labuladong.online/zh/algo/)，旧页面返回 404。文件头链接的都是新地址。第 28 题原名“Implement strStr()”，这也是这个目录原来的名字。

## 刻意省略

- 这些是用来学习的题解，写法以好读为先。每一份都通过了 LeetCode 的示例和这里的测试，但 2026 年重写之后都没有重新提交到 LeetCode。
- 256 和 322 的记忆化版本每栋房子、每一单位金额都要递归一层：在 Node 24 上，10,000 层就会让调用栈溢出。按 LeetCode 的限制，256 不会遇到这种情况；322 的最大金额则由表格法处理。
- JavaScript 的数只在 2⁵³ 以内是精确的整数。这足以满足 LeetCode 的限制；7、29、509 的文件里说明了哪里会用到这一点。
- Python 版只有 20、30、215，Java 版只有 7，1280 的 SQL 只在 SQLite 上测试过。
- 只有十道题有自己的 README；其余题目的讲解都在文件开头的注释里。

## 验证与来源

- `npm test` 运行所有 `solution.test.js`；`node --test leetcode/<目录>/solution.test.js` 只运行一道题。`npm run test:python` 覆盖 20、30、215，以及用 Python 的 `sqlite3` 运行的 1280 的 SQL。`npm run test:java` 运行第 7 题的 Java 文件，它们会自我检查。
- [`scripts/new-problem.test.js`](../scripts/new-problem.test.js) 检查每个目录名都和文件里写的题目名称一致。`npm run new -- <题号> "<题名>"` 可以开始一道新题，见 [CONTRIBUTING.md](../CONTRIBUTING.md)。
- 题目归 LeetCode 所有，这里只放链接，从不复制题面。文件头注明了影响过每个解法的文章，大多来自 [leetcode.cn](https://leetcode.cn/) 和 [labuladong 的算法笔记](https://labuladong.online/zh/algo/)。
- 与仓库其余部分一样，采用 MIT 许可证。
