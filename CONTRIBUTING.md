# Contributing

Thank you for helping. This repository is a collection of small algorithm implementations meant to be read, run and compared. A short, correct solution with a clear explanation is worth more here than a clever one.

## Good first contributions

- **A failing input.** If a solution returns the wrong answer, crashes or is far slower than its comment claims, open a [wrong answer report](https://github.com/L-Jovi/espresso-algorithm/issues/new?template=wrong-answer.yml) with the smallest input that shows it, or send a pull request that adds the input as a test case together with the fix.
- **A clearer explanation.** The header comment of each file should let someone who has never seen the problem follow the idea.
- **A missing step.** A new approach is welcome when it teaches something the existing ones do not, such as the constant-space step after a table-based dynamic programming solution.

## How the code is written

- **No dependencies.** Everything runs on a current Node.js (`^22.18.0 || >=24.2.0`); Python and Java files need only the standard library.
- **One file per approach**, named after the technique (`brute-force.js`, `memoization.js`, `two-pointers.js` …), next to one test file that runs every approach on the same cases.
- **JavaScript style:** ES modules with named exports, 2-space indentation, single quotes, no semicolons. The function name matches the one LeetCode uses.
- **Runnable examples:** a file ends with an `if (import.meta.main) { … }` block, so `node path/to/file.js` prints an example while importing the file prints nothing.
- **Comments in English** explain why the code works, not what each line does. Every file header states the idea and the time and space complexity.
- **Never copy a problem statement.** Link to the problem and summarize it in one sentence of your own.

## Adding a LeetCode problem

```sh
npm run new -- 322 "Coin Change" brute-force
```

This creates `leetcode/0322-coin-change/` with `brute-force.js` and a `solution.test.js` whose placeholder case fails until you replace it. Check that the folder name matches the problem's URL. Then write the header (the problem in one sentence of your own, the idea, the time and space complexity) and put LeetCode's examples and the edge cases into the test. When a single approach cannot be checked against another, add a slow but plainly correct reference to the test and compare the two on seeded random inputs, as the existing folders do. Another approach goes into its own file in the same folder and into the same test; if the difference between approaches is worth showing, add the problem, with its Chinese title and input labels, to [`leetcode/races.js`](leetcode/races.js) and run `npm run bench:leetcode`. Finally, list the problem in both indexes, [`leetcode/README.md`](leetcode/README.md) and [`leetcode/README.zh-Hans.md`](leetcode/README.zh-Hans.md); `npm run check:repo` fails until it is there.

## Changing the site

The site at [espresso.jovipro.com](https://espresso.jovipro.com/) is built from the repository itself: each page sits next to the code it imports and uses the same modules as the tests. Run `npm run serve` and open http://127.0.0.1:8080/ to try a change. A page imports only relative modules, and when opened with `?selftest` it checks itself and writes `pass` into `<html data-selftest>`; CI opens every page that way in Chrome, Firefox and Safari before the site is published.

Every page opens in English and has a button that switches it to Chinese in place; [`assets/language.js`](assets/language.js) does the switching. Write each piece of text twice, in a pair of elements marked `data-l="en"` and `data-l="zh"`, and keep the text a page script writes in its `en`/`zh` table. CI fails a page that shows any text in the other language.

## Documentation

Each folder has an English `README.md` and a Simplified Chinese `README.zh-Hans.md`. Change both in the same pull request and update the date on the mirror's sync line. The [writing guide](docs/writing.md) describes the structure and the words to avoid.

## Before you open a pull request

```sh
npm run check
```

This runs the JavaScript tests, the Python tests (`npm run test:python`, Python 3.11 or newer), the Java checks (`npm run test:java`, JDK 21 or newer) and the repository checks: links, README pairs, and that every module is imported by a test. If you only changed JavaScript, `npm test` and `npm run check:repo` are enough locally; CI runs everything. Pull requests go to `main`, and the `verify` check must pass before they can be merged. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, `ci:`.

By contributing you agree that your work is released under the [MIT license](LICENSE).
