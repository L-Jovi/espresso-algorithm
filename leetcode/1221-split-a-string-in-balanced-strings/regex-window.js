/**
 * LeetCode 1221. Split a String in Balanced Strings —
 * https://leetcode.com/problems/split-a-string-in-balanced-strings/
 * A string of L and R is balanced when it has as many L as R. Cut a
 * balanced string into as many balanced pieces as possible, and return
 * how many there are.
 *
 * A growing window and a regex: grow the current piece two characters at a
 * time (a balanced piece has an even length), count its L with a regular
 * expression, and cut as soon as the piece is balanced. Cutting at the
 * first chance never loses anything, because what is left of the string is
 * then balanced as well. Counting from scratch at every step costs O(n²);
 * balance-counter.js keeps a running count instead.
 *
 * Time: O(n²). Space: O(n) for the current piece.
 */

export function balancedStringSplit(s) {
  let pieces = 0
  let start = 0
  for (let end = 2; end <= s.length; end += 2) {
    const piece = s.slice(start, end)
    if ((piece.match(/L/g)?.length ?? 0) * 2 === piece.length) {
      pieces++
      start = end
    }
  }
  return pieces
}

if (import.meta.main) console.log(balancedStringSplit('RLRRLLRLRL'))
