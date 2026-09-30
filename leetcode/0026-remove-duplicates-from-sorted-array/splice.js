/**
 * LeetCode 26. Remove Duplicates from Sorted Array —
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 * In a sorted array, keep each value once, in place, and return how many
 * values are kept; they must fill the start of the array, in order.
 *
 * splice(): walk the array and delete every item that equals the one before
 * it. It reads naturally, but each splice shifts everything after it one
 * step left, so an array full of duplicates costs O(n²).
 * two-pointers.js does the same in one pass.
 *
 * Time: O(n²) in the worst case. Space: O(1).
 */

export function removeDuplicates(nums) {
  let i = 1
  while (i < nums.length) {
    if (nums[i] === nums[i - 1]) nums.splice(i, 1)
    else i++
  }
  return nums.length
}

if (import.meta.main) {
  const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
  const k = removeDuplicates(nums)
  console.log(k, nums.slice(0, k))
}
