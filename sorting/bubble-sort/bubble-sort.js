/**
 * Bubble sort
 *
 * Walk through the array and swap every neighbouring pair that is out of
 * order. After pass i, the i largest items have "bubbled" to the end, so each
 * pass can stop one position earlier. A pass that swaps nothing proves that
 * every neighbour is in order, so the sort stops early.
 *
 * Time: O(n²) on average and in the worst case, O(n) on sorted input.
 * Space: O(1). Stable: equal neighbours are never swapped. Sorts in place.
 */
import { showSort } from '../../shared/demo.js'
import { swap } from '../../shared/swap.js'

const ascending = (a, b) => a - b

/**
 * @template T
 * @param {T[]} array sorted in place
 * @param {(a: T, b: T) => number} [compare] negative, zero or positive, like Array.prototype.sort
 * @returns {T[]} the same array
 */
export function bubbleSort(array, compare = ascending) {
  let i = 0
  while (i < array.length - 1) {
    let swapped = false
    for (let j = 1; j < array.length - i; j++) {
      if (compare(array[j - 1], array[j]) > 0) {
        swap(array, j - 1, j)
        swapped = true
      }
    }
    if (!swapped) break
    i++
  }
  return array
}

if (import.meta.main) showSort(bubbleSort)
