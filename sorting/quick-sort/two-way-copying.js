/**
 * Quick sort, two-way partition into new arrays
 *
 * Take the middle item as the pivot, put every smaller item in `left` and every
 * other item in `right`, sort both recursively and join them around the pivot.
 * Each call places exactly one item, the pivot, in its final position.
 *
 * Items equal to the pivot all go to `right`. An array of identical values is
 * therefore split into 0 and n - 1 items at every level: O(n²) time and n
 * levels of recursion, which overflows the call stack after a few thousand
 * equal items. three-way-in-place.js fixes this by placing all equal items at
 * once.
 *
 * Time: O(n log n) on average, O(n²) in the worst case. Space: O(n) for the
 * new arrays plus the recursion. Not stable. Returns a new array; the input
 * is not changed.
 */
import { showSort } from '../../shared/demo.js'

const ascending = (a, b) => a - b

/**
 * @template T
 * @param {readonly T[]} array not modified
 * @param {(a: T, b: T) => number} [compare]
 * @returns {T[]} a new, sorted array
 */
export function quickSort(array, compare = ascending) {
  if (array.length <= 1) return array.slice()

  const pivotIndex = Math.floor(array.length / 2)
  const pivot = array[pivotIndex]
  const left = []
  const right = []
  for (let i = 0; i < array.length; i++) {
    if (i === pivotIndex) continue
    if (compare(array[i], pivot) < 0) left.push(array[i])
    else right.push(array[i])
  }

  return quickSort(left, compare).concat([pivot], quickSort(right, compare))
}

if (import.meta.main) showSort(quickSort)
