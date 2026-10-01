# Espresso Algorithm

English | [简体中文](README.zh-Hans.md)

Try different algorithms for the same problem, from brute force to optimal. Pure concentration, like an espresso.

[![CI](https://github.com/L-Jovi/espresso-algorithm/actions/workflows/ci.yml/badge.svg)](https://github.com/L-Jovi/espresso-algorithm/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Every algorithm here is a small file you can read in one sitting, next to the other ways of solving the same problem and a test that checks them against each other. Run one, race it against its neighbours, then read why the faster one is faster.

**[Open the live site →](https://espresso.jovipro.com/)**

## What's inside

| Highlight | In short |
| --- | --- |
| **Watch the sorts** | Twelve sorts replay every read and write the real code makes, captured with a `Proxy`. Race two on the same numbers. |
| **Race the solutions** | Fifteen LeetCode problems race their approaches in your browser, after a check that every approach gives LeetCode's answer. |
| **Sixty LeetCode problems** | One file per approach. Each folder's test runs every approach on the same cases, then against a slow but plainly correct reference on random inputs. |
| **From brute force to optimal** | `fib(35)` takes 29,860,703 calls by plain recursion and 69 with memoization; coin change, paint house and the longest common subsequence take the same steps. |
| **Reading Chinese** | Forward maximum matching and jieba's graph with dynamic programming, written out and compared with your browser's `Intl.Segmenter`. |
| **Nothing to install** | No dependencies: Node 22.18 or later runs the JavaScript, Python 3.11 and JDK 21 the rest. |

The collection also holds data structures from a stack to a trie, binary search and KMP, and classic problems such as the 0-1 knapsack and the Dutch national flag.

## Try it

**In your browser:** open the [live site](https://espresso.jovipro.com/): [watch the sorts](https://espresso.jovipro.com/visualizer/), [race the solutions](https://espresso.jovipro.com/leetcode/race/) or [find the words](https://espresso.jovipro.com/nlp/word-segmentation/) in a Chinese sentence.

**On your computer:**

```sh
git clone https://github.com/L-Jovi/espresso-algorithm.git
cd espresso-algorithm
node leetcode/0509-fibonacci-number/recursion.js   # 832040, after 2,692,537 calls
npm test                                           # every JavaScript test
npm run serve                                      # the site, at http://127.0.0.1:8080/
```

There is nothing to install. `npm run bench` races the sorts and `npm run bench:leetcode` the LeetCode approaches; `npm run check` also runs the Python and Java checks.

## How to read this repository

Every section is a folder with a README in English and Chinese, and every file inside is named after its technique: `brute-force.js`, `memoization.js`, `two-pointers.js`. Each file begins with a comment that says what it solves, the idea, why it is correct and what it costs, and ends with an example that `node` prints when you run the file.

Each README follows the same order:

1. **Try it**: what to run and what you should see.
2. **What's inside**: a table of the algorithms or approaches.
3. **How it works**: the idea in plain words, and the file to start reading.
4. **Then and now**: how this was done before, and what the language offers today.
5. **Limits**: what the small version deliberately leaves out.
6. **Checks and credits**: which tests cover it, and where the ideas came from.

New to algorithms? Start with sorting. Preparing for interviews? Start with LeetCode and its ten progressions.

## Learning path

| Section | What you'll find | Start with |
| --- | --- | --- |
| [Sorting](sorting/) | Fourteen sorts from bubble to radix, several with a Python twin, and a bench that races them | bubble sort, then merge sort |
| [Searching](searching/) | Binary search and lower bound in JavaScript and Java, and KMP string search | binary search |
| [Data structures](data-structures/) | Stacks, queues, a binary heap, linked lists, a set, a hash table, trees, a trie and a graph | the queue that is a ring buffer |
| [Classic problems](problems/) | Adding large numbers, three ways to remove duplicates, the 0-1 knapsack from brute force to a table, and more | the knapsack |
| [LeetCode](leetcode/) | Sixty problems; ten have a README that walks from brute force to optimal | [509](leetcode/0509-fibonacci-number/), then [322](leetcode/0322-coin-change/) |
| [Chinese word segmentation](nlp/) | Two segmentation algorithms next to `Intl.Segmenter` | the two ambiguous sentences |
| [Sort visualizer](visualizer/) | How the site replays the real sorts | [`trace.js`](visualizer/trace.js) |

## Then and now

Most of the code was first written between 2018 and 2022. Since then sorting became stable in every JavaScript engine, `Map`, `BigInt` and `Proxy` replaced old workarounds, and `Intl.Segmenter` can find Chinese words without a native module. [Then and now](docs/then-and-now.md) tells that story, with a source for every date.

## Why "espresso"?

An espresso is the concentrated shot that most coffee starts from: a latte or a cappuccino is an espresso with milk. Among the author's coffee-named repositories, algorithms play that part, the small concentrated core the rest is built on.

The rest of the series: [latte-web](https://github.com/L-Jovi/latte-web) (the web, the everyday blend), [roaster-linux](https://github.com/L-Jovi/roaster-linux) (Linux tools, where the beans are roasted), [barista-services](https://github.com/L-Jovi/barista-services) (services, the barista) and cappuccino-ios (iOS apps, lighter than a latte; retired in 2026).

## Status

A personal learning collection maintained by [@L-Jovi](https://github.com/L-Jovi). It is not a product: there are no releases and no packages. CI checks every change: the JavaScript tests on Node 22.18, 22, 24 and 26, Python 3.11 and 3.14, Java 21 and 25, the repository checks, and the site in Chrome, Firefox and Safari, which is deployed from `main` once everything passes. [What the checks cover, and what they don't](docs/verification.md).

The repository was reorganized in September 2026. The [migration ledger](docs/migration.md) maps every old path to its new home.

## Contributing

Issues and pull requests are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and the [writing guide](docs/writing.md) first, and report security problems privately as described in [SECURITY.md](SECURITY.md). Everyone taking part follows the [code of conduct](CODE_OF_CONDUCT.md).

## License

Original code and documentation are [MIT](LICENSE). [NOTICE.md](NOTICE.md) credits the work this repository learned from.
