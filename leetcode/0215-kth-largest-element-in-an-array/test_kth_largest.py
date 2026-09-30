"""Tests for quick_sort.py and quickselect.py, compared with sorted()."""

import random
import sys
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parents[1] / "shared"))

from load_module import load_module  # noqa: E402

APPROACHES = {
    "sort, then index": load_module(HERE / "quick_sort.py").Solution().findKthLargest,
    "quickselect": load_module(HERE / "quickselect.py").Solution().findKthLargest,
}


class KthLargestTests(unittest.TestCase):
    def test_examples(self):
        cases = [([3, 2, 1, 5, 6, 4], 2, 5), ([3, 2, 3, 1, 2, 4, 5, 5, 6], 4, 4), ([1], 1, 1), ([2, 1], 2, 1), ([-1, -1], 2, -1)]
        for name, find in APPROACHES.items():
            for nums, k, expected in cases:
                with self.subTest(approach=name, nums=nums, k=k):
                    self.assertEqual(find(nums, k), expected)

    def test_random_lists(self):
        rng = random.Random(215)
        for name, find in APPROACHES.items():
            for _ in range(1000):
                nums = [rng.randint(-10, 10) for _ in range(rng.randint(1, 40))]
                k = rng.randint(1, len(nums))
                with self.subTest(approach=name, nums=nums, k=k):
                    self.assertEqual(find(list(nums), k), sorted(nums)[-k])

    def test_leaves_the_input_alone(self):
        for name, find in APPROACHES.items():
            nums = [3, 2, 1, 5, 6, 4]
            find(nums, 2)
            with self.subTest(approach=name):
                self.assertEqual(nums, [3, 2, 1, 5, 6, 4])

    def test_many_equal_numbers(self):
        # LeetCode allows 10^5 numbers; the old two-way partition failed at 1,000 equal ones.
        for name, find in APPROACHES.items():
            with self.subTest(approach=name):
                self.assertEqual(find([7] * 100_000, 50_000), 7)


if __name__ == "__main__":
    unittest.main()
