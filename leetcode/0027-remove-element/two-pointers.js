/**
 * LeetCode 27. Remove Element — https://leetcode.com/problems/remove-element/
 * Remove every occurrence of a value from an array, in place, and return how
 * many items are left; they must fill the start of the array.
 *
 * Two pointers: `fast` reads every item, and `kept` counts the items kept so
 * far. Each item that is not the value is copied to position `kept`, which
 * is never ahead of `fast`, so nothing is overwritten before it is read.
 *
 * Time: O(n). Space: O(1).
 */

export function removeElement(nums, val) {
  let kept = 0
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) nums[kept++] = nums[fast]
  }
  return kept
}

if (import.meta.main) {
  const nums = [0, 1, 2, 2, 3, 0, 4, 2]
  const k = removeElement(nums, 2)
  console.log(k, nums.slice(0, k))
}
