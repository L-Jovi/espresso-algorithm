#!/usr/bin/env python
# -*- coding: utf-8 -*-

def bubble_sort(array):
    print 'Before ... \n {arr}'.format(arr=array)

    n = len(array)

    if not(n) or (n < 2):
        return None

    for i in range(n):
        for j in range(1, n-i):
            if array[j-1] > array[j]:
                array[j-1], array[j] = array[j], array[j-1]

    print '\nAfter ...\n {arr}'.format(arr=array)
    return array


if __name__ == '__main__':
    array = [5, 4, 8, 1, 2]
    bubble_sort(array)
