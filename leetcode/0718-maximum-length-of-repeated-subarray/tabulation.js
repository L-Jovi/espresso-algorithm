/**
 * LeetCode 718. Maximum Length of Repeated Subarray —
 * https://leetcode.com/problems/maximum-length-of-repeated-subarray/
 * Return the length of the longest run of numbers that appears, in the
 * same order and without gaps, in both arrays.
 *
 * Tabulation: common[i][j] is the length of the longest run that ends
 * exactly at nums1[i − 1] and at nums2[j − 1]. If those two numbers are
 * equal, the run extends the one that ends just before both, so
 * common[i][j] = common[i − 1][j − 1] + 1; otherwise no run ends there, and
 * it is 0. The answer is the largest entry. The extra row and column of
 * zeros stand for "before the first number", so the first row and column
 * need no special case. Unlike LeetCode 1143, which allows gaps, a
 * mismatch starts the count over at 0.
 *
 * Time: O(m · n). Space: O(m · n); keeping one row at a time would do.
 */

export function findLength(nums1, nums2) {
  const common = Array.from({ length: nums1.length + 1 }, () => new Array(nums2.length + 1).fill(0))
  let longest = 0
  for (let i = 1; i <= nums1.length; i++) {
    for (let j = 1; j <= nums2.length; j++) {
      if (nums1[i - 1] !== nums2[j - 1]) continue
      common[i][j] = common[i - 1][j - 1] + 1
      longest = Math.max(longest, common[i][j])
    }
  }
  return longest
}

if (import.meta.main) console.log(findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7]))
