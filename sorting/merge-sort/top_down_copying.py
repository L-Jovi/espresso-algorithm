#!/usr/bin/env python3
"""Merge sort, top down, copying the halves, like top-down-copying.js.

Split the list in half with slicing, sort each half recursively and merge the
two sorted halves into a new list.

Time: O(n log n) on every input. Space: O(n) extra at any moment.
Stable: on equal items the left one is taken first (`<=`).
Returns a new list; the input is not changed.
"""


def merge(left: list, right: list) -> list:
    """Merge two sorted lists into one new sorted list."""
    i = j = 0
    result = []
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]


def merge_sort(array: list) -> list:
    """Return a new sorted list with the items of `array`."""
    if len(array) <= 1:
        return list(array)
    middle = len(array) // 2
    return merge(merge_sort(array[:middle]), merge_sort(array[middle:]))


if __name__ == "__main__":
    print(merge_sort([13, 14, 94, 33, 82, 25, 59, 94, 65, 23, 45, 27, 73, 25, 39]))
