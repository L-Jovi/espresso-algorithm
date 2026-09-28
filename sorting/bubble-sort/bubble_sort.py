#!/usr/bin/env python3
"""Bubble sort, the same algorithm as bubble-sort.js.

Walk through the list and swap every neighbouring pair that is out of order.
After pass i the i largest items are at the end, so each pass stops one
position earlier. A pass without swaps means the list is sorted.

Time: O(n²) on average and in the worst case, O(n) on sorted input.
Space: O(1). Stable. Sorts in place.
"""


def bubble_sort(array: list) -> list:
    """Sort `array` in place and return it."""
    n = len(array)
    for i in range(n - 1):
        swapped = False
        for j in range(1, n - i):
            if array[j - 1] > array[j]:
                array[j - 1], array[j] = array[j], array[j - 1]
                swapped = True
        if not swapped:
            break
    return array


if __name__ == "__main__":
    print(bubble_sort([5, 4, 8, 1, 2]))
