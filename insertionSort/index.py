#!/usr/bin/env python
# -*- coding: utf-8 -*-

def insert_sort(array):
    print 'Before ... \n {arr}'.format(arr=array)

    n = len(array)
    for i in range(1, n):
        # 插入排序等待候选的外层迭代的数值比之前的数字小的时候才有进行内层迭代的资格
        if array[i] < array[i-1]:
            tmp = array[i]
            index = i
            for j in range(i-1, -1, -1):
                if array[j] > tmp:
                    array[j+1] = array[j]
                    index = j
                else:
                    break
            array[index] = tmp

    print '\nAfter ...\n {arr}'.format(arr=array)
    return array

if __name__ == '__main__':
    array = [5, 4, 8, 1, 2]
    insert_sort(array)
