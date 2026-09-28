/**
 * Dutch national flag problem: group an array into three parts in one pass.
 *
 * Rearrange the array so that every item smaller than `pivot` comes first,
 * then every item equal to it, then every larger item, like the three stripes
 * of the Dutch flag. Edsger Dijkstra posed it; it is the partition step of
 * three-way quick sort (sorting/quick-sort/three-way-in-place.js).
 *
 * Three indexes split the array into four regions while i walks through it:
 *
 *   [ < pivot | = pivot | unseen | > pivot ]
 *     ^ small  ^ ...      ^ i      ^ big
 *
 * An item smaller than the pivot is swapped to the end of the small region;
 * a larger one is swapped to the front of the big region, and i stays because
 * the item swapped in is still unseen. Each item is looked at once.
 *
 * Time: O(n). Space: O(1). The order inside each part is not kept.
 */
import { swap } from '../../shared/swap.js'

/**
 * @param {number[]} array rearranged in place
 * @param {number} pivot
 * @returns {[number, number]} the first and last index of the items equal to
 *   `pivot` (first > last when there are none)
 */
export function partition(array, pivot) {
  let indexSmallArea = -1
  let indexBigArea = array.length
  let i = 0
  while (i < indexBigArea) {
    if (array[i] < pivot) swap(array, i++, ++indexSmallArea)
    else if (array[i] > pivot) swap(array, i, --indexBigArea)
    else i++
  }
  return [indexSmallArea + 1, indexBigArea - 1]
}

/**
 * LeetCode 75, Sort Colors: sort an array of 0s, 1s and 2s in one pass.
 * It is the flag problem with pivot 1.
 */
export function sortColors(nums) {
  partition(nums, 1)
  return nums
}

if (import.meta.main) {
  const array = [5, 1, 8, 5, 2, 9, 5, 3]
  const [first, last] = partition(array, 5)
  console.log('partitioned around 5:', array.join(' '), ` (the 5s are at ${first}..${last})`)
  console.log('sortColors:', sortColors([2, 0, 2, 1, 1, 0]).join(' '))
}
