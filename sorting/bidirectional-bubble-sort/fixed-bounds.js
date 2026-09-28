/**
 * Bidirectional bubble sort with fixed bounds
 *
 * Every round runs a left-to-right pass and then a right-to-left pass, and
 * the bounds shrink by exactly one item per round. It sorts correctly, and it
 * is a useful counterexample: nothing stops early, and the backward pass
 * repeats comparisons the forward pass has already settled, so it does more
 * work than plain bubble sort. shrinking-bounds.js keeps the idea and removes
 * the waste by remembering where the last swap happened.
 *
 * Time: O(n²) on every input. Space: O(1). Stable. Sorts in place.
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
export function shakerSort(array, compare = ascending) {
  const n = array.length
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n - i; j++) {
      if (compare(array[j - 1], array[j]) > 0) swap(array, j - 1, j)
    }
    for (let k = n - i - 1; k > i; k--) {
      if (compare(array[k - 1], array[k]) > 0) swap(array, k - 1, k)
    }
  }
  return array
}

if (import.meta.main) showSort(shakerSort)
