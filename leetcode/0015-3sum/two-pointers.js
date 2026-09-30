/**
 * LeetCode 15. 3Sum — https://leetcode.com/problems/3sum/
 * Find every distinct triple of numbers in the array that adds up to 0.
 *
 * Sort, then two pointers: fix the smallest number of the triple, sorted[i],
 * and look to its right for two more that add up to −sorted[i]. Start with
 * the outermost pair. If the sum is too small, only moving the left pointer
 * right can raise it; if it is too large, only moving the right pointer left
 * can lower it. Skipping equal neighbors after each choice keeps the triples
 * distinct, and once sorted[i] > 0, no triple can add up to 0.
 *
 * Time: O(n²). Space: O(n) for the sorted copy; the input is left alone.
 * Learning source: https://leetcode.cn/problems/3sum/solutions/12307/hua-jie-suan-fa-15-san-shu-zhi-he-by-guanpengchn/
 */

export function threeSum(nums) {
  const sorted = nums.toSorted((a, b) => a - b)
  const triples = []
  for (let i = 0; i < sorted.length - 2 && sorted[i] <= 0; i++) {
    if (i > 0 && sorted[i] === sorted[i - 1]) continue
    let left = i + 1
    let right = sorted.length - 1
    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right]
      if (sum < 0) {
        left++
      } else if (sum > 0) {
        right--
      } else {
        triples.push([sorted[i], sorted[left], sorted[right]])
        while (left < right && sorted[left] === sorted[left + 1]) left++
        while (left < right && sorted[right] === sorted[right - 1]) right--
        left++
        right--
      }
    }
  }
  return triples
}

if (import.meta.main) console.log(threeSum([-1, 0, 1, 2, -1, -4]))
