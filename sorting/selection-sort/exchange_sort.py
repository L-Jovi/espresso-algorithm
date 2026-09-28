#!/usr/bin/env python3
"""Exchange sort, the same algorithm as exchange-sort.js.

For each position i, compare it with every later item and swap as soon as a
later item is smaller. When the inner loop ends, position i holds the minimum
of the rest, and the next outer step starts the inner loop one position later.
Selection sort (selection-sort.js) gets the same result with one swap per pass.

Time: O(n²) on every input. Space: O(1). Not stable. Sorts in place.
"""


def exchange_sort(array: list) -> list:
    """Sort `array` in place and return it."""
    n = len(array)
    for i in range(n - 1):
        for j in range(i + 1, n):
            if array[j] < array[i]:
                array[i], array[j] = array[j], array[i]
    return array


if __name__ == "__main__":
    print(exchange_sort([5, 4, 8, 1, 2]))
