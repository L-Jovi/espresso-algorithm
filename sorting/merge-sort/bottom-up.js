/**
 * Merge sort, bottom up, without recursion
 *
 * Treat every item as a sorted run of length 1. Merge neighbouring runs into
 * runs of 2, then 4, 8 and so on, until one run covers the whole array. The
 * loop replaces the recursion of the top-down versions, so there is no call
 * stack to overflow.
 *
 * When the number of items is not a power of two, the last run of a pass can
 * be shorter, or have no partner at all. A run without a partner is already
 * sorted and is simply left for the next pass.
 *
 * Time: O(n log n) on every input. Space: O(n) for the buffer. Stable.
 * Sorts in place (the given array is rearranged).
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
  const n = array.length
  const buffer = new Array(n)
  for (let mergeSize = 1; mergeSize < n; mergeSize *= 2) {
    // A pair exists only while the left run ends before the last index.
    for (let l = 0; l + mergeSize < n; l += 2 * mergeSize) {
      const mid = l + mergeSize - 1
      const r = Math.min(mid + mergeSize, n - 1)
      merge(array, buffer, l, mid, r, compare)
    }
  }
  return array
}

if (import.meta.main) showSort(mergeSort)
