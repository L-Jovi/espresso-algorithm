#!/usr/bin/env python
# -*- coding: utf-8 -*-

def merge(left, right):
    l = r = 0
    res = []
    while l < len(left) and r < len(right):
        if left[l] < right[r]:
            res.append(left[l])
            l += 1
        else:
            res.append(right[r])
            r += 1
    res += left[l:]
    res += right[r:]
    return res

def merge_sort(array):
    n = len(array)
    if n <= 1:
        return array
    else:
        division = int(n / 2)
        left = merge_sort(array[:division])
        right = merge_sort(array[division:])
        return merge(left, right)

if __name__ == '__main__':
    array = [13, 14, 94, 33, 82, 25, 59, 94, 65, 23, 45, 27, 73, 25, 39]
    print 'Before ... \n {arr}'.format(arr=array)
    array = merge_sort(array)
    print '\nAfter ...\n {arr}'.format(arr=array)
