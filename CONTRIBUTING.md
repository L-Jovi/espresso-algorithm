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

## Documentation

Each folder has an English `README.md` and a Simplified Chinese `README.zh-Hans.md`. Change both in the same pull request and update the date on the mirror's sync line. The [writing guide](docs/writing.md) describes the structure and the words to avoid.

## Before you open a pull request

```sh
npm run check
```

This runs every test and the repository checks (links, README pairs). Pull requests go to `main`, and the `verify` check must pass before they can be merged. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, `ci:`.

By contributing you agree that your work is released under the [MIT license](LICENSE).
