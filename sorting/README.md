# Sorting

English | [简体中文](README.zh-Hans.md)

Fourteen ways to put numbers in order, from bubble sort to radix sort, all checked against the built-in sort on the same inputs.

## Try it

```sh
node sorting/quick-sort/three-way-in-place.js   # sort 12 random numbers
npm run bench                                    # race every sort on 1,000 to 100,000 numbers
npm test                                         # check every sort (and the rest of the repository)
```

The first command prints the same input every time, because the random numbers are seeded:

```text
input:  -98 -88 96 40 4 -19 -7 -52 11 46 -49 -69
sorted: -98 -88 -69 -52 -49 -19 -7 4 11 40 46 96
```

To watch twelve of these sorts move, one read or write at a time, open the [sort visualizer](https://l-jovi.github.io/espresso-algorithm/visualizer/).

## What's inside

| Algorithm | Idea in one line | Time: average / worst | Extra space | Stable | Files |
| --- | --- | --- | --- | --- | --- |
| Bubble sort | Swap out-of-order neighbours until a pass swaps nothing | O(n²) / O(n²), O(n) if already sorted | O(1) | yes | [`bubble-sort.js`](bubble-sort/bubble-sort.js), [`bubble_sort.py`](bubble-sort/bubble_sort.py) |
| Bidirectional bubble sort | Bubble to the right, then to the left; stop each pass at the last swap | O(n²) / O(n²) | O(1) | yes | [`shrinking-bounds.js`](bidirectional-bubble-sort/shrinking-bounds.js), [`fixed-bounds.js`](bidirectional-bubble-sort/fixed-bounds.js), [`fixed_bounds.py`](bidirectional-bubble-sort/fixed_bounds.py) |
| Selection sort | Swap the smallest remaining item to the front | O(n²) / O(n²) | O(1) | no | [`selection-sort.js`](selection-sort/selection-sort.js) |
| Exchange sort | Swap whenever a later item is smaller | O(n²) / O(n²) | O(1) | no | [`exchange-sort.js`](selection-sort/exchange-sort.js), [`exchange_sort.py`](selection-sort/exchange_sort.py) |
| Insertion sort | Insert each item into the sorted part on its left | O(n²) / O(n²), O(n) if already sorted | O(1) | yes | [`insertion-sort.js`](insertion-sort/insertion-sort.js), [`insertion_sort.py`](insertion-sort/insertion_sort.py) |
| Shell sort | Insertion sort on items that are a gap apart, with a shrinking gap | depends on the gaps / O(n²) | O(1) | no | [`shell-sort.js`](shell-sort/shell-sort.js), [`shell_sort.py`](shell-sort/shell_sort.py) |
| Merge sort | Sort each half, then merge the two sorted halves | O(n log n) / O(n log n) | O(n) | yes | [`top-down-copying.js`](merge-sort/top-down-copying.js), [`top-down-indices.js`](merge-sort/top-down-indices.js), [`bottom-up.js`](merge-sort/bottom-up.js), [`merge.js`](merge-sort/merge.js), [`top_down_copying.py`](merge-sort/top_down_copying.py) |
| Quick sort | Split around a pivot, then sort each side | O(n log n) / O(n²) | O(log n) in place, O(n) copying | no | [`two-way-copying.js`](quick-sort/two-way-copying.js), [`three-way-in-place.js`](quick-sort/three-way-in-place.js), [`two_way_copying.py`](quick-sort/two_way_copying.py) |
| Heap sort | Build a max-heap, then move the maximum to the end, again and again | O(n log n) / O(n log n) | O(1) | no | [`heap-sort.js`](heap-sort/heap-sort.js) |
| Radix sort | Bucket the numbers by each digit, lowest digit first | O(d · (n + 10)) for d digits | O(n) | yes | [`radix-sort.js`](radix-sort/radix-sort.js) |

A sort is **stable** when equal items keep their original order. That matters when you sort records by one field and then by another: a stable second sort keeps the first order among ties.

## How it works

Each file starts with a comment that explains its idea and why it works. A good reading order:

1. **Bubble, insertion, selection.** Each keeps a part of the array that is already in place and grows it by one item per pass, which costs O(n²).
2. **Merge sort**, starting with `top-down-copying.js`, then `top-down-indices.js` and `bottom-up.js`: the same idea as recursion on copies, recursion on index ranges, and a loop with no recursion at all.
3. **Quick sort**, starting with `two-way-copying.js`, then `three-way-in-place.js`.
4. **Heap sort** and **radix sort**: a tree hidden inside the array, and a sort that never compares two numbers.

Several folders keep two versions on purpose, because the difference is the lesson:

- **Shaker sort with fixed bounds vs. shrinking bounds.** Going both ways only pays off if each pass stops where the last swap happened. Without that, the fixed version was about 1.7 times slower than plain bubble sort in the race below.
- **Selection sort vs. exchange sort.** The same comparisons, but one swap per pass instead of one per smaller item found.
- **Two-way vs. three-way quick sort.** Putting every item equal to the pivot on one side makes an array of identical values the worst case. The three-way version places them all at once.

### The race

`npm run bench`, on 2026-09-28 with Node 24.20.0 on an Apple M4 Max (milliseconds, best of three runs). Timings depend on the machine; compare rows, not absolute numbers.

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

Ten times more items make the O(n²) sorts about 100 times slower (1,000 → 10,000), while the O(n log n) sorts get only about 10 to 12 times slower (10,000 → 100,000).

## Then and now

- **The engines.** Until 2018, V8 (the engine in Chrome and Node.js) sorted arrays of more than 10 items with an unstable quick sort. [V8 7.0 switched `Array.prototype.sort` to TimSort](https://v8.dev/blog/array-sort), a stable mix of merge sort and insertion sort, and since ES2019 the language specification requires every engine's sort to be stable.
- **Python** has used TimSort since version 2.3. [Python 3.11 replaced its merge strategy](https://www.wild-inter.net/posts/powersort-in-python-3.11) with the one from Powersort, which is provably close to optimal.
- **Copies instead of changes.** ES2023 added [`toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted), which returns a sorted copy and leaves the array alone, the way `top-down-copying.js` behaves.
- **What writing them by hand still teaches.** Library sorts are built from these pieces: TimSort is insertion sort on short runs plus merges. In the race above, the built-in sort with a comparator was not the fastest for plain integers. It is built for any comparator and guaranteed stable, which costs time.

## Limits

- The comparison sorts take any comparator; radix sort accepts safe integers only.
- The pivot is always the middle item. Crafted inputs can still force O(n²); a random pivot would make the expected time O(n log n) for every input.
- The two-way quick sort recurses once per item on an array of identical values, and overflows the call stack at about 5,500 of them (Node 24, default stack size). The three-way version exists to fix that.
- None of the tricks production sorts use: switching to insertion sort for short ranges, detecting runs that are already sorted, or galloping merges.
- Python versions exist for seven of the sorts.

## Checks and credits

- [`sorting.test.js`](sorting.test.js) runs every JavaScript sort on the same small inputs, including every input that broke an earlier version, and on 1,000 seeded random arrays compared with the built-in sort. It also checks stability, comparators, whether the input is changed, and 20,000-item inputs for the fast sorts.
- [`test_sorting.py`](test_sorting.py) does the same for the Python versions against `sorted()`.
- Heap sort follows [this article](https://www.cnblogs.com/chengxiao/p/6129630.html); radix sort follows [this one](https://segmentfault.com/a/1190000021342923).
- MIT license, like the rest of the repository.
