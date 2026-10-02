# Searching

English | [简体中文](README.zh-Hans.md)

Find a number in sorted data, or a word in a text, without looking at everything.

## Try it

```sh
node searching/binary-search/binary-search.js      # binary search and lower bound
java searching/binary-search/BinarySearch.java     # the same search in Java, with a self-check
node searching/kmp/kmp.js                          # KMP string search
```

The KMP example prints the answers that the unfinished first version of the file left as questions:

```text
strStr("mississippi", "issip"): 4
strStr("aaacaaab", "aaab"):     4
strStr("aaaaaaab", "aaab"):     4
prefix function of "aabaaab":   0 1 0 1 2 2 3
```

## What's inside

| Algorithm | Idea in one line | Time | Files |
| --- | --- | --- | --- |
| Binary search | Compare with the middle item and drop the half that cannot hold the target | O(log n) | [`binary-search.js`](binary-search/binary-search.js), [`BinarySearch.java`](binary-search/BinarySearch.java) |
| Lower bound | The first position whose item is not smaller than the target | O(log n) | [`binary-search.js`](binary-search/binary-search.js) |
| KMP string search | After a mismatch, reuse what already matched instead of rereading the text | O(n + m) | [`kmp.js`](kmp/kmp.js) |

## How it works

**Binary search** keeps a range `[lo, hi]` that must contain the target if the target is present, and halves it at every step: an array of a million items needs at most 20 comparisons. `lowerBound` answers "where would it go?", which is what you need when the target may be missing, for example to insert a value while keeping an array sorted.

**KMP** first computes the prefix function of the pattern: for every prefix, the length of the longest proper prefix that is also a suffix. For `"aabaaab"` that is `0 1 0 1 2 2 3`. When a character of the text does not match, the prefix function says how much of the pattern still matches the characters just read, so the search shifts the pattern and never moves backwards in the text. [LeetCode 28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) asks exactly this question.

## Then and now

- **A famous overflow.** For decades, textbook binary searches computed the middle as `(lo + hi) / 2`. With fixed-size integers the sum overflows once an array holds more than about a billion items. Joshua Bloch [found this bug in the JDK's own `Arrays.binarySearch`](https://research.google/blog/extra-extra-read-all-about-it-nearly-all-binary-searches-and-mergesorts-are-broken/) in 2006, nine years after he wrote it; the fix computes `lo + (hi - lo) / 2`, as both files here do.
- **Built-ins.** JavaScript has no binary search for arrays: `indexOf`, `includes` and `find` all scan from the start. Python has `bisect`, Java has `Arrays.binarySearch`. For text, `String.prototype.indexOf` is what you use; KMP is how to guarantee linear time by hand.
- **This folder's history.** The first binary search in this repository was a verbatim copy of `BinarySearch.java` from the textbook *Algorithms, 4th Edition* (GPL-3.0), together with the textbook's library jar. Both were removed from the history; the book and [its website](https://algs4.cs.princeton.edu/11model/) remain an excellent place to learn this. The KMP file was an empty function with example calls; it is now complete.

## Limits

JavaScript uses `lo + Math.floor((hi - lo) / 2)`. A bitwise shift such as `>> 1` first truncates to a signed 32-bit integer and can produce a negative midpoint when the index span reaches 2³¹. The regression test uses a virtual sorted array with those indexes, without allocating billions of values.

- Binary search needs input sorted by the same comparator it is given; on unsorted input the answer is meaningless.
- When the target appears several times, `binarySearch` returns one of the positions, not necessarily the first; `lowerBound` gives the first.
- KMP compares UTF-16 code units, like `indexOf`, not user-perceived characters.
- Other string-search algorithms (Boyer–Moore, Rabin–Karp) are not included.

## Checks and credits

- [`searching.test.js`](searching.test.js) compares binary search and lower bound with a linear scan on 2,000 random sorted arrays with duplicates, and KMP with `indexOf` on 5,000 random texts over a two-letter alphabet, where partial matches are frequent.
- [`BinarySearch.java`](binary-search/BinarySearch.java) checks itself against a linear scan on 10,000 random arrays when run.
- The first version of the KMP file pointed at labuladong's article that builds KMP as a state machine with dynamic programming. That page now returns 404, and as of 2026-09-30 the notes' new site, [labuladong.online](https://labuladong.online/zh/algo/), has no KMP article; the file here uses the prefix-function form of the same algorithm.
- MIT license, like the rest of the repository.
