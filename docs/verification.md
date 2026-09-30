# What the checks cover, and what they don't

For maintainers and reviewers: what `npm run check` and CI run, what each check proves, and where their reach ends. Readers who only want to run the code need the [README](../README.md).

## The checks

| Check | Command | What it proves |
| --- | --- | --- |
| JavaScript tests | `npm test` | Every `*.test.js` passes on Node 22.18.0, 22, 24 and 26. The runner fails if no test ran. |
| Python tests | `npm run test:python` | Every `test_*.py` passes on Python 3.11 and 3.14. Files are loaded by path, because `unittest discover` skips folders with hyphens and would report success after running nothing; the runner fails if a file holds no tests. |
| Java checks | `npm run test:java` | Every `.java` file runs with `java File.java` on JDK 21 and 25, and its `main` checks its own answers. |
| Repository checks | `npm run check:repo` | Links in Markdown and in the site's HTML resolve; every English README has a Chinese mirror with a sync date; the README's first paragraph equals `package.json`'s description; every module is imported by a test; the site's scripts use only relative imports, with the exact case of each file name, and no `node:` modules; no file contains a home directory path. |
| The site | `scripts/test-pages.mjs` in CI | The built `_site/` answers 200 for every local link and asset, and each interactive page passes its own `?selftest` in Chrome and Firefox (Ubuntu) and Safari (macOS). The site is deployed only after all of this passed on `main`. |

`npm run check` runs the first four in a row. CI runs everything on every pull request and every push to `main`, and the single required check, `verify`, passes only when every job did.

## How the tests decide what is right

- Each approach to a problem runs on the same table of cases: the problem's examples and the edge cases that broke earlier versions.
- Each folder then compares its approaches, on hundreds or thousands of seeded random inputs, with a reference that is slow but plainly correct: every combination, a built-in such as `RegExp`, `sorted()` or `BigInt`, or a formula. Seeds make every failure repeatable.
- Every runnable example is executed: it must print something and exit cleanly, and importing the same file must print nothing.
- Bugs fixed in the 2026 rewrite were first reproduced on the old code; the commit that fixes each one says how it failed, and a test case pins it.

## What the checks do not cover

- **LeetCode's judge.** The solutions pass LeetCode's examples and the tests here, but none was resubmitted to LeetCode after the rewrite. The SQL of problem 1280 is tested on SQLite, not MySQL.
- **Timings.** The numbers in the READMEs were measured with `npm run bench:leetcode` and `npm run bench`, and each says when and where. They are not checked. On 2026-09-30, runs about an hour apart on the same Mac differed by a factor of 2.5 to 4 in absolute times, while the large gaps between approaches, such as brute force against a table, stayed. Only the tests `sorting.test.js` calls "stay fast" put a limit on time, and those limits are generous.
- **Interaction on the site.** The self-tests exercise each page's algorithms and drawing code, not clicks or key presses. Playing, stepping, racing and typing were tried by hand in Chromium on 2026-09-30, as were the dark theme and a 375-pixel-wide screen. No automated accessibility audit runs; the controls are native form elements with labels.
- **External links.** Links to other sites are not checked automatically. All of them were checked by hand on 2026-09-30; the commit messages and the migration ledger say which were replaced and why.
- **Browsers beyond the three engines.** The site uses ES2023 features (`toSorted`, `Array.prototype.at`), module workers and `Intl.Segmenter`; older browsers are not supported.
