/**
 * Merge sort, top down, with indexes instead of copies
 *
 * The same recursion as top-down-copying.js, but each call receives the range
 * array[l..r] instead of a new array, and the merged result is written back
 * into that range. Only one scratch buffer is allocated, for the whole sort.
 *
 * Time: O(n log n) on every input. Space: O(n) for the buffer plus O(log n)
 * for the recursion. Stable. Sorts in place (the given array is rearranged).
 */
import { showSort } from '../../shared/demo.js'
import { merge } from './merge.js'

const ascending = (a, b) => a - b

/**
 * @template T
 * @param {T[]} array sorted in place
 * @param {(a: T, b: T) => number} [compare]
 * @returns {T[]} the same array
 */
export function mergeSort(array, compare = ascending) {
  sortRange(array, new Array(array.length), 0, array.length - 1, compare)
  return array
}

function sortRange(array, buffer, l, r, compare) {
  // A range of zero or one item is sorted. `>=` also covers the empty array,
  // where r is -1.
  if (l >= r) return
  const mid = l + ((r - l) >> 1)
  sortRange(array, buffer, l, mid, compare)
  sortRange(array, buffer, mid + 1, r, compare)
  merge(array, buffer, l, mid, r, compare)
}

if (import.meta.main) showSort(mergeSort)
