/**
 * Merge sort, top down, copying the halves
 *
 * Split the array in half with slice(), sort each half recursively, then merge
 * the two sorted halves into a new array. It is the most direct translation of
 * the idea and leaves the input untouched, at the cost of new arrays at every
 * level of the recursion.
 *
 * The merge walks both halves with indexes. Taking items with shift() looks
 * tidier, but shift() moves every remaining item, which made the first version
 * of this file slow down sharply on large arrays.
 *
 * Time: O(n log n) on every input. Space: O(n) extra at any moment, O(n log n)
 * allocated in total. Stable. Returns a new array; the input is not changed.
 */
import { showSort } from '../../shared/demo.js'

const ascending = (a, b) => a - b

/**
 * @template T
 * @param {readonly T[]} array not modified
 * @param {(a: T, b: T) => number} [compare]
 * @returns {T[]} a new, sorted array
 */
export function mergeSort(array, compare = ascending) {
  if (array.length <= 1) return array.slice()
  const middle = Math.floor(array.length / 2)
  const left = mergeSort(array.slice(0, middle), compare)
  const right = mergeSort(array.slice(middle), compare)
  return merge(left, right, compare)
}

function merge(left, right, compare) {
  const result = []
  let i = 0
  let j = 0
  while (i < left.length && j < right.length) {
    // `<= 0` takes the left item first when both are equal, keeping the sort stable.
    result.push(compare(left[i], right[j]) <= 0 ? left[i++] : right[j++])
  }
  return result.concat(left.slice(i), right.slice(j))
}

if (import.meta.main) showSort(mergeSort)
