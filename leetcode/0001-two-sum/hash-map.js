/**
 * LeetCode 1. Two Sum — https://leetcode.com/problems/two-sum/
 * Return the indexes of the two numbers in the array that add up to the target.
 *
 * Hash map, one pass: for each number, the partner it needs is
 * target − number. Before storing the number, ask the map whether that partner
 * has been seen; if so, the pair is found. Each lookup is O(1) on average,
 * which turns the O(n²) search of brute-force.js into one pass.
 *
 * A Map keeps the indexes as numbers. The first version stored them in a
 * plain object and walked the array with for…in, which yields string keys,
 * so it returned ["0", "1"] instead of [0, 1].
 *
 * Time: O(n). Space: O(n).
 */

export function twoSum(nums, target) {
  const seen = new Map() // number → its index
  for (let i = 0; i < nums.length; i++) {
    const partner = target - nums[i]
    if (seen.has(partner)) return [seen.get(partner), i]
    seen.set(nums[i], i)
  }
  return []
}

if (import.meta.main) console.log(twoSum([2, 7, 11, 15], 9))
