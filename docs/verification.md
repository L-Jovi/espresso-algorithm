# What the checks cover, and what they don't

For maintainers and reviewers: what `npm run check` and CI run, what each check proves, and where their reach ends. Readers who only want to run the code need the [README](../README.md).

## The checks

Run `npm run check` from the repository root to run four checks in order using your installed runtimes. A failure stops the sequence. A local pass covers those versions. On pull requests and pushes to `main`, continuous integration (CI) also repeats the language checks across the versions below and exercises the built site in browsers.

| Local command | What a successful run tells you | Versions in CI |
| --- | --- | --- |
| `npm test` | Node ran the discovered `*.test.js` files and their assertions passed. The runner fails if no test ran. | Node 22.18.0, 22, 24 and 26 |
| `npm run test:python` | The runner loaded each `test_*.py` by path and its tests passed. Loading by path reaches hyphenated folders that `unittest discover` can skip. A file with zero tests fails the run. | Python 3.11 and 3.14 |
| `npm run test:java` | The runner found Java source files in the algorithm sections and ran each with `java File.java`. Each program checks its own answers in `main`. An empty file list fails the run. | JDK 21 and 25 |
| `npm run check:repo` | The repository checks described below passed against files in the checkout. | Node 24 |

The repository check resolves local Markdown and HTML **file paths**. It skips external URLs and does not check Markdown heading fragments. It also checks the English/Chinese document pairs and sync lines, both LeetCode indexes, and the root README introduction against the package description. In the algorithm sections, JavaScript modules must be reachable from a test through imports. Standalone example programs and browser entry points are checked separately. Browser modules use relative imports whose letter case matches the files. The checker also scans supported text files for absolute home paths.

The browser jobs serve the built `_site/` and request local links and assets, expecting HTTP 200. They open each demo with `?selftest` to check its algorithms and drawing. Separate W3C WebDriver cases use real clicks and key input to exercise races, cancellation, problem and language changes, sort playback and text segmentation. A test-only HTTP proxy injects module and worker failures, a stalled worker and an approach that throws. The cases cover both languages at 320, 375 and 1280 CSS pixels, including the nine learning-path race links.

CI runs these browser checks in Chrome and Firefox on Ubuntu and Safari on macOS. The required `verify` job depends on the JavaScript, Python, Java, repository and two browser jobs. Deployment on `main` is a later job.

Every page is opened in both languages and switched in place. A text check flags Chinese outside elements marked as Chinese data on the English page, and three English words in a row outside code on the Chinese page. This detects mixed-language output, not translation quality.

## Browser acceptance

Build and serve the output, start the browser's WebDriver separately, then run:

```sh
npm run build:pages
node scripts/serve.mjs _site 8080
# In another terminal, with ChromeDriver already listening:
node scripts/test-pages.mjs http://127.0.0.1:8080/ chrome=http://127.0.0.1:9515
```

The runner also accepts `firefox=<driver URL>` and `safari=<driver URL>`. Chrome and Firefox run headlessly; SafariDriver uses a visible Safari session, so use the macOS CI job when local desktop interaction must not be disturbed. No browser packages are added to the repository.

Desktop drivers can clamp narrow windows to 500 pixels. Layout cases therefore place the unchanged page in a test-only iframe and assert its actual `innerWidth`. These are CSS viewport checks, not mobile-device emulation.

- All fifteen races must finish through the controls. Switching during a run must keep the picker, URL and displayed problem aligned; cancellation and retry must restore working controls.
- Each demo must show an error when a dependency returns 503, keep its controls disabled and recover through the reload link.
- A worker that fails to load, throws at startup or never replies must produce feedback. The stalled-worker case waits for the real 30-second request deadline; retry uses a new worker.
- An approach that throws on a timed input, such as a stack overflow, is shown as failed in its own row with the browser's message, and the other approaches are still timed.
- Segmentation covers examples, empty input and reload, whitespace, emoji, `𠮷野家` and `𠀀你好`. The check rejects broken UTF-16 words, invalid graph coordinates and stale results.
- Sort checks operate playback, pause, single step, restart, input shape, new numbers, both sort selectors and both sliders. Restart must clear the previous completion announcement.

Fault injection lives only in [the test proxy](../scripts/lib/site-fixture.mjs). Production pages have no test-only timeout or network overrides. Unit tests separately cover worker construction, message errors, mismatched identifiers, duplicate replies and request cleanup.

## How the tests decide what is right

- Each approach to a problem runs on the same table of cases: the problem's examples and the edge cases that broke earlier versions.
- Each folder then compares its approaches, on hundreds or thousands of seeded random inputs, with a reference that is slow but plainly correct: every combination, a built-in such as `RegExp`, `sorted()` or `BigInt`, or a formula. Seeds make every failure repeatable.
- The browser race checks every approach against the explicit `expected` value in [races.js](../leetcode/races.js), after the race's `answer` function, where there is one, has reduced the result to what can be compared. Agreement on a wrong answer fails. This is a small example check: a palindrome is compared by length and duplicate removal by the returned length; full problem tests check more detail. The benchmark inputs are timed, not validated against an oracle.
- Every runnable example is executed: it must print something and exit cleanly, and importing the same file must print nothing.
- Bugs fixed in the 2026 rewrite were first reproduced on the old code; the commit that fixes each one says how it failed, and a test case pins it.

## What the checks do not cover

- **LeetCode's judge.** The solutions pass LeetCode's examples and the tests here, but none was resubmitted to LeetCode after the rewrite. The SQL of problem 1280 is tested on SQLite, not MySQL.
- **Timings.** The numbers in the READMEs were measured with `npm run bench:leetcode` and `npm run bench`, and each says when and where. They are not checked. On 2026-09-30, runs about an hour apart on the same Mac differed by a factor of 2.5 to 4 in absolute times, while the large gaps between approaches, such as brute force against a table, stayed. Only the tests `sorting.test.js` calls "stay fast" put a limit on time, and those limits are generous.
- **Interactions and accessibility.** The acceptance cases above cover known regressions, not every input, assistive technology or device. The dark theme was last tried by hand in Chromium on 2026-09-30. No automated accessibility audit runs. A layout check and a visible link count do not prove usability with a screen reader or a real phone.
- **The public deployment.** Local and CI checks exercise built files, not GitHub Pages, DNS or HTTPS. After a deployment, open the public pages and their assets separately. A successful build or an older passing CI run does not prove the current public site contains a change.
- **Translations.** The language check finds text in the wrong language, not a wrong or clumsy translation; the Chinese text of the site was written and read by hand.
- **External links.** Links to other sites are not checked automatically. All of them were checked by hand on 2026-09-30; the commit messages and the migration ledger say which were replaced and why.
- **Browsers beyond the three engines.** The site uses ES2023 features (`toSorted`, `Array.prototype.at`), module workers and `Intl.Segmenter`; older browsers are not supported.
