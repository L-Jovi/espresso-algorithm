#!/usr/bin/env python
# -*- coding: utf-8 -*-

def select_sort(array):
    print('Before ... \n', array)

    n = len(array)
    # 选择的外层迭代最终影响的是内层迭代的初值
    # 也就是内层下一次迭代的起点
    for i in range(n):
        for j in range(i+1, n):
            if array[j] < array[i]:
                array[i], array[j] = array[j], array[i]

    print('\nAfter ...\n', array)
    return array

if __name__ == '__main__':
    array = [5, 4, 8, 1, 2]
    select_sort(array)
