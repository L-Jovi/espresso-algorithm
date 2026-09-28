/**
 * Insertion sort
 *
 * Grow a sorted prefix one item at a time: take the next item, shift every
 * larger item of the prefix one step to the right, and put the item into the
 * gap. Nearly sorted input needs almost no shifting, which is why fast
 * library sorts such as TimSort use insertion sort for short runs.
 *
 * Time: O(n²) on average and in the worst case, O(n) on sorted input.
 * Space: O(1). Stable: an item never moves past an equal one. Sorts in place.
 */
import { showSort } from '../../shared/demo.js'

const ascending = (a, b) => a - b

/**
 * @template T
 * @param {T[]} array sorted in place
 * @param {(a: T, b: T) => number} [compare]
 * @returns {T[]} the same array
 */
export function insertionSort(array, compare = ascending) {
  for (let i = 1; i < array.length; i++) {
    const item = array[i]
    let j = i - 1
    while (j >= 0 && compare(array[j], item) > 0) {
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = item
  }
  return array
}

if (import.meta.main) showSort(insertionSort)
