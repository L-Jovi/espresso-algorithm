/**
 * Heap sort
 *
 * 1. Build a max-heap: a binary tree stored in the array itself, where the
 *    children of index i sit at 2i + 1 and 2i + 2 and every parent is at least
 *    as large as its children. Start at the last parent and sift each parent
 *    down, including the root at index 0.
 * 2. The largest item is now at index 0. Swap it with the last item of the
 *    heap, shrink the heap by one, and sift the new root down. Repeat.
 *
 * Sifting down moves a hole instead of swapping at every level: it keeps the
 * item aside, moves the larger child up while the child is larger, and writes
 * the item once at the end.
 *
 * Time: O(n log n) on every input. Space: O(1). Not stable. Sorts in place.
 * Learning source: https://www.cnblogs.com/chengxiao/p/6129630.html
 */
import { showSort } from '../../shared/demo.js'
import { swap } from '../../shared/swap.js'

const ascending = (a, b) => a - b

/**
 * @template T
 * @param {T[]} array sorted in place
 * @param {(a: T, b: T) => number} [compare]
 * @returns {T[]} the same array
 */
export function heapSort(array, compare = ascending) {
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    adjustHeap(array, array.length, i, compare)
  }
  for (let end = array.length - 1; end > 0; end--) {
    swap(array, 0, end)
    adjustHeap(array, end, 0, compare)
  }
  return array
}

/**
 * Sift array[i] down until both children are smaller, looking only at the
 * first `length` items (the rest of the array is already sorted).
 */
function adjustHeap(array, length, i, compare) {
  const item = array[i]
  for (let child = 2 * i + 1; child < length; child = 2 * child + 1) {
    if (child + 1 < length && compare(array[child], array[child + 1]) < 0) child++
    if (compare(array[child], item) <= 0) break
    array[i] = array[child]
    i = child
  }
  array[i] = item
}

if (import.meta.main) showSort(heapSort)
