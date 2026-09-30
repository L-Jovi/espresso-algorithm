# 752. Open the Lock

English | [简体中文](README.zh-Hans.md)

The fewest turns to open a four-wheel lock without passing through a forbidden code: a search from the start, then a search from both ends that meets in the middle. [The problem on LeetCode.](https://leetcode.com/problems/open-the-lock/)

## Try it

```sh
node leetcode/0752-open-the-lock/bfs.js                  # 6
node leetcode/0752-open-the-lock/bidirectional-bfs.js    # 6
node --test leetcode/0752-open-the-lock/solution.test.js
```

## Approaches, slowest first

| File | Time | Space | What changes | target "8888" |
| --- | --- | --- | --- | --- |
| [`bfs.js`](bfs.js) | O(10⁴ · 8) | O(10⁴) | Visits the codes level by level, in order of distance from "0000". | 3.98 ms |
| [`bidirectional-bfs.js`](bidirectional-bfs.js) | O(10⁴ · 8) | O(10⁴) | Grows a search from each end, in turns, and stops where they meet. | 0.49 ms |

The dead ends are 0001, 0010, 0100, 1000, 9999, 8889, 8898 and 8988. Times: `npm run bench:leetcode` on 2026-09-30, Node 24.20.0, macOS 15.7 on an Apple silicon (arm64) Mac, the fastest of three runs. Compare the rows; the numbers themselves depend on the machine.

## How it works

Every code is a node with eight neighbors, one turn of one wheel up or down. Breadth-first search visits the codes in order of distance, so the first time it reaches the target, it has found the fewest turns. A search d levels deep can touch up to about 8^d codes; two searches of d/2 levels each touch about 2 · 8^(d/2), far fewer, which is where the bidirectional search saves its time.

One detail decides whether the bidirectional search is right: a code is marked as visited when it is expanded, not when it is added to a side's set. Marking it earlier stops the other side from ever adding that code, so the two searches can pass each other without meeting; that variant gave wrong answers for 299 of 300 random locks (measured).

## Then and now

- **This folder's history.** [The old BFS](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/752-open-the-lock/breadth-first.js) looked up every code in the list of dead ends with `indexOf`, a scan of the whole list, and took codes from its queue with `shift()`, which moves every remaining item. A `Set` answers the first question in O(1), and reading the queue level by level removes the second.

## Limits

- The sides simply take turns. Always growing the smaller side is a known refinement that is not included.

## Checks and credits

- [`solution.test.js`](solution.test.js) runs both on the examples, checks them without dead ends against the sum of each wheel's shorter way round, and compares them on 300 random locks: 12 checks.
- Learning source: [labuladong's BFS framework](https://labuladong.online/zh/algo/essential-technique/bfs-framework/).
- MIT license, like the rest of the repository.
