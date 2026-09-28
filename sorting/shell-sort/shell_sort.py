#!/usr/bin/env python3
"""Shell sort, the same algorithm as shell-sort.js.

Run insertion sort on items that are `gap` apart, then halve the gap. The last
pass, with gap 1, is plain insertion sort on a list that is nearly sorted.
The gaps are Shell's original n/2, n/4, …, 1.

Time: O(n²) in the worst case with these gaps. Space: O(1). Not stable.
Sorts in place.
"""


def shell_sort(array: list) -> list:
    """Sort `array` in place and return it."""
    n = len(array)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            item = array[i]
            j = i
            while j >= gap and array[j - gap] > item:
                array[j] = array[j - gap]
                j -= gap
            array[j] = item
        gap //= 2
    return array


if __name__ == "__main__":
    print(shell_sort([13, 14, 94, 33, 82, 25, 59, 94, 65, 23, 45, 27, 73, 25, 39, 10]))
