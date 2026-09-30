#!/usr/bin/env python3
"""LeetCode 215. Kth Largest Element in an Array: quickselect.

https://leetcode.com/problems/kth-largest-element-in-an-array/
Return the k-th largest number in an array; copies count separately.

Quickselect is quick sort that only continues on one side. Split the
candidates around a pivot into larger, equal and smaller numbers. The group
sizes tell where the k-th largest is: among the larger numbers, among the
copies of the pivot (then the pivot is the answer), or among the smaller
numbers, where it is the (k - larger - equal)-th largest. The other groups
are dropped. A random pivot drops a constant fraction on average, so the
work shrinks geometrically: n + n/2 + n/4 + ... = O(n).

`heapq.nlargest(k, nums)[-1]` gives the same answer in O(n log k), and
sorting in O(n log n); quick_sort.py shows the sorting route.

Time: O(n) on average, O(n^2) with extremely unlucky pivots. Space: O(n).
"""

import random


class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        candidates = nums
        while True:
            pivot = random.choice(candidates)
            larger = [x for x in candidates if x > pivot]
            equal = sum(1 for x in candidates if x == pivot)
            if k <= len(larger):
                candidates = larger
            elif k <= len(larger) + equal:
                return pivot
            else:
                k -= len(larger) + equal
                candidates = [x for x in candidates if x < pivot]


if __name__ == "__main__":
    print(Solution().findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4))
