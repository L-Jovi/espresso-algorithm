/**
 * LeetCode 53. Maximum Subarray — https://leetcode.com/problems/maximum-subarray/
 * Return the largest sum of a non-empty run of neighboring numbers in the
 * array.
 *
 * Tabulation: let dp[i] be the largest sum of a subarray that ends exactly
 * at i. That subarray either is nums[i] alone, or extends the best one
 * ending at i − 1; so dp[i] = max(nums[i], dp[i − 1] + nums[i]). A negative
 * dp[i − 1] can only hurt, and is dropped. The answer is the largest dp[i].
 *
 * Time: O(n). Space: O(n) for the table; space-optimized.js needs only O(1).
 * Learning source: https://leetcode.cn/problems/maximum-subarray/solutions/42428/zui-da-zi-xu-he-cshi-xian-si-chong-jie-fa-bao-li-f/
 */

export function maxSubArray(nums) {
  const dp = new Array(nums.length)
  dp[0] = nums[0]
  let best = dp[0]
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
    best = Math.max(best, dp[i])
  }
  return best
}

if (import.meta.main) console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
