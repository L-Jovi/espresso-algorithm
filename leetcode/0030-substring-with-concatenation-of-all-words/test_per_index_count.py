"""Tests for per_index_count.py, compared with sorting the pieces of every window."""

import random
import sys
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parents[1] / "shared"))

from load_module import load_module  # noqa: E402

find_substring = load_module(HERE / "per_index_count.py").Solution().findSubstring


def find_by_sorting_pieces(s: str, words: list[str]) -> list[int]:
    """A window matches when its pieces, sorted, equal the words, sorted."""
    w, m = len(words[0]), len(words)
    return [start for start in range(len(s) - w * m + 1)
            if sorted(s[start + i * w:start + (i + 1) * w] for i in range(m)) == sorted(words)]


class FindSubstringTests(unittest.TestCase):
    def test_examples(self):
        cases = [
            ("barfoothefoobarman", ["foo", "bar"], [0, 9]),
            ("wordgoodgoodgoodbestword", ["word", "good", "best", "word"], []),
            ("barfoofoobarthefoobarman", ["bar", "foo", "the"], [6, 9, 12]),
            ("aaa", ["a", "a"], [0, 1]),
            ("constructor", ["constructor"], [0]),
        ]
        for s, words, expected in cases:
            with self.subTest(s=s, words=words):
                self.assertEqual(find_substring(s, words), expected)

    def test_random_inputs(self):
        rng = random.Random(30)
        for _ in range(2000):
            w = rng.randint(1, 2)
            words = ["".join(rng.choice("ab") for _ in range(w)) for _ in range(rng.randint(1, 3))]
            s = "".join(rng.choice("ab") for _ in range(rng.randint(0, 12)))
            with self.subTest(s=s, words=words):
                self.assertEqual(find_substring(s, words), find_by_sorting_pieces(s, words))


if __name__ == "__main__":
    unittest.main()
