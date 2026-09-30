# Then and now

English | [简体中文](then-and-now.zh-Hans.md)

The code here was first written between 2018 and 2022. This page follows what has changed since then in the languages, the tools and the sites the solutions came from, and why the older versions are still worth reading. Each section README has a short "Then and now" of its own; this is the whole story in one place.

## Sorting became stable, and can leave the input alone

- **Then.** A JavaScript engine could sort equal items in any order. Sorting records first by one field and then by another could scramble the first order.
- **What changed.** V8 7.0 (2018) replaced its sort with TimSort, which is stable ([V8 blog](https://v8.dev/blog/array-sort)), and ECMAScript 2019 made stability a requirement for every engine ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sort_stability)). Python has sorted with Timsort for much longer; Python 3.11 changed how it merges runs to the strategy of Munro and Wild's Powersort ([changelog, bpo-34561](https://docs.python.org/3/whatsnew/changelog.html)).
- **Now.** `toSorted()` (ES2023) returns a sorted copy ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)), so a solution no longer has to rearrange the caller's array. Five old LeetCode solutions did; they sort copies now.
- **Still worth writing by hand.** [`sorting/`](../sorting/) shows why stability matters, what a merge does, and why quick sort needs a good pivot. The tests check every sort against the built-in one.

## Lookup tables became maps

- **Then.** A plain object was the usual hash table in JavaScript.
- **What changed.** `Map` (ES2015) holds only the keys put into it. A plain object also answers for everything it inherits from `Object.prototype`, so the old versions of LeetCode 30, 811 and 1297 miscounted words such as `"constructor"` ([MDN: objects vs. maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps)).
- **Now.** Every table in this repository is a `Map`. ES2025 adds set operations such as `union` and `intersection` to `Set`, Baseline since 2024 ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/union)); [`data-structures/`](../data-structures/) compares its hand-written set with them.

## Numbers grew beyond 2⁵³

- **Then.** JavaScript numbers are exact integers only up to 2⁵³, so adding large numbers meant adding strings digit by digit.
- **What changed.** `BigInt` (ES2020) holds integers of any size ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)).
- **Now.** The tests of [`problems/adding-large-numbers`](../problems/adding-large-numbers/) check the digit-by-digit addition against `BigInt`, and the fast-doubling Fibonacci of [LeetCode 509](../leetcode/0509-fibonacci-number/) computes F(1000), 209 digits, exactly when written with `BigInt`.

## Watching code without changing it

- **Then.** The first sort visualizer here carried its own copies of the sorts, written to report their steps.
- **What changed.** `Proxy` (ES2015) can stand in front of an array and see every read and write by index ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)).
- **Now.** [The visualizer](../visualizer/) runs the same functions that the tests check and replays what the `Proxy` recorded.

## Chinese text no longer needs a native module

- **Then.** The first word-segmentation example called `nodejieba`, a native Node module around the jieba segmenter, and had to add 圣女果 (cherry tomato) to its dictionary by hand.
- **What changed.** `Intl.Segmenter` finds word boundaries with the ICU library built into JavaScript engines; it became Baseline on 2024-04-16, once Firefox 125 shipped it ([web.dev](https://web.dev/blog/intl-segmenter)).
- **Now.** [`nlp/`](../nlp/) writes two segmentation algorithms out and compares them with `Intl.Segmenter`. With ICU 78.3 it still splits 圣女果 into 圣女 · 果: a built-in dictionary cannot be taught new words.

## The tools around the code

- **Tests.** The first version had no tests, and its random inputs came from `mockjs`, which was never installed. Node's built-in test runner became stable in Node 20 ([announcement](https://nodejs.org/en/blog/announcements/v20-release-announce)); every test here uses `node:test` on seeded random inputs, so a failing input can be replayed.
- **Examples in modules.** `import.meta.main` (Node 24.2.0 and 22.18.0, [docs](https://nodejs.org/api/esm.html)) tells a module whether it was run directly, so every file can print an example when run and stay silent when a test imports it.
- **Continuous integration.** The repository first used Travis CI. In November 2020 Travis moved public repositories without a paid plan to a free trial with a limited allotment of credits ([Travis CI blog](https://blog.travis-ci.com/2020-11-02-travis-ci-new-billing)). CI now runs on GitHub Actions, and also tests the site in Chrome, Firefox and Safari.
- **Dependencies.** The old lockfile pointed at `registry.npm.taobao.org`, which answers with an expired TLS certificate (checked 2026-09-30). The repository no longer has dependencies at all.
- **Java.** Since Java 11, `java File.java` runs a single source file without compiling it first ([JEP 330](https://openjdk.org/jeps/330)); the Java files here run that way and check their own answers.

## The sites the solutions came from

- As of 2026-09-30, `leetcode-cn.com` redirects to `leetcode.cn`, and the old `/solution/<name>/` addresses redirect to `/solutions/<id>/<name>/`. LeetCode 28, once "Implement strStr()", is now "Find the Index of the First Occurrence in a String".
- labuladong's algorithm notes moved from `labuladong.github.io`, whose old pages now return 404, to [labuladong.online](https://labuladong.online/zh/algo/). The headers link the new addresses; each was checked on 2026-09-30.
