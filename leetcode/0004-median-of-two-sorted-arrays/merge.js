/**
 * LeetCode 4. Median of Two Sorted Arrays —
 * https://leetcode.com/problems/median-of-two-sorted-arrays/
 * Return the median of all numbers of two sorted arrays together.
 *
 * Merge: walk both arrays with two indexes, as the merge step of merge sort
 * does, and take the middle one or two numbers of the merged order. It is
 * easy to follow, but it reads about half of all the numbers; the problem asks
 * for O(log(m + n)), which binary-search.js achieves.
 *
 * Time: O(m + n). Space: O(m + n). The inputs are not changed.
 */

export function findMedianSortedArrays(nums1, nums2) {
  const merged = []
  let i = 0
  let j = 0
  while (i < nums1.length && j < nums2.length) merged.push(nums1[i] <= nums2[j] ? nums1[i++] : nums2[j++])
  while (i < nums1.length) merged.push(nums1[i++])
  while (j < nums2.length) merged.push(nums2[j++])

  const middle = merged.length >> 1
  return merged.length % 2 === 1 ? merged[middle] : (merged[middle - 1] + merged[middle]) / 2
}

if (import.meta.main) console.log(findMedianSortedArrays([1, 3], [2, 4]))
