"""Tests for stack.py, compared with deleting matched pairs until none are left."""

import random
import sys
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parents[1] / "shared"))

from load_module import load_module  # noqa: E402

is_valid = load_module(HERE / "stack.py").Solution().isValid


def is_valid_by_deleting_pairs(s: str) -> bool:
    """A string is valid exactly when deleting (), [] and {} again and again empties it."""
    while True:
        shorter = s.replace("()", "").replace("[]", "").replace("{}", "")
        if shorter == s:
            return s == ""
        s = shorter


def random_brackets(rng: random.Random) -> str:
    """Insert matched pairs at random places, then sometimes spoil one character."""
    s = ""
    for _ in range(rng.randint(0, 6)):
        pair = rng.choice(["()", "[]", "{}"])
        at = rng.randint(0, len(s))
        s = s[:at] + pair + s[at:]
    if s and rng.random() < 0.5:
        at = rng.randrange(len(s))
        s = s[:at] + rng.choice("()[]{}") + s[at + 1:]
    return s


class ValidParenthesesTests(unittest.TestCase):
    def test_examples(self):
        cases = [("()", True), ("()[]{}", True), ("(]", False), ("([])", True), ("([)]", False),
                 ("", True), ("(", False), (")", False), ("((", False)]
        for s, expected in cases:
            with self.subTest(s=s):
                self.assertEqual(is_valid(s), expected)

    def test_random_strings(self):
        rng = random.Random(20)
        for _ in range(3000):
            s = random_brackets(rng)
            with self.subTest(s=s):
                self.assertEqual(is_valid(s), is_valid_by_deleting_pairs(s))


if __name__ == "__main__":
    unittest.main()
