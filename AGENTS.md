# Notes for coding agents

## What this repository is

Small, tested implementations of classic algorithms, data structures and LeetCode solutions, written to be read. The hand-written mechanism is the point: fix it and document its limits, but never replace it with a library call. Several approaches to one problem are kept side by side on purpose.

## Setup and checks

There is no install step and there are no dependencies. Use Node `^22.18.0 || >=24.2.0` (see `.nvmrc`).

```sh
npm test             # every *.test.js file; fails if no test ran
npm run test:python  # every test_*.py file (Python 3.11+); fails if no test ran
npm run check:repo   # links, README language pairs, every module reached by a test
npm run check        # all three
npm run bench        # race the sorts (not part of the checks)
```

## Conventions

- **Files:** one folder per algorithm or problem, and one file per approach, named after the technique. One test file per folder runs every approach on the same table of cases.
- **JavaScript:** ES modules with named exports; 2 spaces, single quotes, no semicolons. Add a runnable example in an `if (import.meta.main)` block, and keep module import free of output.
- **Comments:** English, explaining why. A file header gives the idea and the time and space complexity.
- **Problem statements:** never copy one. Link to the problem and summarize it in your own words.
- **Docs:** `README.md` is the source; update `README.zh-Hans.md` in the same change and bump its sync date. Follow `docs/writing.md`.
- **Legacy folders:** `scripts/lib/layout.mjs` lists folders still in the pre-2026 layout (`LEGACY`) and converted ones (`SECTIONS`). Move a folder from the first list to the second in the change that converts it.
- **Python:** standard library only, loaded by path with `shared/load_module.py`; tests are `test_*.py` next to the code.
- **Commits and PRs:** Conventional Commits. Branch from `main` and open a PR; the `verify` check must pass, and only merge commits are allowed.

## Safety

- Branches named `archive/*` are local-only records; never push them.
- Do not add dependencies, generated files, credentials or third-party code without its license notice (`NOTICE.md`).
