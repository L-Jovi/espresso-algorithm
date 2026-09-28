#!/usr/bin/env python3
"""Insertion sort, the same algorithm as insertion-sort.js.

Grow a sorted prefix one item at a time: shift every larger item of the prefix
one step to the right, and put the item into the gap.

The inner loop walks left with `for … else`: `break` means a smaller or equal
item was found, so the item goes right after it. The `else` branch runs only
when the loop reached the front without breaking, which means the item is
smaller than everything before it and belongs at index 0.

Time: O(n²) on average and in the worst case, O(n) on sorted input.
Space: O(1). Stable. Sorts in place.
"""


def insertion_sort(array: list) -> list:
    """Sort `array` in place and return it."""
    for i in range(1, len(array)):
        item = array[i]
        if not item < array[i - 1]:
            continue
        for j in range(i - 1, -1, -1):
            if array[j] > item:
                array[j + 1] = array[j]
            else:
                array[j + 1] = item
                break
        else:
            array[0] = item
    return array


if __name__ == "__main__":
    print(insertion_sort([5, 4, 8, 1, 2]))
