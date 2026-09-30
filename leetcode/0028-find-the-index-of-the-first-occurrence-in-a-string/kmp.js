/**
 * LeetCode 28. Find the Index of the First Occurrence in a String —
 * https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
 * Return where `needle` first appears in `haystack`, or −1 if it does not.
 *
 * KMP (Knuth–Morris–Pratt): before searching, compute for every prefix of
 * the pattern the longest proper prefix that is also its suffix. After a
 * mismatch, that length says how much of the pattern still matches the
 * characters just read, so the search never moves backwards in the text.
 * The implementation lives in searching/kmp/kmp.js, whose header explains
 * it step by step; this file is its entry in the LeetCode folder.
 *
 * Time: O(n + m). Space: O(m) for the prefix table.
 */

import { strStr } from '../../searching/kmp/kmp.js'

export { strStr }

if (import.meta.main) console.log(strStr('sadbutsad', 'sad'), strStr('leetcode', 'leeto'))
