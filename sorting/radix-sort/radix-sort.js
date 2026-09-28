/**
 * Radix sort (least significant digit first, base 10)
 *
 * Distribute the numbers into ten buckets by their last digit, then collect
 * the buckets in order. Repeat for the tens digit, the hundreds digit and so on.
 * Each pass keeps the order of the previous pass inside a bucket, so after the
 * pass for the highest digit the whole array is sorted. It never compares two
 * numbers with each other.
 *
 * Only integers have digits. Negative numbers are handled by shifting every
 * value by the minimum, so the smallest becomes 0, while picking the bucket.
 *
 * Time: O(d · (n + 10)), where d is the number of digits of (max − min).
 * Space: O(n) for the buckets. Stable. The result is written back into the
 * given array.
 * Learning source: https://segmentfault.com/a/1190000021342923
 */
import { showSort } from '../../shared/demo.js'

/**
 * @param {number[]} array safe integers, sorted in place
 * @returns {number[]} the same array
 */
export function radixSort(array) {
  if (array.length <= 1) return array

  let min = array[0]
  let max = array[0]
  for (const value of array) {
    if (!Number.isSafeInteger(value)) throw new TypeError(`radixSort sorts integers, got ${value}`)
    if (value < min) min = value
    if (value > max) max = value
  }

  const buckets = Array.from({ length: 10 }, () => [])
  // `place` is 1, 10, 100, …; stop once no shifted value has a digit there.
  for (let place = 1; Math.floor((max - min) / place) > 0; place *= 10) {
    for (const value of array) {
      buckets[Math.floor((value - min) / place) % 10].push(value)
    }
    // Write this pass back into the array: the next pass must read its result.
    let index = 0
    for (const bucket of buckets) {
      for (const value of bucket) array[index++] = value
      bucket.length = 0
    }
  }

  return array
}

if (import.meta.main) showSort(radixSort)
