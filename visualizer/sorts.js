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

// `file` is relative to sorting/, for the link to the source.
export const SORTS = [
  { id: 'bubble', name: 'Bubble sort', file: 'bubble-sort/bubble-sort.js', sort: bubbleSort },
  { id: 'shaker', name: 'Bidirectional bubble sort', file: 'bidirectional-bubble-sort/shrinking-bounds.js', sort: shakerSortShrinking },
  { id: 'shaker-fixed', name: 'Bidirectional bubble sort, fixed bounds', file: 'bidirectional-bubble-sort/fixed-bounds.js', sort: shakerSortFixed },
  { id: 'selection', name: 'Selection sort', file: 'selection-sort/selection-sort.js', sort: selectionSort },
  { id: 'exchange', name: 'Exchange sort', file: 'selection-sort/exchange-sort.js', sort: exchangeSort },
  { id: 'insertion', name: 'Insertion sort', file: 'insertion-sort/insertion-sort.js', sort: insertionSort },
  { id: 'shell', name: 'Shell sort', file: 'shell-sort/shell-sort.js', sort: shellSort },
  { id: 'merge', name: 'Merge sort, top down', file: 'merge-sort/top-down-indices.js', sort: mergeSortIndices },
  { id: 'merge-bottom-up', name: 'Merge sort, bottom up', file: 'merge-sort/bottom-up.js', sort: mergeSortBottomUp },
  { id: 'quick', name: 'Quick sort, three-way', file: 'quick-sort/three-way-in-place.js', sort: quickSortThreeWay },
  { id: 'heap', name: 'Heap sort', file: 'heap-sort/heap-sort.js', sort: heapSort },
  { id: 'radix', name: 'Radix sort', file: 'radix-sort/radix-sort.js', sort: radixSort },
]
