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

## Removed from the whole history

These were removed from every commit on 2026-09-28, so there is nothing to link to.

| Before | Why |
| --- | --- |
| `problems/eggs-hunt/` | An interview question that belongs to the company that asked it. |
| `libs/algs4.jar` | The GPL-3.0 library of the textbook *Algorithms, 4th Edition*. Nothing in the repository ran it, and it made up 83% of the bytes in the repository's files. Download it from [algs4.cs.princeton.edu](https://algs4.cs.princeton.edu/code/) if you need it. |
| `data-structure/binary-search/BinarySearch.java` | A verbatim copy of the same textbook's GPL-3.0 source. A binary search written for this repository replaces it. |

## Not converted yet

`algorithm-canvas/`, `data-structure/`, `leetcode/` and `problems/` still have their old layout. Their rows appear here as each one is converted.
