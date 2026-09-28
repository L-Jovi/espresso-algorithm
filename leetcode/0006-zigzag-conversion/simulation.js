/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
const convert = function(s, numRows) {
  if (numRows < 2) {
    return s

  } else {
    const result = []
    for (let i = 0; i < numRows; i++) {
      result[i] = ''
    }

    let index = 0
    let flag = -1
    for (let i in s) {
      result[index] += s[i]
      if (index === 0 || index === numRows - 1) {
        flag = -flag
      }
      index += flag
    }

    return result.join('')
  }
}


const s = 'saber'
const numRows = 4
console.log(convert(s, numRows))
