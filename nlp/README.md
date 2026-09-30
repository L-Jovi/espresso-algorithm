# Chinese word segmentation

English | [简体中文](README.zh-Hans.md)

Chinese is written without spaces, so a program has to find where each word begins and ends before it can count, search or translate them. Here are two hand-written segmenters that use a word list, compared with the one built into JavaScript.

## Try it

```sh
node nlp/word-segmentation/compare.js                     # every example sentence, segmented three ways
node nlp/word-segmentation/dag-dp.js                      # the two ambiguous sentences, read correctly
node --test nlp/word-segmentation/segmentation.test.js
```

Part of what the comparison prints:

```text
十五 个葡萄在这周六过期
  forward max match ≠ 十五 · 个 · 葡萄 · 在 · 这周 · 六 · 过期
  graph + DP          十五 · 个 · 葡萄 · 在 · 这 · 周六 · 过期
  Intl.Segmenter      十五 · 个 · 葡萄 · 在 · 这 · 周六 · 过期

结婚的和尚未结婚的
  forward max match ≠ 结婚 · 的 · 和尚 · 未 · 结婚 · 的
  graph + DP          结婚 · 的 · 和 · 尚未 · 结婚 · 的
  Intl.Segmenter      结婚 · 的 · 和 · 尚未 · 结婚 · 的
```

## What's inside

| Segmenter | Idea in one line | Time | File |
| --- | --- | --- | --- |
| Forward maximum matching | Take the longest known word at each position | O(n · L) | [`forward-max-match.js`](word-segmentation/forward-max-match.js) |
| Graph + dynamic programming | Take the most likely path through all candidate words | O(n · L) | [`dag-dp.js`](word-segmentation/dag-dp.js) |
| `Intl.Segmenter` | Ask ICU, the Unicode library inside the JavaScript engine | O(n) | [`intl-segmenter.js`](word-segmentation/intl-segmenter.js) |

n is the length of the text and L the length of the longest word in the list. [`dictionary.js`](word-segmentation/dictionary.js) holds the word list with made-up frequencies, [`sentences.js`](word-segmentation/sentences.js) the examples, and [`compare.js`](word-segmentation/compare.js) prints the three side by side.

## How it works

**Forward maximum matching** reads from the left and always takes the longest word it knows. It is quick and simple, but greedy. In 这周六 (this Saturday) it takes 这周 (this week) and is left with 六 (six); in 结婚的和尚未结婚的 (the married and the not yet married) it takes 和尚 (monk) instead of 和 · 尚未 (and · not yet).

**Graph plus dynamic programming** looks at every way to split the text at once. Each candidate word is an edge from its first character to the one after its last, so each split is a path through the graph. A word's probability is its frequency over the total, and a path is as likely as the product of its words' probabilities. Working backwards from the end of the text, dynamic programming keeps the best score of the text from each position on, so it finds the most likely path without listing every path. Logarithms turn the product into a sum. Because 和 and 尚未 are both much more common than 和尚 and 未, the correct reading wins.

**Numbers.** Digits and Latin letters are split off before segmenting, so 2023 stays whole. A run of Chinese numerals such as 二零二三 becomes one extra candidate word, since no word list can hold every number; it is only a candidate, so a word such as 一直 (always) still wins where it fits.

## Then and now

- **The first version of this folder**, [`nlp/parse-text-demo`](https://github.com/L-Jovi/espresso-algorithm/tree/c0638300307449152cd9262b9156aa1177103bb8/nlp/parse-text-demo), called two libraries: `nodejieba`, a native Node module around [jieba](https://github.com/fxsjy/jieba), and Microsoft's Recognizers-Text, for numbers and dates. It implemented no algorithm, its dependencies were never installed, and its lockfile set off the repository's security alerts. This folder writes the algorithm out instead.
- **`Intl.Segmenter`** has shipped in every major browser since Firefox 125: Chrome and Edge 87, Safari 14.1, Firefox 125; it became Baseline on 2024-04-16 ([web.dev](https://web.dev/blog/intl-segmenter)). It needs no word list from us, but its answers come with the ICU version and cannot be tuned. With ICU 78.3, in Node 24.20, it splits 圣女果 (cherry tomato) into 圣女 · 果, the very word the first version had to add to jieba by hand, and it also splits 猕猴桃 (kiwi fruit) into three characters and 二零二三年 into 二 · 零 · 二 · 三年 (measured on 2026-09-30).

## Limits

- The word list covers the example sentences and not much more, and its frequencies are invented. A real segmenter learns them from a large body of text.
- jieba's third step is left out: a hidden Markov model that guesses words missing from the dictionary.
- The first version also recognized numbers and dates, "three eggs that expire tomorrow". That is a separate task, and it is not included.
- `Intl.Segmenter` gives different answers with different ICU versions, so its tests check only that the pieces join back into the sentence.

## Checks and credits

- [`segmentation.test.js`](word-segmentation/segmentation.test.js) checks the exact splits of both hand-written segmenters on every example sentence and where forward maximum matching goes wrong. It also checks that 圣女果 and 一直 stay whole. On random text it checks three things: the pieces join back together; the graph's split scores as high as the best of every possible split, on 500 random runs; and forward maximum matching never scores higher.
- The graph and path come from [jieba](https://github.com/fxsjy/jieba) (MIT), whose README describes the same three steps. The code here is written from that description, not copied.
- MIT license, like the rest of the repository.
