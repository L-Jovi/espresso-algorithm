/**
 * LeetCode 5. Longest Palindromic Substring —
 * https://leetcode.com/problems/longest-palindromic-substring/
 * Return the longest substring that reads the same forwards and backwards.
 *
 * Tabulation: isPalindrome[i][j] says whether s[i..j] is a palindrome. A
 * substring is one when its two ends match and the part between them is one
 * (or is shorter than two characters). Filling i from the end of the string
 * backwards guarantees that isPalindrome[i + 1][j − 1] is known in time.
 *
 * Time: O(n²). Space: O(n²). expand-around-center.js needs only O(1) space.
 */

export function longestPalindrome(s) {
  if (s.length === 0) return ''
  const isPalindrome = Array.from({ length: s.length }, () => new Array(s.length).fill(false))
  let best = s[0]
  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i; j < s.length; j++) {
      isPalindrome[i][j] = s[i] === s[j] && (j - i < 2 || isPalindrome[i + 1][j - 1])
      if (isPalindrome[i][j] && j - i + 1 > best.length) best = s.slice(i, j + 1)
    }
  }
  return best
}

if (import.meta.main) console.log(longestPalindrome('babad'))
