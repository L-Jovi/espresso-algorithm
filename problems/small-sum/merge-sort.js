/**
 * Small sum, counted during merge sort.
 *
 * Every pair (earlier item a, later item b) with a < b adds a to the small sum.
 * Merge sort meets every such pair exactly once: when a is in the left half and
 * b in the right half of some merge. Both halves are sorted at that moment, so
 * when the merge takes left[p1] because it is smaller than right[p2], it is
 * also smaller than everything after right[p2]. That adds
 * left[p1] × (number of items left in the right half) in one step.
 *
 * On equal items the merge takes the right one first, so an item is never
 * counted against an equal one: the definition asks for strictly smaller.
 *
 * Time: O(n log n). Space: O(n). The input is copied, not changed.
 * The same trick counts inversions (pairs that are out of order).
 */

export function smallSum(array) {
  const items = [...array]
  const buffer = new Array(items.length)

  const sortAndCount = (l, r) => {
    if (l >= r) return 0
    const mid = l + ((r - l) >> 1)
    return sortAndCount(l, mid) + sortAndCount(mid + 1, r) + merge(l, mid, r)
  }

  const merge = (l, mid, r) => {
    let sum = 0
    let p1 = l
    let p2 = mid + 1
    let k = l
    while (p1 <= mid && p2 <= r) {
      if (items[p1] < items[p2]) {
        sum += items[p1] * (r - p2 + 1)
        buffer[k++] = items[p1++]
      } else {
        buffer[k++] = items[p2++]
      }
    }
    while (p1 <= mid) buffer[k++] = items[p1++]
    while (p2 <= r) buffer[k++] = items[p2++]
    for (k = l; k <= r; k++) items[k] = buffer[k]
    return sum
  }

  return sortAndCount(0, items.length - 1)
}

if (import.meta.main) {
  console.log('smallSum([1, 3, 4, 2, 5]):', smallSum([1, 3, 4, 2, 5]))
}
