/**
 * Exchange sort
 *
 * For each position i, compare it with every later item and swap as soon as a
 * later item is smaller. When the inner loop ends, position i holds the
 * minimum of the rest, exactly as in selection sort, but it got there through
 * many swaps instead of one.
 *
 * This version was first written as "selection sort"; comparing it with
 * selection-sort.js shows the difference: the same comparisons, but O(n²)
 * writes instead of O(n).
 *
 * Time: O(n²) on every input. Space: O(1). Not stable. Sorts in place.
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
export function exchangeSort(array, compare = ascending) {
  const n = array.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (compare(array[j], array[i]) < 0) swap(array, i, j)
    }
  }
  return array
}

if (import.meta.main) showSort(exchangeSort)
