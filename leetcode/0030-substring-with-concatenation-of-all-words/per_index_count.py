#!/usr/bin/env python3
"""LeetCode 30. Substring with Concatenation of All Words, as in per-index-count.js.

https://leetcode.com/problems/substring-with-concatenation-of-all-words/

For every start position, cut the next len(words) pieces out of s and tick
them off a copy of the word counts; the position is an answer when every
piece was needed. A Python dict has no inherited keys, so words such as
"constructor" need no special care here.

Time: O(n * m * w) for n characters and m words of length w. Space: O(m).
"""

from collections import Counter


class Solution:
    def findSubstring(self, s: str, words: list[str]) -> list[int]:
        if not words:
            return []
        word_length = len(words[0])
        window_length = len(words) * word_length
        needed = Counter(words)

        starts = []
        for start in range(len(s) - window_length + 1):
            left = needed.copy()
            for at in range(start, start + window_length, word_length):
                piece = s[at:at + word_length]
                if left[piece] == 0:
                    break
                left[piece] -= 1
            else:
                starts.append(start)
        return starts


if __name__ == "__main__":
    print(Solution().findSubstring("barfoothefoobarman", ["foo", "bar"]))
