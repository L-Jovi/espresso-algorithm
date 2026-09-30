# 5. Longest Palindromic Substring

English | [简体中文](README.zh-Hans.md)

The longest piece of a string that reads the same backwards: a table of every substring, then growing outwards from every center. [The problem on LeetCode.](https://leetcode.com/problems/longest-palindromic-substring/)

## Try it

```sh
node leetcode/0005-longest-palindromic-substring/tabulation.js              # aba
node leetcode/0005-longest-palindromic-substring/expand-around-center.js    # bab
node --test leetcode/0005-longest-palindromic-substring/solution.test.js
```

Both answers are right: "babad" has two longest palindromes, and either may be returned.

## Approaches, slowest first

| File | Time | Space | What changes | 2,000 letters |
| --- | --- | --- | --- | --- |
| [`tabulation.js`](tabulation.js) | O(n²) | O(n²) | Records, for every substring, whether it is a palindrome. | 32 ms |
| [`expand-around-center.js`](expand-around-center.js) | O(n²) | O(1) | Grows from each of the 2n − 1 centers and stops at the first mismatch. | 0.10 ms |

The input is random text over "a" and "b". Times: `npm run bench:leetcode` on 2026-09-30, Node 24.20.0, macOS 15.7 on an Apple silicon (arm64) Mac, the fastest of three runs. Compare the rows; the numbers themselves depend on the machine.

## How it works

A substring is a palindrome when its two ends match and the part between them is one. The table uses exactly that rule and fills in all n²/2 substrings, whatever the text looks like. Expanding around a center uses the same fact the other way: start from the middle, one character for odd lengths or the gap between two for even lengths, and grow while the ends match. On most text the growth stops after a step or two, which is why it is about 300 times faster here, although both are O(n²) in the worst case, a text such as "aaaa…a".

## Then and now

- **This folder's history.** [The old expand-around-center version](https://github.com/L-Jovi/espresso-algorithm/blob/c0638300307449152cd9262b9156aa1177103bb8/leetcode/5-longest-palindromic-substring/expand-around-center.js) wrote `let start = end = 0`, which declares only `start` and makes `end` a global variable; in a module, which runs in strict mode, that line throws. The table version was called `dynamic-planning.js`.

## Limits

- Manacher's algorithm finds the answer in O(n); it is not included.
- The strings are compared by UTF-16 code units, like everything else in JavaScript strings, not by the characters a reader sees.

## Checks and credits

- [`solution.test.js`](solution.test.js) runs both on the examples and checks, on 1,000 random strings, that each returns a palindrome as long as the longest one found by trying every substring: 11 checks.
- MIT license, like the rest of the repository.
