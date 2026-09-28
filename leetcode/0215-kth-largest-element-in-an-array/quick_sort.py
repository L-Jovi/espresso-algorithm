#!/usr/bin/env python
# -*- coding: utf-8 -*-

class Solution:
    def findKthLargest(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: int
        """

        def quick_sort(array):
            if len(array) <= 1:
                return array

            pivotIndex = len(array) // 2
            pivot = array[pivotIndex]
            array.remove(pivot)

            left = []
            right = []

            for index, value in enumerate(array):
                if value < pivot:
                    left.append(value)
                else:
                    right.append(value)

            return quick_sort(left) + [ pivot ] + quick_sort(right)

        sorted_nums = quick_sort(nums)
        return sorted_nums[len(sorted_nums) - k]
