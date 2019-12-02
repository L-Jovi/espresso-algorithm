/*
 * @Description: Adding large numbers implements by Javascript.
 * @FileName: adding-large-numbers/index.js
 */

/**
 * add
 *
 * @param {string} n
 * @param {string} m
 * @returns {string}
 */
function add(n, m) {
  const arrN = n.split('').reverse()
  const arrM = m.split('').reverse()

  // Confirm the maximum number of digits
  const maxLength = Math.max(arrN.length, arrM.length)

  let tmpN = 0
  let tmpM = 0
  let tmpSum = 0  // Temporarily store the sum of each bit
  let carry = 0   // Save carry number
  const result = []   // Save result

  for (let index = 0; index < maxLength; index++) {
    tmpN = arrN[index] || 0
    tmpM = arrM[index] || 0

    tmpSum = tmpN * 1 + tmpM * 1

    if (carry) {
      tmpSum += carry
    }

    carry = tmpSum >= 10 ? 1 : 0

    // The last ten digits are stored directly in the currently calculated sum, the non-last digits are taken as the value after % 10.
    if (index === maxLength - 1 && carry) {
      result.push(tmpSum)
    } else {
      result.push(tmpSum % 10)
    }
  }

  return result.reverse().join('')
}


// test
console.log(add('99', '99'))
