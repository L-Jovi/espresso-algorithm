/**
 * Quick sort, three-way partition in place
 *
 * Rearrange the range into three areas, smaller than the pivot, equal to it and
 * larger than it (the Dutch national flag partition, see
 * problems/dutch-national-flag), then sort only the smaller and larger areas.
 * Every item equal to the pivot is placed in a single pass, so arrays with many
 * duplicates stay fast: an array of identical values is sorted in one pass.
 *
 * The pivot is the middle item of the range. With the last item as the pivot,
 * already sorted input becomes the worst case and the recursion grows as deep
 * as the array is long.
 *
 * Time: O(n log n) on average, O(n²) in the worst case. Space: O(log n) for the
 * recursion on average. Not stable. Sorts in place.
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
export function quickSort(array, compare = ascending) {
  sortRange(array, 0, array.length - 1, compare)
  return array
}

function sortRange(array, l, r, compare) {
  if (l >= r) return
  const pivot = array[l + ((r - l) >> 1)]
  const [smallEnd, bigStart] = partition(array, l, r, pivot, compare)
  sortRange(array, l, smallEnd, compare)
  sortRange(array, bigStart, r, compare)
}

/**
 * Rearrange array[l..r] into [< pivot][= pivot][> pivot] and return the last
 * index of the small area and the first index of the big area.
 */
function partition(array, l, r, pivot, compare) {
  let indexSmallArea = l - 1 // array[l..indexSmallArea] < pivot
  let indexBigArea = r + 1 // array[indexBigArea..r] > pivot
  let i = l // array[indexSmallArea + 1..i - 1] === pivot; array[i..indexBigArea - 1] unseen
  while (i < indexBigArea) {
    const order = compare(array[i], pivot)
    if (order < 0) {
      swap(array, i++, ++indexSmallArea)
    } else if (order > 0) {
      // The item swapped in from the right has not been looked at yet, so i stays.
      swap(array, i, --indexBigArea)
    } else {
      i++
    }
  }
  return [indexSmallArea, indexBigArea]
}

if (import.meta.main) showSort(quickSort)
