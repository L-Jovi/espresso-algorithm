# Where did it go?

English | [简体中文](migration.zh-Hans.md)

In September 2026 this repository was reorganized from a folder of scripts into a set of tested, documented sections. This page maps every old path to its new home. Links to old files point at [`c063830`](https://github.com/L-Jovi/espresso-algorithm/tree/c0638300307449152cd9262b9156aa1177103bb8), the last commit before the reorganization.

The rows are added as each folder is converted. Folders not converted yet are listed at the end.

## Repository tooling

| Before | Now | Why |
| --- | --- | --- |
| [`.travis.yml`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/.travis.yml) | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) | Travis CI no longer runs free builds for open-source projects, and the file targeted Node 12. |
| [`.tern-project`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/.tern-project), [`jsconfig.json`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/jsconfig.json) | removed | Editor settings for libraries the code never used and for a `src/` folder that did not exist. |
| [`yarn.lock`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/yarn.lock) and the dependencies in `package.json` | removed | The repository no longer has dependencies. The lockfile also pointed at a registry mirror that has shut down. |
| [`libs/swap.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/libs/swap.js) | [`shared/swap.js`](../shared/swap.js) | Same helper; it now rejects indexes outside the array. |
| [`libs/timer.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/libs/timer.js) | [`shared/measure.js`](../shared/measure.js) | Uses the high-resolution clock and returns the result instead of printing it. |
| [`libs/random-list.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/libs/random-list.js) | [`shared/random.js`](../shared/random.js) | Depended on `mockjs`, which was never installed. The new generator is seeded, so a failing input can be replayed. |
| [`nlp/parse-text-demo/`](https://github.com/L-Jovi/espresso-algorithm/tree/c0638300307449152cd9262b9156aa1177103bb8/nlp/parse-text-demo) | retired; a word-segmentation example follows | It printed the output of two libraries without implementing an algorithm, and its lockfile caused every security alert. |

## Sorting

Now in [`sorting/`](../sorting), with tests and a README.

| Before | Now | Why |
| --- | --- | --- |
| [`basic-sort/bubble-sort/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/bubble-sort/index.js) | [`sorting/bubble-sort/bubble-sort.js`](../sorting/bubble-sort/bubble-sort.js) | Exported and tested; stops early once a pass swaps nothing. |
| [`basic-sort/bubble-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/bubble-sort/index.py) | [`sorting/bubble-sort/bubble_sort.py`](../sorting/bubble-sort/bubble_sort.py) | Ported to Python 3. |
| [`basic-sort/bidirectional-bubble-sort/another.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/bidirectional-bubble-sort/another.js) | [`sorting/bidirectional-bubble-sort/shrinking-bounds.js`](../sorting/bidirectional-bubble-sort/shrinking-bounds.js) | The version that stops each pass at the last swap. |
| [`basic-sort/bidirectional-bubble-sort/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/bidirectional-bubble-sort/index.js) | [`sorting/bidirectional-bubble-sort/fixed-bounds.js`](../sorting/bidirectional-bubble-sort/fixed-bounds.js) | Kept as the counterexample: slower than plain bubble sort. |
| [`basic-sort/bidirectional-bubble-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/bidirectional-bubble-sort/index.py) | [`sorting/bidirectional-bubble-sort/fixed_bounds.py`](../sorting/bidirectional-bubble-sort/fixed_bounds.py) | Ported to Python 3. |
| [`basic-sort/selection-sort/once-swap.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/selection-sort/once-swap.js) | [`sorting/selection-sort/selection-sort.js`](../sorting/selection-sort/selection-sort.js) | The real selection sort: one swap per pass. |
| [`basic-sort/selection-sort/multiple-swap.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/selection-sort/multiple-swap.js) | [`sorting/selection-sort/exchange-sort.js`](../sorting/selection-sort/exchange-sort.js) | Renamed: swapping on every smaller item found is exchange sort. |
| [`basic-sort/selection-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/selection-sort/index.py) | [`sorting/selection-sort/exchange_sort.py`](../sorting/selection-sort/exchange_sort.py) | Renamed for the same reason. |
| [`basic-sort/insertion-sort/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/insertion-sort/index.js) | [`sorting/insertion-sort/insertion-sort.js`](../sorting/insertion-sort/insertion-sort.js) | Exported and tested. |
| [`basic-sort/insertion-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/insertion-sort/index.py) | [`sorting/insertion-sort/insertion_sort.py`](../sorting/insertion-sort/insertion_sort.py) | Fixed: the smallest item landed at index 1, so [5, 4] stayed unsorted. |
| [`basic-sort/shell-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/shell-sort/index.py) | [`sorting/shell-sort/shell_sort.py`](../sorting/shell-sort/shell_sort.py) | Ported to Python 3; a JavaScript port, shell-sort.js, is new. |
| [`basic-sort/merge-sort/split-array-in-recursion.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/merge-sort/split-array-in-recursion.js) | [`sorting/merge-sort/top-down-copying.js`](../sorting/merge-sort/top-down-copying.js) | No longer uses shift(), which slowed large inputs; now stable. |
| [`basic-sort/merge-sort/use-cursor-in-recursion.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/merge-sort/use-cursor-in-recursion.js) | [`sorting/merge-sort/top-down-indices.js`](../sorting/merge-sort/top-down-indices.js) | Fixed: an empty array recursed forever. |
| [`basic-sort/merge-sort/use-cursor-without-recursion.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/merge-sort/use-cursor-without-recursion.js) | [`sorting/merge-sort/bottom-up.js`](../sorting/merge-sort/bottom-up.js) | Fixed: appended undefined for lengths such as 5, 9 and 11. |
| [`basic-sort/merge-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/merge-sort/index.py) | [`sorting/merge-sort/top_down_copying.py`](../sorting/merge-sort/top_down_copying.py) | Ported to Python 3; now stable. |
| [`basic-sort/quick-sort/ensure-1-num-per-sort.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/quick-sort/ensure-1-num-per-sort.js) | [`sorting/quick-sort/two-way-copying.js`](../sorting/quick-sort/two-way-copying.js) | No longer removes the pivot from the caller's array. |
| [`basic-sort/quick-sort/ensure-batch-num-per-sort.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/quick-sort/ensure-batch-num-per-sort.js) | [`sorting/quick-sort/three-way-in-place.js`](../sorting/quick-sort/three-way-in-place.js) | Fixed: it recursed from index 0 instead of l, taking 22 s for 4,000 items. It now takes the middle item as the pivot. |
| [`basic-sort/quick-sort/index.py`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/quick-sort/index.py) | [`sorting/quick-sort/two_way_copying.py`](../sorting/quick-sort/two_way_copying.py) | Ported to Python 3; no longer changes the caller's list. |
| [`basic-sort/heap-sort/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/heap-sort/index.js) | [`sorting/heap-sort/heap-sort.js`](../sorting/heap-sort/heap-sort.js) | Fixed: the root was never sifted, so [1, 2] came out as [2, 1]. |
| [`basic-sort/radix-sort/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/radix-sort/index.js) | [`sorting/radix-sort/radix-sort.js`](../sorting/radix-sort/radix-sort.js) | Fixed: every pass read the original array, and negative numbers threw. |
| [`basic-sort/multiplication-table/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/basic-sort/multiplication-table/index.js) | retired | It printed the 9 × 9 multiplication table: a loop exercise, not a sort. |

## Data structures and searching

Now in [`data-structures/`](../data-structures) and [`searching/`](../searching), with tests and READMEs. The old Chinese README became [the Chinese mirror](../data-structures/README.zh-Hans.md) of the new one.

| Before | Now | Why |
| --- | --- | --- |
| [`data-structure/stack.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/stack.js) | [`data-structures/stack/stack.js`](../data-structures/stack/stack.js) | Fixed: ArrayStack ignored the pushed value and pop returned nothing. |
| [`data-structure/queue/queue.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/queue/queue.js) | [`data-structures/queue/queue.js`](../data-structures/queue/queue.js) | A class with a private array; unchanged behaviour. |
| [`data-structure/queue/circular-queue.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/queue/circular-queue.js) | [`data-structures/queue/circular-queue.js`](../data-structures/queue/circular-queue.js) | Fixed: the indexes never wrapped, so the array grew with every item. Methods renamed to match Queue (enqueue, dequeue, front). |
| [`data-structure/queue/priority-queue.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/queue/priority-queue.js) | [`data-structures/queue/priority-queue.js`](../data-structures/queue/priority-queue.js) | Same sorted-array design; enqueue(value, priority) now matches the new heap version. |
| new | [`data-structures/queue/binary-heap-priority-queue.js`](../data-structures/queue/binary-heap-priority-queue.js) | New: the same interface on a binary heap, O(log n). |
| [`data-structure/linked-list/linked-list.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/linked-list/linked-list.js) | [`data-structures/linked-list/linked-list.js`](../data-structures/linked-list/linked-list.js) | Fixed: out-of-range indexes crashed, and indexOf("3") found 3. |
| [`data-structure/linked-list/doubly-linked-list.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/linked-list/doubly-linked-list.js) | [`data-structures/linked-list/doubly-linked-list.js`](../data-structures/linked-list/doubly-linked-list.js) | Completed: only addAt existed, and it threw on first use. |
| [`data-structure/linked-list/reverse-linked-list.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/linked-list/reverse-linked-list.js) | [`data-structures/linked-list/reverse-linked-list.js`](../data-structures/linked-list/reverse-linked-list.js) | Exported and tested. |
| [`data-structure/set.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/set.js) | [`data-structures/set/set.js`](../data-structures/set/set.js) | Fixed: union always threw; NaN could be added twice; values() exposed the internal array. |
| [`data-structure/hash-table/hash-table.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/hash-table/hash-table.js) | [`data-structures/hash-table/hash-table.js`](../data-structures/hash-table/hash-table.js) | Fixed: keys sharing a bucket could not be removed. The original sum hash stays as sumHash next to a polynomial hash. |
| [`data-structure/tree/bst.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/tree/bst.js) | [`data-structures/tree/binary-search-tree.js`](../data-structures/tree/binary-search-tree.js) | Fixed: removing the root did nothing. add is a loop now; inOrder is new. |
| [`data-structure/tree/trie.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/tree/trie.js) | [`data-structures/tree/trie.js`](../data-structures/tree/trie.js) | Fixed: a typo made isWord throw. print became words(); startsWith is new. |
| [`data-structure/tree/binary-tree-array.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/tree/binary-tree-array.js) | [`data-structures/tree/binary-tree-array.js`](../data-structures/tree/binary-tree-array.js) | Fixed: tree to array dropped the nulls, so it was not the inverse. Nodes use val, as on LeetCode. |
| [`data-structure/tree/total-nodes.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/tree/total-nodes.js) | [`data-structures/tree/count-nodes.js`](../data-structures/tree/count-nodes.js) | Renamed; exported and tested. |
| [`data-structure/graph.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/graph.js) | [`data-structures/graph/bfs.js`](../data-structures/graph/bfs.js) | Returns an array of distances; the queue no longer uses shift(). |
| [`data-structure/fib.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/data-structure/fib.js) | retired | Retired: it repeated two approaches of leetcode/509-fibonacci-number. |
| [`leetcode/kmp.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/kmp.js) | [`searching/kmp/kmp.js`](../searching/kmp/kmp.js) | Completed: the function body was empty. |
| new | [`searching/binary-search/binary-search.js`](../searching/binary-search/binary-search.js) | New, written for this repository, with lowerBound. |
| new | [`searching/binary-search/BinarySearch.java`](../searching/binary-search/BinarySearch.java) | New: replaces the GPL textbook copy removed from history. |

## Classic problems

Still in [`problems/`](../problems), now with tests and a README.

| Before | Now | Why |
| --- | --- | --- |
| [`problems/adding-large-numbers/index.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/adding-large-numbers/index.js) | [`problems/adding-large-numbers/digit-by-digit.js`](../problems/adding-large-numbers/digit-by-digit.js) | Now validates its input (it produced "NaN8" for "-5" + "3") and strips leading zeros. |
| [`problems/array-deduplication/extra-array.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/array-deduplication/extra-array.js) | [`problems/array-deduplication/extra-array.js`](../problems/array-deduplication/extra-array.js) | Exported and tested; the NaN behaviour of indexOf is now documented. |
| [`problems/array-deduplication/sort-first.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/array-deduplication/sort-first.js) | [`problems/array-deduplication/sort-first.js`](../problems/array-deduplication/sort-first.js) | Fixed: it sorted the caller's array as strings, so 10 came before 9. |
| [`problems/array-deduplication/set.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/array-deduplication/set.js) | [`problems/array-deduplication/set.js`](../problems/array-deduplication/set.js) | Exported and tested. |
| [`problems/knapsack-0-1/knapsack.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/knapsack-0-1/knapsack.js) | [`problems/knapsack-0-1/brute-force.js`](../problems/knapsack-0-1/brute-force.js) | Fixed: items of weight 0 were ignored once the bag was full. Its table version moved to recursion-to-table.js. |
| [`problems/knapsack-0-1/dp.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/knapsack-0-1/dp.js) | [`problems/knapsack-0-1/tabulation.js`](../problems/knapsack-0-1/tabulation.js) | Fixed the same weight-0 case; the commented-out unbounded version is described in the README instead. |
| [`problems/max-number-in-array/recursion.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/max-number-in-array/recursion.js) | [`problems/max-number-in-array/divide-and-conquer.js`](../problems/max-number-in-array/divide-and-conquer.js) | Fixed: an empty array recursed forever; it now returns -Infinity like Math.max(). |
| [`problems/netherlands-flag/quick-sort.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/netherlands-flag/quick-sort.js) | [`problems/dutch-national-flag/partition.js`](../problems/dutch-national-flag/partition.js) | Only the partition stays here; the quick sort around it is sorting/quick-sort/three-way-in-place.js. |
| [`problems/sum-left-smaller-num-in-array/recursion.js`](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/problems/sum-left-smaller-num-in-array/recursion.js) | [`problems/small-sum/merge-sort.js`](../problems/small-sum/merge-sort.js) | No longer sorts the caller's array; a brute-force version is added as the reference. |
| [`problems/fibonacci-sequence/`](https://github.com/L-Jovi/espresso-algorithm/tree/c0638300307449152cd9262b9156aa1177103bb8/problems/fibonacci-sequence/) | retired | Retired: the four files were identical to the ones in leetcode/509-fibonacci-number. |

## Removed from the whole history

These were removed from every commit on 2026-09-28, so there is nothing to link to.

| Before | Why |
| --- | --- |
| `problems/eggs-hunt/` | An interview question that belongs to the company that asked it. |
| `libs/algs4.jar` | The GPL-3.0 library of the textbook *Algorithms, 4th Edition*. Nothing in the repository ran it, and it made up 83% of the bytes in the repository's files. Download it from [algs4.cs.princeton.edu](https://algs4.cs.princeton.edu/code/) if you need it. |
| `data-structure/binary-search/BinarySearch.java` | A verbatim copy of the same textbook's GPL-3.0 source. A binary search written for this repository replaces it. |

## Not converted yet

`algorithm-canvas/` and `leetcode/` still have their old layout. Their rows appear here as each one is converted.
