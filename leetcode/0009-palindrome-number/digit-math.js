/**
 * LeetCode 9. Palindrome Number — https://leetcode.com/problems/palindrome-number/
 * Tell whether an integer reads the same forwards and backwards, without
 * turning it into a string.
 *
 * Digit math: rebuild the number with its digits reversed (pop the last
 * digit with % 10, push it with · 10 +) and compare. A negative number is
 * never a palindrome, because of its minus sign.
 *
 * With fixed-size integers the reversed number can overflow: 1,999,999,999
 * fits in 32 bits, but 9,999,999,991 does not. Reversing only the lower half
 * of the digits, until it is at least as large as the upper half, avoids
 * that and does half the work. JavaScript numbers are doubles, so here the
 * full reversal is exact.
 *
 * Time: O(d) for d digits. Space: O(1).
 */

export function isPalindrome(x) {
  if (x < 0) return false
  let rest = x
  let reversed = 0
  while (rest !== 0) {
    reversed = reversed * 10 + (rest % 10)
    rest = Math.trunc(rest / 10)
  }
  return reversed === x
}

if (import.meta.main) console.log(isPalindrome(121), isPalindrome(-121), isPalindrome(10))
