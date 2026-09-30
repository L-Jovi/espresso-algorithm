/**
 * LeetCode 5. Longest Palindromic Substring —
 * https://leetcode.com/problems/longest-palindromic-substring/
 * Return the longest substring that reads the same forwards and backwards.
 *
 * Expand around the center: every palindrome is symmetric around its middle,
 * which is either one character (odd length) or the gap between two
 * (even length). For each of the 2n − 1 possible centers, grow outwards while
 * the characters on both sides match, and remember the longest.
 *
 * Time: O(n²) in the worst case, but no table: O(1) extra space, and much
 * faster than tabulation.js in practice.
 */

export function longestPalindrome(s) {
  let start = 0
  let end = -1
  for (let i = 0; i < s.length; i++) {
    const length = Math.max(expandAroundCenter(s, i, i), expandAroundCenter(s, i, i + 1))
    if (length > end - start + 1) {
      start = i - Math.floor((length - 1) / 2)
      end = i + Math.floor(length / 2)
    }
  }
  return s.slice(start, end + 1)
}

/** Length of the longest palindrome centered between left and right. */
function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--
    right++
  }
  return right - left - 1
}

if (import.meta.main) console.log(longestPalindrome('babad'))
