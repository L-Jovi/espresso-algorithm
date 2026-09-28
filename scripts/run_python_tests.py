#!/usr/bin/env python3
"""Run every test_*.py file in the repository with unittest.

`python3 -m unittest discover` skips folders whose names contain a hyphen,
because they are not importable packages, and then reports "Ran 0 tests ... OK".
This runner finds the test files with git, loads each one by its path, and
fails when a file cannot be imported, when a file holds no tests, or when
nothing ran at all.
"""

import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "shared"))

from load_module import load_module  # noqa: E402


def test_files() -> list:
    listing = subprocess.run(
        ["git", "ls-files", "--cached", "--others", "--exclude-standard", "-z"],
        cwd=ROOT, capture_output=True, text=True, check=True,
    ).stdout
    names = {name for name in listing.split("\0") if name}
    return sorted(
        ROOT / name for name in names
        if Path(name).name.startswith("test_") and name.endswith(".py") and (ROOT / name).exists()
    )


def main() -> int:
    files = test_files()
    if not files:
        print("No test_*.py files found.")
        return 1

    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    for path in files:
        tests = loader.loadTestsFromModule(load_module(path))
        if tests.countTestCases() == 0:
            print(f"{path.relative_to(ROOT)} contains no tests.")
            return 1
        suite.addTests(tests)

    result = unittest.TextTestRunner(verbosity=1).run(suite)
    if result.testsRun == 0:
        print("The test run finished without running a single test.")
        return 1
    return 0 if result.wasSuccessful() else 1


if __name__ == "__main__":
    sys.exit(main())
