# Writing guide

English | [简体中文](writing.zh-Hans.md)

How to write code comments and documentation in this repository. The goal: someone who knows a little programming can follow every page on the first read. The same rules are used in the sibling repository [latte-web](https://github.com/L-Jovi/latte-web).

## The shape of a section README

Each top-level folder (`sorting/`, `leetcode/` and so on) has a README with these sections, in this order:

```markdown
# <The name a reader would search for>

English | [简体中文](README.zh-Hans.md)

<One sentence: what the reader will be able to do or understand.>

## Try it

<Up to three commands, then what should appear.>

## What's inside

<A table: each item, its idea in one line, time and space complexity, files.>

## How it works

<The ideas in plain words, and which file to read first.>

## Then and now

<How this was done before, what the language offers today and since when, with a link to an official source.>

## Limits

<What these small versions deliberately leave out.>

## Checks and credits

<Which tests cover it, where the ideas came from, and the license.>
```

A README for one problem with several approaches uses the same sections, but replaces **What's inside** with a table of the approaches, slowest first, that says why each step is faster.

The Chinese mirror uses 试一试, 里面有什么, 原理, 过去与现在, 刻意省略 and 验证与来源 for the same sections.

## Ten rules

1. **Lead with what the reader gets.** "Find the pair that adds up to the target in one pass" beats "A hash-map based complement lookup".
2. **Explain a term the first time it appears**, in one short clause.
3. **Make every claim observable.** Say what the reader will see when they run it.
4. **Write to the reader, not to maintainers or agents.** Instructions such as "keep the source links" belong in [CONTRIBUTING.md](../CONTRIBUTING.md) or [AGENTS.md](../AGENTS.md).
5. **Prefer short sentences and common words.** Avoid "simply", "just", "obviously" and "trivially": they make a reader who is stuck feel worse.
6. **Date anything that ages.** Write "as of 2026-09" instead of "latest" or "modern".
7. **Only give numbers you have measured**, such as call counts, timings or test counts. Say how they were measured, and update them when the code changes.
8. **Link an official source** for history and version claims: release notes, MDN, the language's own documentation or blog.
9. **Keep code in English and formatted as code**: commands, file names, APIs and identifiers.
10. **Chinese mirrors carry the same facts in natural Chinese**, add nothing new, and start with the sync line `> 对应英文版：YYYY-MM-DD。英文版更新后本页可能滞后。`

## Rules for algorithm code

- **The file header is the explanation.** It says what the file solves, the idea in one or two sentences, why the idea is correct, and the time and space complexity.
- **Write complexity the usual way**: `O(n log n)` time, `O(1)` extra space. Name the variables when it is not obvious what `n` is, and give the worst case when it differs from the average.
- **Never copy a problem statement.** Link to the problem and describe it in one sentence of your own. Problem pages are the copyright of the site that publishes them.
- **Name a file after its technique**, using the words in the table below. A reader scanning a folder should see the approaches before opening a file.
- **Credit what shaped a solution**: an article, a book or a course, with a link, in the header comment.

## Words to use and words to avoid

| Instead of | Write |
| --- | --- |
| dynamic planning | dynamic programming |
| memory (for a cache of results) | memoization |
| dp (a bottom-up table) | tabulation |
| dp compress, no additional space | space-optimized |
| dichotomy | binary search, or doubling when the step size doubles |
| bit by bit (for decimal digits) | digit by digit |
| de-weight | remove duplicates |
| greed | greedy |
| "contract", "mechanism contract" | what it promises, or what the tests check |

## Titles

Use the name a reader would search for: "Quick sort", "Trie", "Dutch national flag". A LeetCode problem README uses the problem's number and official title, for example "322. Coin Change".
