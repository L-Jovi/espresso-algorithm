/**
 * LeetCode 16. 3Sum Closest — https://leetcode.com/problems/3sum-closest/
 * Return the sum of three numbers from the array that is closest to the target.
 *
 * Sort, then two pointers, as in 3Sum (15): fix sorted[i] and walk a pair
 * inwards from both ends of the rest, remembering the closest sum seen. A
 * sum below the target can only get closer by moving the left pointer right,
 * a sum above it by moving the right pointer left, and an exact hit cannot
 * be beaten.
 *
 * Time: O(n²). Space: O(n) for the sorted copy; the input is left alone.
 */

export function threeSumClosest(nums, target) {
  const sorted = nums.toSorted((a, b) => a - b)
  let closest = sorted[0] + sorted[1] + sorted[2]
  for (let i = 0; i < sorted.length - 2; i++) {
    let left = i + 1
    let right = sorted.length - 1
    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right]
      if (Math.abs(sum - target) < Math.abs(closest - target)) closest = sum
      if (sum < target) left++
      else if (sum > target) right--
      else return sum
    }
  }
  return closest
}

if (import.meta.main) console.log(threeSumClosest([-1, 2, 1, -4], 1))
