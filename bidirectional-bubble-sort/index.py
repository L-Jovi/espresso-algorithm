#!/usr/bin/env python
# -*- coding: utf-8 -*-

def bidirectional_bubble_sort(array):
    print 'Before ... \n {arr}'.format(arr=array)

    n = len(array)
    for i in range(n):
        for j in range(1, n-i):
            if array[j-1] > array[j]:
                array[j-1], array[j] = array[j], array[j-1]
        for k in range(n-i-1, i, -1):
            if array[k] < array[k-1]:
                array[k-1], array[k] = array[k], array[k-1]
    
    print '\nAfter ...\n {arr}'.format(arr=array)
    return array


if __name__ == '__main__':
    array = [45, 19, 77, 81, 13, 28, 18, 19, 77]
    bidirectional_bubble_sort(array)
