/**
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = function(s) {
  if (!s) {
    return ''

  } else {
    let start = end = 0

    for (let i = 0; i < s.length; i++) {
      let lenOdd = expandAroundCenter(s, i, i)  // length is odd
      let lenEven = expandAroundCenter(s, i, i + 1) // length is even
      let len = Math.max(lenOdd, lenEven)

      // longest than last longest one
      if (len > end - start) {
        start = i - parseInt((len - 1) / 2)   // left shift to start
        end = i + parseInt(len / 2)   // right shift to end
      }
    }

    return s.slice(start, end + 1)
  }
}


/**
 * @param {string} s
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
const expandAroundCenter = function(s, left, right) {
  let l = left
  let r = right

  while ((l >= 0 && r < s.length) && s[l] === s[r]) {
    l--
    r++
  }

  return r - l - 1
}
