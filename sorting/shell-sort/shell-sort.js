/**
 * Shell sort
 *
 * Insertion sort is fast on nearly sorted data but moves items one step at a
 * time. Shell sort first runs insertion sort on items that are `gap` apart,
 * so an item can travel far in one move, then repeats with smaller gaps. The
 * last pass (gap 1) is plain insertion sort on an array that is already
 * nearly sorted.
 *
 * The gaps here are Shell's original sequence n/2, n/4, …, 1, the same as in
 * shell_sort.py. Later sequences (Knuth's 1, 4, 13, 40, … or Ciura's) are
 * faster in practice; the gap sequence decides the complexity.
 *
 * Time: O(n²) in the worst case with these gaps; much faster on typical input.
 * Space: O(1). Not stable: items jump over equal items `gap` apart. In place.
 */
import { showSort } from '../../shared/demo.js'

const ascending = (a, b) => a - b

/**
 * @template T
 * @param {T[]} array sorted in place
 * @param {(a: T, b: T) => number} [compare]
 * @returns {T[]} the same array
 */
export function shellSort(array, compare = ascending) {
  const n = array.length
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Insertion sort on each chain of items that are `gap` apart.
    for (let i = gap; i < n; i++) {
      const item = array[i]
      let j = i
      while (j >= gap && compare(array[j - gap], item) > 0) {
        array[j] = array[j - gap]
        j -= gap
      }
      array[j] = item
    }
  }
  return array
}

if (import.meta.main) showSort(shellSort)
