/**
 * LeetCode 11. Container With Most Water —
 * https://leetcode.com/problems/container-with-most-water/
 * Choose two of the vertical lines so that, with the x-axis, they hold the
 * most water, and return that amount.
 *
 * Two pointers: start with the widest pair, the first and the last line.
 * The water level is set by the shorter of the two. Pairing the shorter line
 * with any line further in gives a narrower container whose level can't
 * exceed that same shorter line, so none of those pairs can do better: drop
 * the shorter line and move its pointer inwards. Each step drops one line,
 * so n − 1 steps are enough.
 *
 * Time: O(n). Space: O(1).
 */

export function maxArea(height) {
  let best = 0
  let left = 0
  let right = height.length - 1
  while (left < right) {
    best = Math.max(best, Math.min(height[left], height[right]) * (right - left))
    if (height[left] < height[right]) left++
    else right--
  }
  return best
}

if (import.meta.main) console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
