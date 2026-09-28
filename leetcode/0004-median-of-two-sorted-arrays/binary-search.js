/**
 * LeetCode 4. Median of Two Sorted Arrays —
 * https://leetcode.com/problems/median-of-two-sorted-arrays/
 * Return the median of all numbers of two sorted arrays together.
 *
 * Binary search on a cut. Cut the shorter array A after i items and the longer
 * array B after j items, with i + j equal to half of all the items (rounded
 * up). If every item left of both cuts is ≤ every item right of them, the
 * cuts split the merged order in half, and the median is read off the four
 * items next to the cuts. Otherwise the comparison says which way to move i,
 * so i can be found by binary search over the shorter array.
 *
 * Time: O(log min(m, n)). Space: O(1).
 * This is the complexity the problem asks for; merge.js is the O(m + n)
 * version it improves on.
 */

export function findMedianSortedArrays(nums1, nums2) {
  const [a, b] = nums1.length <= nums2.length ? [nums1, nums2] : [nums2, nums1]
  const half = (a.length + b.length + 1) >> 1
  let lo = 0
  let hi = a.length
  while (lo <= hi) {
    const i = (lo + hi) >> 1 // items of a left of the cut
    const j = half - i // items of b left of the cut
    const aLeft = i > 0 ? a[i - 1] : -Infinity
    const aRight = i < a.length ? a[i] : Infinity
    const bLeft = j > 0 ? b[j - 1] : -Infinity
    const bRight = j < b.length ? b[j] : Infinity
    if (aLeft > bRight) {
      hi = i - 1 // too many items of a on the left
    } else if (bLeft > aRight) {
      lo = i + 1 // too few items of a on the left
    } else {
      const leftMax = Math.max(aLeft, bLeft)
      if ((a.length + b.length) % 2 === 1) return leftMax
      return (leftMax + Math.min(aRight, bRight)) / 2
    }
  }
  throw new RangeError('the inputs must be sorted')
}

if (import.meta.main) console.log(findMedianSortedArrays([1, 3], [2, 4]))
