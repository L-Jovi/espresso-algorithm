/**
 * Bidirectional bubble sort (cocktail shaker sort), shrinking the bounds
 *
 * Bubble sort carries large items to the right quickly, but a small item near
 * the end moves left only one step per pass. Going back and forth fixes that:
 * a left-to-right pass carries the largest remaining item to the right end,
 * then a right-to-left pass carries the smallest one to the left end.
 *
 * Each pass also remembers where its last swap happened. Everything beyond
 * that point is already in its final place, so the next pass stops there.
 * On sorted input the first pass swaps nothing and the sort ends after n - 1
 * comparisons.
 *
 * Time: O(n²) in the worst case, O(n) on sorted input. Space: O(1).
 * Stable. Sorts in place.
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
  let left = 0
  let right = array.length - 1

  while (left < right) {
    // Left to right: carry the largest item to the right end.
    let lastSwapped = left
    for (let i = left; i < right; i++) {
      if (compare(array[i], array[i + 1]) > 0) {
        swap(array, i, i + 1)
        lastSwapped = i
      }
    }
    right = lastSwapped

    // Right to left: carry the smallest item to the left end.
    lastSwapped = right
    for (let j = right; j > left; j--) {
      if (compare(array[j - 1], array[j]) > 0) {
        swap(array, j - 1, j)
        lastSwapped = j
      }
    }
    left = lastSwapped
  }

  return array
}

if (import.meta.main) showSort(shakerSort)
