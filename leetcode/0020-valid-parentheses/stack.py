#!/usr/bin/env python3
"""LeetCode 20. Valid Parentheses, the same approach as stack.js.

https://leetcode.com/problems/valid-parentheses/

Push every opening bracket; a closing bracket must match the top of the
stack. The string is valid when every closing bracket matched and nothing
is left open at the end.

Time: O(n). Space: O(n).
"""

# Closing bracket -> the opening bracket it closes.
OPENER = {")": "(", "]": "[", "}": "{"}


class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        for char in s:
            if char not in OPENER:
                stack.append(char)
            elif not stack or stack.pop() != OPENER[char]:
                return False
        return not stack


if __name__ == "__main__":
    print(Solution().isValid("()[]{}"), Solution().isValid("([)]"))
