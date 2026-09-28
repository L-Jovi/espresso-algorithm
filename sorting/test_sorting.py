"""Tests for the Python versions of the sorts, compared with sorted()."""

import random
import sys
import unittest
from functools import total_ordering
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "shared"))

from load_module import load_module  # noqa: E402

# name: (function, stable, sorts the given list in place)
SORTS = {
    "bubble sort": (load_module(HERE / "bubble-sort" / "bubble_sort.py").bubble_sort, True, True),
    "shaker sort, fixed bounds": (
        load_module(HERE / "bidirectional-bubble-sort" / "fixed_bounds.py").bidirectional_bubble_sort, True, True),
    "exchange sort": (load_module(HERE / "selection-sort" / "exchange_sort.py").exchange_sort, False, True),
    "insertion sort": (load_module(HERE / "insertion-sort" / "insertion_sort.py").insertion_sort, True, True),
    "shell sort": (load_module(HERE / "shell-sort" / "shell_sort.py").shell_sort, False, True),
    "merge sort, top down, copying": (
        load_module(HERE / "merge-sort" / "top_down_copying.py").merge_sort, True, False),
    "quick sort, two-way, copying": (load_module(HERE / "quick-sort" / "two_way_copying.py").quick_sort, False, False),
}

EDGE_CASES = [
    [], [1], [1, 2], [2, 1], [5, 4], [5, 5, 5], [1, 2, 3, 4, 5], [5, 4, 3, 2, 1],
    [0, -1, 1, -2, 2], [5, 1, 2, 4, 8], [2.5, -1.5, 0.0],
]


@total_ordering
class Item:
    """Compares by key only, so a stable sort must keep the ids in order."""

    def __init__(self, key, id_):
        self.key, self.id = key, id_

    def __eq__(self, other):
        return self.key == other.key

    def __lt__(self, other):
        return self.key < other.key


class SortTests(unittest.TestCase):
    def test_edge_cases(self):
        for name, (sort, _, _) in SORTS.items():
            for case in EDGE_CASES:
                with self.subTest(sort=name, case=case):
                    self.assertEqual(sort(list(case)), sorted(case))

    def test_random_lists(self):
        rng = random.Random(2026)
        for name, (sort, _, _) in SORTS.items():
            for _ in range(300):
                case = [rng.randint(-1000, 1000) for _ in range(rng.randint(0, 60))]
                with self.subTest(sort=name, case=case):
                    self.assertEqual(sort(list(case)), sorted(case))

    def test_in_place_contract(self):
        for name, (sort, _, in_place) in SORTS.items():
            with self.subTest(sort=name):
                data = [3, 1, 2]
                result = sort(data)
                if in_place:
                    self.assertIs(result, data)
                else:
                    self.assertIsNot(result, data)
                    self.assertEqual(data, [3, 1, 2])
                self.assertEqual(result, [1, 2, 3])

    def test_stable_sorts_keep_equal_items_in_order(self):
        rng = random.Random(99)
        items = [Item(rng.randint(0, 9), i) for i in range(200)]
        for name, (sort, stable, _) in SORTS.items():
            if not stable:
                continue
            with self.subTest(sort=name):
                result = sort(list(items))
                for a, b in zip(result, result[1:]):
                    if a.key == b.key:
                        self.assertLess(a.id, b.id)


if __name__ == "__main__":
    unittest.main()
