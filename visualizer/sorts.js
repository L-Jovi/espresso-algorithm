/**
 * The sorts the visualizer can show: every sort in sorting/ that rearranges
 * the array it is given. The copying merge sort and the copying quick sort
 * return new arrays instead, so they cannot be traced (see trace.js).
 */

import { shakerSort as shakerSortFixed } from '../sorting/bidirectional-bubble-sort/fixed-bounds.js'
import { shakerSort as shakerSortShrinking } from '../sorting/bidirectional-bubble-sort/shrinking-bounds.js'
import { bubbleSort } from '../sorting/bubble-sort/bubble-sort.js'
import { heapSort } from '../sorting/heap-sort/heap-sort.js'
import { insertionSort } from '../sorting/insertion-sort/insertion-sort.js'
import { mergeSort as mergeSortBottomUp } from '../sorting/merge-sort/bottom-up.js'
import { mergeSort as mergeSortIndices } from '../sorting/merge-sort/top-down-indices.js'
import { quickSort as quickSortThreeWay } from '../sorting/quick-sort/three-way-in-place.js'
import { radixSort } from '../sorting/radix-sort/radix-sort.js'
import { exchangeSort } from '../sorting/selection-sort/exchange-sort.js'
import { selectionSort } from '../sorting/selection-sort/selection-sort.js'
import { shellSort } from '../sorting/shell-sort/shell-sort.js'

// `name` and `nameZh` label the sort in the site's two languages; `file` is
// relative to sorting/, for the link to the source.
export const SORTS = [
  { id: 'bubble', name: 'Bubble sort', nameZh: '冒泡排序', file: 'bubble-sort/bubble-sort.js', sort: bubbleSort },
  { id: 'shaker', name: 'Bidirectional bubble sort', nameZh: '双向冒泡排序', file: 'bidirectional-bubble-sort/shrinking-bounds.js', sort: shakerSortShrinking },
  { id: 'shaker-fixed', name: 'Bidirectional bubble sort, fixed bounds', nameZh: '双向冒泡排序（固定边界）', file: 'bidirectional-bubble-sort/fixed-bounds.js', sort: shakerSortFixed },
  { id: 'selection', name: 'Selection sort', nameZh: '选择排序', file: 'selection-sort/selection-sort.js', sort: selectionSort },
  { id: 'exchange', name: 'Exchange sort', nameZh: '交换排序', file: 'selection-sort/exchange-sort.js', sort: exchangeSort },
  { id: 'insertion', name: 'Insertion sort', nameZh: '插入排序', file: 'insertion-sort/insertion-sort.js', sort: insertionSort },
  { id: 'shell', name: 'Shell sort', nameZh: '希尔排序', file: 'shell-sort/shell-sort.js', sort: shellSort },
  { id: 'merge', name: 'Merge sort, top down', nameZh: '归并排序（自顶向下）', file: 'merge-sort/top-down-indices.js', sort: mergeSortIndices },
  { id: 'merge-bottom-up', name: 'Merge sort, bottom up', nameZh: '归并排序（自底向上）', file: 'merge-sort/bottom-up.js', sort: mergeSortBottomUp },
  { id: 'quick', name: 'Quick sort, three-way', nameZh: '三路快速排序', file: 'quick-sort/three-way-in-place.js', sort: quickSortThreeWay },
  { id: 'heap', name: 'Heap sort', nameZh: '堆排序', file: 'heap-sort/heap-sort.js', sort: heapSort },
  { id: 'radix', name: 'Radix sort', nameZh: '基数排序', file: 'radix-sort/radix-sort.js', sort: radixSort },
]
