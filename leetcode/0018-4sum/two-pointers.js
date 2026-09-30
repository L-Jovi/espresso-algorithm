/**
 * LeetCode 18. 4Sum — https://leetcode.com/problems/4sum/
 * Find every distinct group of four numbers in the array that adds up to the
 * target.
 *
 * Sort, then two pointers, one level deeper than 3Sum (15): fix the two
 * smallest numbers with two loops, and find the other two with a pair of
 * pointers walking inwards. Skipping equal neighbors at every level keeps
 * the groups distinct.
 *
 * Four numbers of up to 10⁹ can add up to 4 · 10⁹, which does not fit in 32
 * bits: a classic trap in Java and C++, where [10⁹, 10⁹, 10⁹, 10⁹] with
 * target −294967296 wraps around and matches. JavaScript numbers are
 * doubles and add these exactly.
 *
 * Time: O(n³). Space: O(n) for the sorted copy; the input is left alone.
 */

export function fourSum(nums, target) {
  const sorted = nums.toSorted((a, b) => a - b)
  const n = sorted.length
  const groups = []
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && sorted[i] === sorted[i - 1]) continue
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && sorted[j] === sorted[j - 1]) continue
      let left = j + 1
      let right = n - 1
      while (left < right) {
        const sum = sorted[i] + sorted[j] + sorted[left] + sorted[right]
        if (sum < target) {
          left++
        } else if (sum > target) {
          right--
        } else {
          groups.push([sorted[i], sorted[j], sorted[left], sorted[right]])
          while (left < right && sorted[left] === sorted[left + 1]) left++
          while (left < right && sorted[right] === sorted[right - 1]) right--
          left++
          right--
        }
      }
    }
  }
  return groups
}

if (import.meta.main) console.log(fourSum([1, 0, -1, 0, -2, 2], 0))
