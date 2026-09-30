/**
 * LeetCode 26. Remove Duplicates from Sorted Array —
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 * In a sorted array, keep each value once, in place, and return how many
 * values are kept; they must fill the start of the array, in order.
 *
 * Two pointers: `slow` marks the last value kept, and `fast` reads ahead.
 * In a sorted array a new value is one that differs from the last one kept;
 * copy it just after `slow`. Nothing is shifted, so one pass is enough. The
 * items after the first k are left as they are, which the problem allows.
 *
 * Time: O(n). Space: O(1).
 */

export function removeDuplicates(nums) {
  if (nums.length === 0) return 0
  let slow = 0
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) nums[++slow] = nums[fast]
  }
  return slow + 1
}

if (import.meta.main) {
  const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
  const k = removeDuplicates(nums)
  console.log(k, nums.slice(0, k))
}
