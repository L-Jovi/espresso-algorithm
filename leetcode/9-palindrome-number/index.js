/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function(x) {
  if (x < 0) {
    return false
  }

  let y = x
  let result = 0
  while (y !== 0) {
    const pop = y % 10
    result = result * 10 + pop
    y = parseInt(y / 10)
  }

  return x === result ? true : false
}
