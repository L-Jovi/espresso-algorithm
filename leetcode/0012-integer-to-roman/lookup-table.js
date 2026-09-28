/**
 * @param {number} num
 * @return {string}
 */
const intToRoman = function(num) {
  const thounsand = ['', 'M', 'MM', 'MMM']
  const hundred = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
  const ten = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']
  const single = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']

  return thounsand[Math.floor(num / 1000)] + 
    hundred[Math.floor((num % 1000) / 100)] +
    ten[Math.floor((num % 100) / 10)] +
    single[num % 10]
}
