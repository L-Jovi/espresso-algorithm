#!/usr/bin/env python3
"""LeetCode 215. Kth Largest Element in an Array: sort, then index.

https://leetcode.com/problems/kth-largest-element-in-an-array/
Return the k-th largest number in an array; copies count separately, so in
[3, 3, 1] the first and second largest are both 3.

Sort a copy with quick sort and read the k-th number from the end. The
partition is three-way: smaller than the pivot, equal to it, and larger.
With only two groups, every copy of the pivot lands in the same group, so
1,000 equal numbers already recursed deep enough to raise RecursionError
(measured on Python 3.11); three groups finish them in one step. The
input list is left as it is.

Time: O(n log n) on average. Space: O(n) for the copies.
quickselect.py skips the sorting: O(n) on average.
"""


class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        return quick_sort(nums)[-k]


def quick_sort(array: list[int]) -> list[int]:
    """Return a sorted copy of `array`."""
    if len(array) <= 1:
        return list(array)
    pivot = array[len(array) // 2]
    smaller = [x for x in array if x < pivot]
    equal = [x for x in array if x == pivot]
    larger = [x for x in array if x > pivot]
    return quick_sort(smaller) + equal + quick_sort(larger)


if __name__ == "__main__":
    print(Solution().findKthLargest([3, 2, 1, 5, 6, 4], 2))
