/**
 * LeetCode 20. Valid Parentheses — https://leetcode.com/problems/valid-parentheses/
 * Tell whether every bracket in a string of ()[]{} is closed by the same kind
 * of bracket, in the right order.
 *
 * Stack: push every opening bracket. A closing bracket must match the most
 * recent opening bracket that is still open, which is the top of the stack:
 * pop it and compare. At the end every opening bracket must have been
 * closed, so the stack must be empty.
 *
 * Time: O(n). Space: O(n).
 */

// Closing bracket → the opening bracket it closes.
const OPENER = new Map([[')', '('], [']', '['], ['}', '{']])

export function isValid(s) {
  const stack = []
  for (const char of s) {
    if (!OPENER.has(char)) stack.push(char)
    else if (stack.pop() !== OPENER.get(char)) return false
  }
  return stack.length === 0
}

if (import.meta.main) console.log(isValid('()[]{}'), isValid('([)]'))
