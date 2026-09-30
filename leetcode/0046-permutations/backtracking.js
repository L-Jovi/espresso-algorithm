/**
 * LeetCode 46. Permutations — https://leetcode.com/problems/permutations/
 * List every ordering of an array of distinct numbers.
 *
 * Backtracking: grow one ordering in `path`. At each step, try every number
 * not used yet: add it, let the recursion fill the remaining places, then
 * take it back out (the "backtrack") so the next number can take its place.
 * A full path is one answer; it is copied, because `path` keeps changing.
 * `used[i]` answers "is nums[i] already in the path?" in O(1).
 *
 * Time: O(n · n!): n! orderings of n numbers each. Space: O(n) for the path
 * and the recursion, besides the answers.
 */

export function permute(nums) {
  const orderings = []
  const path = []
  const used = new Array(nums.length).fill(false)

  function extend() {
    if (path.length === nums.length) {
      orderings.push([...path])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue
      used[i] = true
      path.push(nums[i])
      extend()
      path.pop()
      used[i] = false
    }
  }

  extend()
  return orderings
}

if (import.meta.main) console.log(permute([1, 2, 3]))
