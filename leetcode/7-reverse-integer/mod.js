/**
 * @param {number} x
 * @return {number}
 */
const reverse = (x) => {
  const top = Math.pow(2, 31)
  const bottom = -top

  let pop = 0
  let result = 0
  while (x !== 0) {
    pop = x % 10

    result = result * 10 + pop
    if (result >= top || result <= bottom) {
      return 0
    }

    x = parseInt(x / 10)
  }

  return result
}


reverse(1534236469)
