/**
 * The largest number in an array, by divide and conquer.
 *
 * The maximum of a range is the larger of the maximums of its two halves, and
 * the maximum of a single item is the item. The work satisfies
 * T(n) = 2 · T(n / 2) + O(1), which the master theorem solves to O(n): the
 * same as one loop, which is the point of the exercise. Splitting in half keeps
 * the recursion only log₂ n levels deep, so a million items need about 20.
 *
 * Time: O(n). Space: O(log n) for the recursion.
 */

/**
 * @param {number[]} array
 * @returns {number} the largest item; -Infinity for an empty array, like Math.max()
 */
export function maxOf(array) {
  if (array.length === 0) return -Infinity
  const maxInRange = (l, r) => {
    if (l === r) return array[l]
    const mid = l + ((r - l) >> 1)
    return Math.max(maxInRange(l, mid), maxInRange(mid + 1, r))
  }
  return maxInRange(0, array.length - 1)
}

if (import.meta.main) {
  console.log('maxOf([2, 7, 4, 1, 5]):', maxOf([2, 7, 4, 1, 5]))
}
