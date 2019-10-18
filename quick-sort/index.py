#!/usr/bin/env python
# -*- coding: utf-8 -*-

def quick_sort(array):
    if len(array) <= 1:
        return array

    pivotIndex = len(array) / 2
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

if __name__ == '__main__':
    array = [5, 4, 8, 1, 2]
    print(quick_sort(array))
