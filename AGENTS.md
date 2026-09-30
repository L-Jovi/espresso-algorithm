# Notes for coding agents

## What this repository is

Small, tested implementations of classic algorithms, data structures and LeetCode solutions, written to be read. The hand-written mechanism is the point: fix it and document its limits, but never replace it with a library call. Several approaches to one problem are kept side by side on purpose.

## Setup and checks

There is no install step and there are no dependencies. Use Node `^22.18.0 || >=24.2.0` (see `.nvmrc`).

```sh
npm test             # every *.test.js file; fails if no test ran
npm run test:python  # every test_*.py file (Python 3.11+); fails if no test ran
npm run test:java    # every .java file via `java File.java` (JDK 21+); main() checks itself
npm run check:repo   # links, README language pairs, every module reached by a test
npm run check        # all four
npm run bench        # race the sorts (not part of the checks)
```

For LeetCode problems:

```sh
npm run new -- 322 "Coin Change" [technique]   # start leetcode/0322-coin-change/ from templates
npm run bench:leetcode                         # race the approaches of each problem, about 12 s
```

For the site (published to GitHub Pages from `main`):

```sh
npm run serve         # serve the repository at http://127.0.0.1:8080/
npm run build:pages   # copy the published files into _site/
```

CI tests the built site in Chrome, Firefox and Safari with `scripts/test-pages.mjs`.

## Conventions

- **Files:** one folder per algorithm or problem, and one file per approach, named after the technique. One test file per folder runs every approach on the same table of cases, then compares them on seeded random inputs with a slow but plainly correct reference.
- **JavaScript:** ES modules with named exports; 2 spaces, single quotes, no semicolons. Add a runnable example in an `if (import.meta.main)` block, and keep module import free of output.
- **Comments:** English, explaining why. A file header gives the idea and the time and space complexity.
- **Problem statements:** never copy one. Link to the problem and summarize it in your own words.
- **Docs:** `README.md` is the source; update `README.zh-Hans.md` in the same change and bump its sync date. Follow `docs/writing.md`.
- **Site pages:** a page sits next to the code it imports (`visualizer/`, `leetcode/race/`, `nlp/word-segmentation/`), imports only relative modules, and lists its script in `PAGE_SCRIPTS` in `scripts/lib/layout.mjs`. Opened with `?selftest`, it checks itself and writes `pass` or its first failure into `<html data-selftest>`.
- **Legacy folders:** `scripts/lib/layout.mjs` lists folders still in the pre-2026 layout (`LEGACY`) and converted ones (`SECTIONS`). Move a folder from the first list to the second in the change that converts it.
- **Python:** standard library only, loaded by path with `shared/load_module.py`; tests are `test_*.py` next to the code.
- **Java:** single-file programs with a classic `public static void main`, no `package` line and no preview features; main() checks its answers and calls `System.exit(1)` on a wrong one.
- **Commits and PRs:** Conventional Commits. Branch from `main` and open a PR; the `verify` check must pass, and only merge commits are allowed.

## Safety

- Branches named `archive/*` are local-only records; never push them.
- Do not add dependencies, generated files, credentials or third-party code without its license notice (`NOTICE.md`).
