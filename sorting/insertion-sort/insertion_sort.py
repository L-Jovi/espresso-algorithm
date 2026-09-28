#!/usr/bin/env python
# -*- coding: utf-8 -*-

def insert_sort(array):
    print('Before ... \n', array)
    n = len(array)
    
    for i in range(1, n):
        if array[i] < array[i-1]:
            tmp = array[i]

            for j in range(i-1, -1, -1):
                if array[j] > tmp:
                    array[j+1] = array[j]
                else:
                    break
            array[j+1] = tmp

    print('\nAfter ...\n', array)
    return array

if __name__ == '__main__':
    array = [5, 4, 8, 1, 2]
    insert_sort(array)
