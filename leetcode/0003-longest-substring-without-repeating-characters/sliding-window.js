/**
 * LeetCode 3. Longest Substring Without Repeating Characters —
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * Return the length of the longest substring in which no character repeats.
 *
 * Sliding window: keep a window s[start..i] with no repeated character. Move i
 * one character at a time. If s[i] was last seen inside the window, move start
 * just past that earlier position, so the window is valid again. A map from
 * character to "last position + 1" lets start jump there in one step, so every
 * character is handled once.
 *
 * Time: O(n). Space: O(k) for the k different characters.
 */

export function lengthOfLongestSubstring(s) {
  const nextStart = new Map() // character → one past its last position
  let start = 0
  let longest = 0
  for (let i = 0; i < s.length; i++) {
    if (nextStart.has(s[i])) start = Math.max(start, nextStart.get(s[i]))
    longest = Math.max(longest, i - start + 1)
    nextStart.set(s[i], i + 1)
  }
  return longest
}

if (import.meta.main) console.log(lengthOfLongestSubstring('abcabcbb'))
