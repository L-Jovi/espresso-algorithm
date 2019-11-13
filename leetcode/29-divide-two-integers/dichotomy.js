/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 * @refer {https://github.com/azl397985856/leetcode/blob/master/problems/29.divide-two-integers.md}
 */
const divide = function(dividend, divisor) {
  if (divisor === 1) {
    return dividend
  }

  const MAX_INTERGER = Math.pow(2, 31);
  const isNegative = dividend > 0 !== divisor > 0

  const res = dichotomy(Math.abs(dividend), Math.abs(divisor))

  if (res > MAX_INTERGER - 1 || res < -1 * MAX_INTERGER) {
    return MAX_INTERGER - 1;
  }

  return isNegative ? 0 - res : res
}


const dichotomy = (dividend, divisor) => {
  if (dividend <= 0) {
    return dividend

  } else if (dividend < divisor) {
    return 0

  } else if (divisor === 1) {
    return dividend

  } else {
    let acc = 2 * divisor
    let count = 1

    while (dividend - acc > 0) {
      acc += acc
      count += count
    }

    const last = dividend - Math.floor(acc / 2)

    return count + dichotomy(last, divisor)
  }
}


let dividend = -2147483648
let divisor = 1
console.log(divide(dividend, divisor))
