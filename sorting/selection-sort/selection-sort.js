/**
 * Selection sort
 *
 * Find the smallest item of the unsorted part and swap it to the front of that
 * part; repeat. Each pass swaps at most once, so the whole sort writes to the
 * array only O(n) times. That matters when writing is expensive, for example
 * on flash memory. exchange-sort.js reaches the same result with O(n²) swaps.
 *
 * Time: O(n²) on every input, because each pass scans the rest of the array.
 * Space: O(1). Not stable: the long-distance swap can move an item past an
 * equal one. Sorts in place.
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
export function selectionSort(array, compare = ascending) {
  for (let i = 0; i < array.length - 1; i++) {
    let indexMin = i
    for (let j = i + 1; j < array.length; j++) {
      if (compare(array[indexMin], array[j]) > 0) indexMin = j
    }
    if (indexMin !== i) swap(array, i, indexMin)
  }
  return array
}

if (import.meta.main) showSort(selectionSort)
