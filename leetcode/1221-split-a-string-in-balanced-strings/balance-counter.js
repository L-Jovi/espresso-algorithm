/**
 * LeetCode 1221. Split a String in Balanced Strings —
 * https://leetcode.com/problems/split-a-string-in-balanced-strings/
 * A string of L and R is balanced when it has as many L as R. Cut a
 * balanced string into as many balanced pieces as possible, and return
 * how many there are.
 *
 * A balance counter: walk the string once, counting L as +1 and R as −1.
 * Each time the count comes back to 0, the piece since the last cut is
 * balanced, so cut there. This is the greedy of regex-window.js with the
 * count kept running instead of recomputed.
 *
 * Time: O(n). Space: O(1).
 */

export function balancedStringSplit(s) {
  let pieces = 0
  let balance = 0
  for (const char of s) {
    balance += char === 'L' ? 1 : -1
    if (balance === 0) pieces++
  }
  return pieces
}

if (import.meta.main) console.log(balancedStringSplit('RLRRLLRLRL'))
