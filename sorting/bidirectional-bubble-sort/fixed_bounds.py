#!/usr/bin/env python3
"""Bidirectional bubble sort with fixed bounds, the same algorithm as fixed-bounds.js.

Each round runs a left-to-right pass, then a right-to-left pass, and the
bounds shrink by one item per round. It is correct but never stops early;
shrinking-bounds.js shows the faster version.

Time: O(n²) on every input. Space: O(1). Stable. Sorts in place.
"""


def bidirectional_bubble_sort(array: list) -> list:
    """Sort `array` in place and return it."""
    n = len(array)
    for i in range(n):
        for j in range(1, n - i):
            if array[j - 1] > array[j]:
                array[j - 1], array[j] = array[j], array[j - 1]
        for k in range(n - i - 1, i, -1):
            if array[k - 1] > array[k]:
                array[k - 1], array[k] = array[k], array[k - 1]
    return array


if __name__ == "__main__":
    print(bidirectional_bubble_sort([45, 19, 77, 81, 13, 28, 18, 19, 77]))
