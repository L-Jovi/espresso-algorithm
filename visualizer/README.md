# Sort visualizer

English | [简体中文](README.zh-Hans.md)

Watch twelve sorts from [`sorting/`](../sorting/) rearrange the same numbers, one read or write at a time, and race two of them side by side.

## Try it

Open [l-jovi.github.io/espresso-algorithm/visualizer](https://l-jovi.github.io/espresso-algorithm/visualizer/), or serve the repository yourself:

```sh
npm run serve                            # then open http://127.0.0.1:8080/visualizer/
node --test visualizer/visualizer.test.js
```

Race bubble sort against quick sort on 64 numbers, [this exact race](https://l-jovi.github.io/espresso-algorithm/visualizer/?sort=bubble&rival=quick&n=64&shape=random&seed=7): quick sort finishes after 2,100 steps, while bubble sort needs 10,680.

## What's inside

| File | What it does |
| --- | --- |
| [`trace.js`](trace.js) | Runs a sort on a `Proxy` of the numbers and records every read, write and comparison; `replay` rebuilds the result from the writes alone. |
| [`sorts.js`](sorts.js) | The twelve sorts that can be traced, imported from `sorting/`. |
| [`visualizer.js`](visualizer.js) | The page: builds the numbers, traces the chosen sorts, and replays the steps on a canvas. |
| [`index.html`](index.html) | The page's markup and controls. |

The visualizer is one of three pages of the site; the others race LeetCode solutions ([`leetcode/race/`](../leetcode/race/)) and segment Chinese text ([`nlp/word-segmentation/`](../nlp/word-segmentation/)). The home page is [`index.html`](../index.html) at the root. All of them share [`assets/site.css`](../assets/site.css), and [`assets/language.js`](../assets/language.js), which switches a page between English and Chinese in place.

## How it works

A sort does not know it is being watched. It receives a [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) of the numbers, an object that stands in front of the array. Its `get` and `set` traps see each access by index, write it down, and pass it on unchanged; a counting comparator records the comparisons. Before you press Play, the page has already run the sort once this way. Playing replays the record: a read lights up a bar, and a write changes its height.

Racing two sorts gives both the same number of steps per second, so the one that needs fewer operations wins. A step is one read, one write or one comparison.

Only sorts that rearrange the array they are given can be traced. The copying merge sort and the copying quick sort build new arrays and return those, so there are no writes to replay; they are left out.

## Then and now

- **The first visualizer**, [`algorithm-canvas/`](https://github.com/L-Jovi/espresso-algorithm/tree/c0638300307449152cd9262b9156aa1177103bb8/algorithm-canvas), was a copy of norahiko's [sort-visualize](https://github.com/norahiko/sort-visualize), built on the Knockout framework, and animated its own copies of the sorts. It could not be used with the keyboard, and its canvas was blurry on high-density screens. This one is written from scratch, draws each bar at the screen's pixel density, and shows the repository's own code; [NOTICE.md](../NOTICE.md) credits the original.
- **`Proxy`** arrived with ES2015. Before it, watching every index of an array took a separate accessor for each index, and the first version here carried its own copies of the sorts, written to report their steps. Now the same function runs unchanged in the tests, in `npm run bench` and here.

## Limits

- Merge sort writes into a separate buffer first; only the copy back into the array is drawn, so the merging itself shows up as reads.
- Steps are counted, not timed: the race shows which sort does less work, not how long it takes on a real machine. `npm run bench` measures that.
- Up to 128 numbers, so that each bar stays visible.

## Checks and credits

- [`visualizer.test.js`](visualizer.test.js) checks that `trace` records reads and writes by index, and that for every one of the twelve sorts, replaying the writes rebuilds the sorted array on 300 random inputs.
- CI opens the page with `?selftest` in Chrome, Firefox and Safari, where it replays all twelve sorts on all four starting orders in the browser itself.
- Thanks to norahiko's sort-visualize (MIT) for the idea. MIT license, like the rest of the repository.
