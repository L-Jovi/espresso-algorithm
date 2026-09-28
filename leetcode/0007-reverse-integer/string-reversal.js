/**
 * @param {number} x
 * @return {number}
 */
const reverse = function(x) {
  let str = x + ''

  let flag = false
  if (str[0] === '-') {
    str = str.slice(1)
    flag = true
  }

  let num = str.split('').reverse().join('') * 1
  if (num >= Math.pow(2, 31)) {
    return 0
  } else {
    return flag ? num * -1 : num
  }
}
