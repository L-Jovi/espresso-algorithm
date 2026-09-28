# Data structures

English | [简体中文](README.zh-Hans.md)

Stacks, queues, linked lists, sets, hash tables, trees and a graph search, built from scratch and each compared with the built-in type that does the same job today.

## Try it

```sh
node data-structures/hash-table/hash-table.js     # compare two hash functions on anagrams
node data-structures/tree/binary-search-tree.js   # remove the root of a search tree
npm test                                           # check every structure against a simple model
```

The first command shows why the choice of hash function matters. With 16 buckets, adding up character codes puts each group of anagrams (abc/bca/cab, act/cat/tac, dog/god, listen/silent/enlist) into a single bucket; the polynomial hash spreads them out:

```text
sum hash        bucket sizes: 0 0 0 0 0 0 3 0 3 0 2 0 0 0 0 3
polynomial hash bucket sizes: 1 0 2 0 1 1 2 2 0 0 0 0 2 0 0 0
```

## What's inside

| Structure | Idea in one line | Main operations | Built into JavaScript today | Files |
| --- | --- | --- | --- | --- |
| Stack | Last in, first out | push, pop, peek: O(1) | an array's `push` and `pop` | [`stack.js`](stack/stack.js) |
| Queue | First in, first out | enqueue O(1), dequeue O(n) (`shift`) | none | [`queue.js`](queue/queue.js) |
| Circular queue | A queue in an array whose ends wrap around | enqueue, dequeue: O(1) amortized | none | [`circular-queue.js`](queue/circular-queue.js) |
| Priority queue, sorted array | Keep the items sorted by priority | enqueue O(n), dequeue O(n) | none | [`priority-queue.js`](queue/priority-queue.js) |
| Priority queue, binary heap | A min-heap stored in an array | enqueue, dequeue: O(log n) | none | [`binary-heap-priority-queue.js`](queue/binary-heap-priority-queue.js) |
| Singly linked list | Nodes that point to the next node | add, indexOf, elementAt: O(n) | none | [`linked-list.js`](linked-list/linked-list.js), [`reverse-linked-list.js`](linked-list/reverse-linked-list.js) |
| Doubly linked list | Nodes that point both ways; both ends kept | at either end O(1), in the middle O(n) | none | [`doubly-linked-list.js`](linked-list/doubly-linked-list.js) |
| Set | Every element at most once | has O(n); union and friends O(n · m) | `Set`, with `union`, `intersection`, `difference`, `isSubsetOf` since ES2025 | [`set.js`](set/set.js) |
| Hash table | Hash the key to a bucket; share a bucket on collisions | add, lookup, remove: O(1) on average | `Map` | [`hash-table.js`](hash-table/hash-table.js) |
| Binary search tree | Smaller values left, larger right | O(h) for tree height h | none | [`binary-search-tree.js`](tree/binary-search-tree.js) |
| Trie | Words stored letter by letter | O(L) for a word of length L | none | [`trie.js`](tree/trie.js) |
| Tree ⇄ array | LeetCode's level-order format, and counting nodes | O(n) | none | [`binary-tree-array.js`](tree/binary-tree-array.js), [`count-nodes.js`](tree/count-nodes.js) |
| Graph search | Breadth-first search for hop counts | O(V²) on an adjacency matrix | none | [`bfs.js`](graph/bfs.js) |

## How it works

Every file starts with a comment that explains the idea and the cost of each operation. A good reading order:

1. **Stack and queue**, then the **circular queue**: moving two indexes around an array instead of moving the items.
2. **Linked lists**: pointers instead of positions, and the four links a doubly linked list must update on every change.
3. **Hash table**, then **set**: why `has` is O(1) in a `Set` and O(n) in `MySet`.
4. **Priority queues**: the same interface over a sorted array and over a heap, with very different costs.
5. **Trees**, then the **graph**.

Some pairs are kept side by side because the difference is the lesson: `Stack` (counts its items itself) and `ArrayStack` (lets an array do it), `Queue` and `CircularQueue`, the two priority queues, and the two hash functions.

## Then and now

- **ES2015** added `Map` and `Set`, hash tables built into the language. They keep insertion order, which plain objects did not guarantee for every kind of key.
- **ES2022** added private fields. The first versions here hid their state in closures (`function Queue() { const collection = [] … }`); the classes now use `#items`, which says the same thing directly. `Array.prototype.at(-1)` reads the last item.
- **ES2025** added set algebra to `Set`: [`union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf`, `isSupersetOf`, `isDisjointFrom`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), available in Node.js 22 and in every major browser since June 2024. `MySet` implements four of them by hand, and its tests check the answers against the built-in methods.
- **Still missing in JavaScript**: queues, priority queues, linked lists and balanced trees. Python ships `collections.deque` and `heapq`, and Java ships `ArrayDeque`, `PriorityQueue` and `TreeMap`.
- **What building them teaches**: the costs behind the built-ins, such as why `shift()` gets slow on long arrays, why a hash function must depend on the order of the characters, and why a tree fed sorted data degrades into a list.

## Limits

- The hash table never resizes; a real one grows as it fills up, so buckets stay short.
- The binary search tree does not rebalance. Sorted input turns it into a chain; `add` and `inOrder` are loops, but `remove` recurses once per level.
- The graph code is breadth-first search on an adjacency matrix only: no depth-first search, no weights, no adjacency lists.
- `MySet` keeps its elements in an array, so `has` scans all of them.
- None of the classes are iterable with `for … of`; use `toArray()` or `values()`.

## Checks and credits

- [`data-structures.test.js`](data-structures.test.js) drives every structure through thousands of random operations and compares it with a plain array, `Map` or `Set` after each step. It also checks `MySet` against the ES2025 `Set` methods, the anagram collisions of the sum hash, root removals in the search tree, the trie against a word list, round trips of LeetCode tree arrays, and breadth-first search distances on 300 random graphs.
- The interface list of the first versions follows [this article](https://zhuanlan.zhihu.com/p/77702278); the circular queue follows [this one](https://blog.csdn.net/fansongy/article/details/6784954); tree traversals are explained [here](https://segmentfault.com/a/1190000016226334).
- MIT license, like the rest of the repository.
