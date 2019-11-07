/**
 * @param {number} n
 * @return {string[]}
 * [https://leetcode.com/problems/generate-parentheses/discuss/10100/Easy-to-understand-Java-backtracking-solution]
 */
const generateParenthesis = function(n) {
  const list = []
  backtrack(list, '', 0, 0, n)
  return list
}


// left  => (
// right => )
const backtrack = (list, str, left, right, n) => {
  if (str.length === 2 * n) {
    list.push(str)
    return
  }

  if (left < n) {
    backtrack(list, str + '(', left + 1, right, n)
  }

  if (right < left) {
    backtrack(list, str + ')', left, right + 1, n)
  }
}


console.log(generateParenthesis(3))
