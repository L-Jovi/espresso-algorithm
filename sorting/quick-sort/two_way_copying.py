#!/usr/bin/env python3
"""Quick sort, two-way partition into new lists, like two-way-copying.js.

Take the middle item as the pivot, put smaller items in `left` and the others
in `right`, sort both recursively and join them around the pivot. Items equal
to the pivot all go right, so a list of identical values recurses n levels
deep; three-way-in-place.js shows the fix.

Time: O(n log n) on average, O(n²) in the worst case. Not stable.
Returns a new list; the input is not changed.
"""


def quick_sort(array: list) -> list:
    """Return a new sorted list with the items of `array`."""
    if len(array) <= 1:
        return list(array)

    pivot_index = len(array) // 2
    pivot = array[pivot_index]
    left, right = [], []
    for index, value in enumerate(array):
        if index == pivot_index:
            continue
        (left if value < pivot else right).append(value)

    return quick_sort(left) + [pivot] + quick_sort(right)


if __name__ == "__main__":
    print(quick_sort([5, 4, 8, 1, 2]))
