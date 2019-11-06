/**
 * @param {number} num
 * @return {string}
 */
const intToRoman = function(num) {
  // total 13 situations
  const nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const romans = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']

  index = 0
  result = ''

  while (index < 13) {
    const weight = nums[index]
    while (num >= weight) {
      result += romans[index]
      num -= weight 
    }
    index++
  }

  return result
}
