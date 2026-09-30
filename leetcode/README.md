# LeetCode solutions

English | [简体中文](README.zh-Hans.md)

Sixty LeetCode problems, each in its own folder with one file per approach, and one test file that checks every approach against the others.

## Try it

```sh
node leetcode/0001-two-sum/hash-map.js                          # solve LeetCode's example
node --test leetcode/0509-fibonacci-number/solution.test.js     # 36 checks on five approaches
npm run bench:leetcode                                          # race the approaches, about 12 s
```

The same races run in your browser on the [race page](https://l-jovi.github.io/espresso-algorithm/leetcode/race/). In Node, the race prints one table per problem, slowest approach first. For problem 509:

```text
509. Fibonacci Number
                            n = 32
  recursion                     37
  memoization               < 0.01
  tabulation                < 0.01
  space-optimized           < 0.01
  fast doubling             < 0.01
```

## What's inside

A folder is named after the problem's number and the name in its URL. Each file inside is named after its technique, so the approaches are visible before you open a file. Problems marked Premium need a LeetCode subscription to open, but not to run the code here.

| # | Problem | Approaches | The idea in one line |
| --- | --- | --- | --- |
| [1](0001-two-sum/) | [Two Sum](https://leetcode.com/problems/two-sum/) | `brute-force` → `hash-map` | Remember where each number was, and look up target − x in O(1). |
| [2](0002-add-two-numbers/) | [Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) | `digit-by-digit`, `dummy-head` | Add digit by digit and carry the tens, as on paper. |
| [3](0003-longest-substring-without-repeating-characters/) | [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | `sliding-window` | Keep a window without repeats; jump its start past the last copy. |
| [4](0004-median-of-two-sorted-arrays/) | [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/) | `merge` → `binary-search` | Binary-search where to cut the shorter array so both halves balance. |
| [5](0005-longest-palindromic-substring/) | [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) | `tabulation` → `expand-around-center` | Grow outwards from each of the 2n − 1 possible centers. |
| [6](0006-zigzag-conversion/) | [Zigzag Conversion](https://leetcode.com/problems/zigzag-conversion/) | `simulation` | Walk the rows down and up, adding each character to its row. |
| [7](0007-reverse-integer/) | [Reverse Integer](https://leetcode.com/problems/reverse-integer/) | `string-reversal`, `digit-math`, and both in Java | Pop and push digits, and stop before the result leaves 32 bits. |
| [8](0008-string-to-integer-atoi/) | [String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/) | `regex` | One regular expression reads the sign and digits; clamp to 32 bits. |
| [9](0009-palindrome-number/) | [Palindrome Number](https://leetcode.com/problems/palindrome-number/) | `digit-math` | Rebuild the number with its digits reversed, and compare. |
| [10](0010-regular-expression-matching/) | [Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/) | `memoization` | Match suffixes, answering each pair of positions once. |
| [11](0011-container-with-most-water/) | [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) | `two-pointers` | Start with the widest pair and always move the shorter line in. |
| [12](0012-integer-to-roman/) | [Integer to Roman](https://leetcode.com/problems/integer-to-roman/) | `greedy`, `lookup-table` | Write the largest symbol that fits, the pairs such as CM included. |
| [13](0013-roman-to-integer/) | [Roman to Integer](https://leetcode.com/problems/roman-to-integer/) | `lookup-table` | Read a two-letter pair when there is one, otherwise one letter. |
| [14](0014-longest-common-prefix/) | [Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/) | `horizontal-scan` | Shorten the prefix word by word. |
| [15](0015-3sum/) | [3Sum](https://leetcode.com/problems/3sum/) | `two-pointers` | Sort, fix the smallest number, and close in from both ends. |
| [16](0016-3sum-closest/) | [3Sum Closest](https://leetcode.com/problems/3sum-closest/) | `two-pointers` | The walk of 3Sum, remembering the closest sum. |
| [17](0017-letter-combinations-of-a-phone-number/) | [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | `backtracking` | Choose one letter per digit, digit after digit. |
| [18](0018-4sum/) | [4Sum](https://leetcode.com/problems/4sum/) | `two-pointers` | 3Sum, one loop deeper. |
| [19](0019-remove-nth-node-from-end-of-list/) | [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) | `fast-slow-pointers`, `fast-slow-pointers-dummy-head` | Two pointers n nodes apart; a dummy head removes the special case. |
| [20](0020-valid-parentheses/) | [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) | `stack`, in JavaScript and Python | Push opening brackets; each closing one must match the top. |
| [21](0021-merge-two-sorted-lists/) | [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) | `recursion` | The smaller head comes first, then the merge of the rest. |
| [22](0022-generate-parentheses/) | [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) | `backtracking` | Add "(" while any are left, and ")" while one is open. |
| [23](0023-merge-k-sorted-lists/) | [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) | `brute-force` → `divide-and-conquer` | Merge the lists in pairs, round after round. |
| [24](0024-swap-nodes-in-pairs/) | [Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/) | `recursion` | Swap the first two nodes, and let the recursion swap the rest. |
| [25](0025-reverse-nodes-in-k-group/) | [Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/) | `iteration`, `recursion` | Cut out k nodes, reverse them, and link them back in. |
| [26](0026-remove-duplicates-from-sorted-array/) | [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | `splice` → `two-pointers` | Copy each new value forward instead of deleting the repeats. |
| [27](0027-remove-element/) | [Remove Element](https://leetcode.com/problems/remove-element/) | `two-pointers` | Copy the items to keep to the front. |
| [28](0028-find-the-index-of-the-first-occurrence-in-a-string/) | [Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | `brute-force` → `kmp` | A prefix table lets the search never move back in the text. |
| [29](0029-divide-two-integers/) | [Divide Two Integers](https://leetcode.com/problems/divide-two-integers/) | `doubling` | Subtract ever-doubling chunks of the divisor. |
| [30](0030-substring-with-concatenation-of-all-words/) | [Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/) | `per-index-count`, in JavaScript and Python | At every start position, tick the words off a count. |
| [46](0046-permutations/) | [Permutations](https://leetcode.com/problems/permutations/) | `backtracking` | Place an unused number, go on, then take it back. |
| [51](0051-n-queens/) | [N-Queens](https://leetcode.com/problems/n-queens/) | `backtracking` | One queen per row; skip the columns and diagonals under attack. |
| [53](0053-maximum-subarray/) | [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) | `brute-force` → `tabulation` → `space-optimized` | The best sum ending here either extends the last one or starts over. |
| [105](0105-construct-binary-tree-from-preorder-and-inorder-traversal/) | [Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | `divide-and-conquer` | Preorder names the root; inorder splits the two subtrees. |
| [106](0106-construct-binary-tree-from-inorder-and-postorder-traversal/) | [Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) | `divide-and-conquer` | The same, with the root at the end of postorder. |
| [111](0111-minimum-depth-of-binary-tree/) | [Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/) | `bfs` | Search level by level and stop at the first leaf. |
| [114](0114-flatten-binary-tree-to-linked-list/) | [Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) | `post-order` | Flatten both sides, then move the left chain to the right. |
| [116](0116-populating-next-right-pointers-in-each-node/) | [Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/) | `pre-order` → `iteration` | Walk each level through the next pointers already set. |
| [121](0121-best-time-to-buy-and-sell-stock/) | [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | `brute-force` → `tabulation` → `space-optimized` | Two states per day: holding the share or not. |
| [208](0208-implement-trie-prefix-tree/) | [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/) | `trie` | Words share the nodes of their common prefix. |
| [211](0211-design-add-and-search-words-data-structure/) | [Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | `trie-dfs` | A "." makes the trie search try every branch. |
| [215](0215-kth-largest-element-in-an-array/) | [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) | `quick_sort` → `quickselect`, in Python | Quickselect keeps only the side that holds the answer. |
| [226](0226-invert-binary-tree/) | [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/) | `recursion` | Swap the two children of every node. |
| [236](0236-lowest-common-ancestor-of-a-binary-tree/) | [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) | `post-order` | The first node that finds p and q on different sides. |
| [256](0256-paint-house/) | [Paint House](https://leetcode.com/problems/paint-house/) (Premium) | `brute-force` → `memoization` → `tabulation` | The cheapest cost from each house on builds on the next house. |
| [314](0314-binary-tree-vertical-order-traversal/) | [Binary Tree Vertical Order Traversal](https://leetcode.com/problems/binary-tree-vertical-order-traversal/) (Premium) | `bfs` | Breadth-first order is already top to bottom, left to right. |
| [322](0322-coin-change/) | [Coin Change](https://leetcode.com/problems/coin-change/) | `brute-force` → `memoization` → `tabulation` | The fewest coins for every smaller total, first. |
| [509](0509-fibonacci-number/) | [Fibonacci Number](https://leetcode.com/problems/fibonacci-number/) | `recursion` → `memoization` → `tabulation` → `space-optimized` → `fast-doubling` | From exponential time to logarithmic. |
| [654](0654-maximum-binary-tree/) | [Maximum Binary Tree](https://leetcode.com/problems/maximum-binary-tree/) | `divide-and-conquer` | The largest number is the root; build both sides the same way. |
| [718](0718-maximum-length-of-repeated-subarray/) | [Maximum Length of Repeated Subarray](https://leetcode.com/problems/maximum-length-of-repeated-subarray/) | `tabulation` | The length of the common run that ends at both positions. |
| [752](0752-open-the-lock/) | [Open the Lock](https://leetcode.com/problems/open-the-lock/) | `bfs` → `bidirectional-bfs` | Search from both ends and meet in the middle. |
| [811](0811-subdomain-visit-count/) | [Subdomain Visit Count](https://leetcode.com/problems/subdomain-visit-count/) | `hash-map` | Add the visits to the domain and to every suffix after a dot. |
| [876](0876-middle-of-the-linked-list/) | [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/) | `fast-slow-pointers` | Fast moves two nodes, slow moves one. |
| [881](0881-boats-to-save-people/) | [Boats to Save People](https://leetcode.com/problems/boats-to-save-people/) | `greedy` | Pair the heaviest with the lightest whenever they fit. |
| [1143](1143-longest-common-subsequence/) | [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) | `brute-force` → `memoization` → `tabulation` | Match the last characters, or drop one of them. |
| [1221](1221-split-a-string-in-balanced-strings/) | [Split a String in Balanced Strings](https://leetcode.com/problems/split-a-string-in-balanced-strings/) | `regex-window` → `balance-counter` | Cut each time the count of L minus R comes back to 0. |
| [1280](1280-students-and-examinations/) | [Students and Examinations](https://leetcode.com/problems/students-and-examinations/) | `joins`, in SQL | CROSS JOIN for every pair, LEFT JOIN for the exams. |
| [1290](1290-convert-binary-number-in-a-linked-list-to-integer/) | [Convert Binary Number in a Linked List to Integer](https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/) | `powers-of-two` → `one-pass` | value = 2 · value + bit. |
| [1297](1297-maximum-number-of-occurrences-of-a-substring/) | [Maximum Number of Occurrences of a Substring](https://leetcode.com/problems/maximum-number-of-occurrences-of-a-substring/) | `sliding-window` | Only windows of the smallest allowed size matter. |
| [1710](1710-maximum-units-on-a-truck/) | [Maximum Units on a Truck](https://leetcode.com/problems/maximum-units-on-a-truck/) | `greedy` | Load the boxes with the most units first. |

An arrow means the approaches form a sequence, each faster than the one before; a comma means they are alternatives of about the same cost.

## How it works

Every file begins with a comment that summarizes the problem in one sentence, explains the idea and why it works, and gives the time and space complexity. Run a file with `node` to see its example; importing it prints nothing.

Each folder's `solution.test.js` runs all its approaches on the same table of cases, LeetCode's examples and the edge cases that broke earlier versions. It then compares them on hundreds or thousands of seeded random inputs with a reference that is slow but plainly correct: trying every combination, a built-in such as `RegExp` or `indexOf`, or a formula. The tests use a few shared helpers: [`shared/linked-list.js`](../shared/linked-list.js), [`data-structures/tree/binary-tree-array.js`](../data-structures/tree/binary-tree-array.js) and [`shared/random-tree.js`](../shared/random-tree.js) build the lists and trees, and [`shared/check.js`](../shared/check.js) runs the table of cases.

### By technique

- **Two pointers:** 11, 15, 16, 18, 26, 27, 881; **fast and slow pointers:** 19, 876.
- **Sliding window:** 3, 1297; **a count per window:** 30.
- **Hash map or lookup table:** 1, 12, 13, 811.
- **Stack:** 20.
- **Linked lists:** 2, 19, 21, 23, 24, 25, 876, 1290.
- **Binary trees:** 105, 106, 114, 116, 226, 236, 654; **level by level:** 111, 314; **tries:** 208, 211.
- **Breadth-first search on a graph:** 752.
- **Backtracking:** 17, 22, 46, 51.
- **Divide and conquer:** 23, 105, 106, 654; **binary search:** 4; **selection:** 215.
- **Dynamic programming:** 5, 10, 53, 121, 256, 322, 509, 718, 1143.
- **Greedy:** 12, 881, 1221, 1710.
- **Digits and bits:** 2, 7, 9, 29, 1290.
- **Strings:** 6, 8, 14, 28.
- **SQL:** 1280.

### From brute force to optimal

These folders hold a whole sequence of approaches. Ten of them have a README that walks through it step by step: [5](0005-longest-palindromic-substring/), [26](0026-remove-duplicates-from-sorted-array/), [53](0053-maximum-subarray/), [121](0121-best-time-to-buy-and-sell-stock/), [215](0215-kth-largest-element-in-an-array/), [256](0256-paint-house/), [322](0322-coin-change/), [509](0509-fibonacci-number/), [752](0752-open-the-lock/) and [1143](1143-longest-common-subsequence/).

| Problem | Input | Slowest | Fastest |
| --- | --- | --- | --- |
| 1. Two Sum | 10,000 numbers | brute force, 65 ms | hash map, 1.17 ms |
| 4. Median of Two Sorted Arrays | 2 × 1,000,000 numbers | merge, 60 ms | binary search, 0.01 ms |
| 5. Longest Palindromic Substring | 2,000 letters | tabulation, 32 ms | expand around center, 0.10 ms |
| 26. Remove Duplicates from Sorted Array | 20,000 equal numbers | splice, 89 ms | two pointers, 0.15 ms |
| 28. Find the Index of the First Occurrence | "a…ab" in 50,001 letters | brute force, 404 ms | KMP, 2.21 ms |
| 53. Maximum Subarray | 10,000 numbers | brute force, 52 ms | space-optimized, 0.02 ms |
| 116. Populating Next Right Pointers | 65,535 nodes | pre-order, 164 ms | iteration, 0.72 ms |
| 121. Best Time to Buy and Sell Stock | 20,000 days | brute force, 259 ms | space-optimized, 0.29 ms |
| 256. Paint House | 20 houses | brute force, 160 ms | tabulation, < 0.01 ms |
| 322. Coin Change | amount 28 | brute force, 66 ms | tabulation, 0.02 ms |
| 509. Fibonacci Number | n = 32 | recursion, 37 ms | fast doubling, < 0.01 ms |
| 752. Open the Lock | "8888", 8 dead ends | BFS, 3.98 ms | bidirectional BFS, 0.49 ms |
| 1143. Longest Common Subsequence | 2 × 12 letters | brute force, 52 ms | tabulation, 0.03 ms |
| 1221. Split a String in Balanced Strings | 20,000 letters | regex window, 61 ms | balance counter, 0.48 ms |

Measured with `npm run bench:leetcode` on 2026-09-30: Node 24.20.0, macOS 15.7 on an Apple silicon (arm64) Mac, the fastest of three runs. Your times will differ; the gaps between the rows much less.

## Then and now

- **Plain objects as hash maps.** Before `Map` (ES2015), a plain object was the usual lookup table in JavaScript. Its keys include everything inherited from `Object.prototype`, so the old versions of 30, 811 and 1297 gave wrong answers for words such as `"constructor"`: 811 printed `function Object() { [native code] }1 constructor`. Every table here is a `Map`, which holds only what was put in it ([MDN: objects vs. maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps)).
- **Sorting a copy.** `array.sort()` sorts in place, so the old versions of 15, 16, 18, 881 and 1710 rearranged the caller's array. [`toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) (ES2023) returns a sorted copy, and the tests check that the input is left alone.
- **Moved addresses.** As of 2026-09-30, the old `leetcode-cn.com/…/solution/…` links redirect to `leetcode.cn/…/solutions/<id>/…`, and the notes once at `labuladong.github.io` now live at [labuladong.online](https://labuladong.online/zh/algo/); the old pages there return 404. The headers link the new addresses. Problem 28 used to be called "Implement strStr()", which was also this folder's old name.

## Limits

- These are study solutions, written to be read. Each passes LeetCode's examples and the tests here, but none was resubmitted to LeetCode after the 2026 rewrite.
- The memoized versions of 256 and 322 recurse once per house or unit of the amount: 10,000 levels overflow the call stack on Node 24. LeetCode's limits keep 256 safe; for 322 the tabulation handles its largest amount.
- JavaScript numbers are exact integers only up to 2⁵³. That is enough for LeetCode's limits; 7, 29 and 509 say where it matters.
- Python covers 20, 30 and 215, Java covers 7, and the SQL of 1280 is tested on SQLite only.
- Ten problems have a README of their own; for the others, the file header is the explanation.

## Checks and credits

- `npm test` runs every `solution.test.js`; `node --test leetcode/<folder>/solution.test.js` runs one. `npm run test:python` covers 20, 30, 215 and the SQL of 1280, which runs with Python's `sqlite3`. `npm run test:java` runs the Java files of 7, which check themselves.
- [`scripts/new-problem.test.js`](../scripts/new-problem.test.js) checks that every folder name matches the problem title in its files. `npm run new -- <number> "<title>"` starts a new problem; see [CONTRIBUTING.md](../CONTRIBUTING.md).
- The problems belong to LeetCode and are linked, never copied. The headers credit the write-ups that shaped a solution, most of them on [leetcode.cn](https://leetcode.cn/) and in [labuladong's algorithm notes](https://labuladong.online/zh/algo/).
- MIT license, like the rest of the repository.
