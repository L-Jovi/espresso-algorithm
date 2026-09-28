/**
 * Binary search in a sorted array.
 *
 * Keep a range [lo, hi] that must contain the target if it is present. Look
 * at the middle item: if it is smaller than the target, the target can only be
 * to its right; if larger, only to its left. Each step halves the range, so an
 * array of a million items needs at most 20 steps.
 *
 * The middle is computed as lo + ((hi - lo) >> 1) rather than (lo + hi) / 2:
 * in languages with fixed-size integers, such as Java, lo + hi can overflow.
 *
 * `lowerBound` answers a slightly different question, useful when the target
 * may be missing: the first position whose item is not smaller than the
 * target, which is where the target would be inserted.
 *
 * Time: O(log n). Space: O(1). The array must be sorted by the same comparator.
 */

const ascending = (a, b) => a - b

/**
 * @template T
 * @param {readonly T[]} sorted
 * @param {T} target
 * @param {(a: T, b: T) => number} [compare]
 * @returns {number} an index of `target`, or -1 when it is absent
 */
export function binarySearch(sorted, target, compare = ascending) {
  let lo = 0
  let hi = sorted.length - 1
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1)
    const order = compare(sorted[mid], target)
    if (order < 0) lo = mid + 1
    else if (order > 0) hi = mid - 1
    else return mid
  }
  return -1
}

/**
 * @template T
 * @param {readonly T[]} sorted
 * @param {T} target
 * @param {(a: T, b: T) => number} [compare]
 * @returns {number} the first index whose item is >= target (sorted.length if none)
 */
export function lowerBound(sorted, target, compare = ascending) {
  let lo = 0
  let hi = sorted.length // the answer is in [lo, hi]
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1)
    if (compare(sorted[mid], target) < 0) lo = mid + 1
    else hi = mid
  }
  return lo
}

if (import.meta.main) {
  const sorted = [10, 11, 12, 16, 18, 23, 29, 33, 48, 54, 57, 68, 77, 84, 98]
  console.log('sorted:            ', sorted.join(' '))
  console.log('binarySearch(23):  ', binarySearch(sorted, 23))
  console.log('binarySearch(50):  ', binarySearch(sorted, 50))
  console.log('lowerBound(50):    ', lowerBound(sorted, 50))
}
