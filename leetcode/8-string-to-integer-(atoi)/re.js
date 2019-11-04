/**
 * @param {string} str
 * @return {number}
 */
const myAtoi = function(str) {
  const s = str.trimLeft()
  const re = /^[\+\-]?\d+/
  const result = re.exec(s)

  if (result) {
    let num = result[0]
    num = Math.max(Math.min(num, Math.pow(2, 31) - 1), -Math.pow(2, 31))
    return num

  } else {
    return 0
  }
}
