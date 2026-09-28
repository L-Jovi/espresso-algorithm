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

## Removed from the whole history

These were removed from every commit on 2026-09-28, so there is nothing to link to.

| Before | Why |
| --- | --- |
| `problems/eggs-hunt/` | An interview question that belongs to the company that asked it. |
| `libs/algs4.jar` | The GPL-3.0 library of the textbook *Algorithms, 4th Edition*. Nothing in the repository ran it, and it made up 83% of the bytes in the repository's files. Download it from [algs4.cs.princeton.edu](https://algs4.cs.princeton.edu/code/) if you need it. |
| `data-structure/binary-search/BinarySearch.java` | A verbatim copy of the same textbook's GPL-3.0 source. A binary search written for this repository replaces it. |

## Not converted yet

`algorithm-canvas/`, `basic-sort/`, `data-structure/`, `leetcode/` and `problems/` still have their old layout. Their rows appear here as each one is converted.
