/**
 * LeetCode 53. Maximum Subarray — https://leetcode.com/problems/maximum-subarray/
 * Return the largest sum of a non-empty run of neighboring numbers in the
 * array.
 *
 * Brute force: try every subarray nums[i..j]. Its sum is the sum of
 * nums[i..j − 1] plus nums[j], so one running sum per start position gives
 * every sum without adding the same numbers again.
 *
 * The first version stored all n² sums in a table: it ran out of memory at
 * 50,000 items (measured), while LeetCode allows 100,000. It also started
 * from 0, and so returned 0 when every number is negative.
 *
 * Time: O(n²). Space: O(1).
 */

export function maxSubArray(nums) {
  let best = -Infinity
  for (let i = 0; i < nums.length; i++) {
    let sum = 0
    for (let j = i; j < nums.length; j++) {
      sum += nums[j]
      best = Math.max(best, sum)
    }
  }
  return best
}

if (import.meta.main) console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
