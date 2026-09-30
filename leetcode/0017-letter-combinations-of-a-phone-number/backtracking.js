/**
 * LeetCode 17. Letter Combinations of a Phone Number —
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 * List every string that the digits 2–9 can spell on a phone keypad, where
 * 2 stands for "abc", 3 for "def", and so on.
 *
 * Backtracking: choose a letter for the first digit, then, recursively, one
 * for each following digit; when every digit has a letter, record the
 * string. The calls form a tree whose leaves are the answers. Each call gets
 * its own prefix string, so there is nothing to undo on the way back.
 *
 * Time: O(4ⁿ · n): up to 4 letters per digit, and each answer has n
 * characters. Space: O(n) for the recursion, besides the answers.
 * Learning source: https://leetcode.cn/problems/letter-combinations-of-a-phone-number/solutions/13575/leetcode-17-letter-combinations-of-a-phone-number-/
 */

const LETTERS = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']

export function letterCombinations(digits) {
  if (digits === '') return []
  const combinations = []

  function extend(index, prefix) {
    if (index === digits.length) {
      combinations.push(prefix)
      return
    }
    for (const letter of LETTERS[Number(digits[index])]) extend(index + 1, prefix + letter)
  }

  extend(0, '')
  return combinations
}

if (import.meta.main) console.log(letterCombinations('23'))
