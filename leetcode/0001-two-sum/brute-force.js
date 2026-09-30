/**
 * LeetCode 1. Two Sum — https://leetcode.com/problems/two-sum/
 * Return the indexes of the two numbers in the array that add up to the target.
 *
 * Brute force: try every pair i < j. It is the definition written as code,
 * and the baseline that hash-map.js improves on.
 *
 * Time: O(n²). Space: O(1).
 */

export function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j]
    }
  }
  return []
}

if (import.meta.main) console.log(twoSum([2, 7, 11, 15], 9))
