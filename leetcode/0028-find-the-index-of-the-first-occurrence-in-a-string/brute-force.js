/**
 * LeetCode 28. Find the Index of the First Occurrence in a String —
 * https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
 * Return where `needle` first appears in `haystack`, or −1 if it does not.
 * The problem used to be called "Implement strStr()".
 *
 * Brute force: try every start position and compare character by character.
 * After a mismatch it starts again one position later and forgets what it
 * has just read, so a text of n characters and a pattern of m cost up to
 * O(n · m), for example "aaaa…ab" searched in "aaaa…a". kmp.js never rereads.
 *
 * Time: O(n · m) in the worst case. Space: O(1).
 */

export function strStr(haystack, needle) {
  for (let start = 0; start + needle.length <= haystack.length; start++) {
    let matched = 0
    while (matched < needle.length && haystack[start + matched] === needle[matched]) matched++
    if (matched === needle.length) return start
  }
  return -1
}

if (import.meta.main) console.log(strStr('sadbutsad', 'sad'), strStr('leetcode', 'leeto'))
