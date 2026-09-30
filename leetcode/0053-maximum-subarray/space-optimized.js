/**
 * LeetCode 53. Maximum Subarray — https://leetcode.com/problems/maximum-subarray/
 * Return the largest sum of a non-empty run of neighboring numbers in the
 * array.
 *
 * Space-optimized, known as Kadane's algorithm: the table in tabulation.js
 * is only ever read one step back, dp[i − 1], so a single variable,
 * `endingHere`, can replace it. Walk the array once, keep the best sum that
 * ends at the current number, and remember the best of those.
 *
 * Time: O(n). Space: O(1).
 */

export function maxSubArray(nums) {
  let endingHere = nums[0]
  let best = nums[0]
  for (let i = 1; i < nums.length; i++) {
    endingHere = Math.max(nums[i], endingHere + nums[i])
    best = Math.max(best, endingHere)
  }
  return best
}

if (import.meta.main) console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
