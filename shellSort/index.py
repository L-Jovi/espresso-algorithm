#!/usr/bin/env python
# -*- coding: utf-8 -*-

def shell_sort(array):
    print 'Before ... \n {arr}'.format(arr=array)

    n = len(array)
    gap = int(n / 2)
    while gap > 0:
        for i in range(gap, n):
            tmp = array[i]
            j = i
            while (j >= gap and array[j-gap] > tmp):
                array[j] = array[j-gap]
                j = j - gap
            array[j] = tmp
        gap = int(gap / 2)

    print '\nAfter ...\n {arr}'.format(arr=array)
    return array

if __name__ == '__main__':
    array = [13, 14, 94, 33, 82, 25, 59, 94, 65, 23, 45, 27, 73, 25, 39, 10]
    shell_sort(array)
