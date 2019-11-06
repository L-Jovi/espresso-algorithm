/**
 * @param {string} s
 * @return {number}
 */
const romanToInt = function(s) {
  const map = {
    'I': 1,
    'IV': 4,
    'V': 5,
    'IX': 9,
    'X': 10,
    'XL': 40,
    'L': 50,
    'XC': 90,
    'C': 100,
    'CD': 400,
    'D': 500,
    'CM': 900,
    'M': 1000
  }

  let ans = 0
  for (let i = 0; i < s.length;) {
    // 2 serial chars
    if (i + 1 < s.length && s.slice(i, i + 2) in map) {
      ans += map[s.slice(i, i + 2)]
      i += 2

    } else {
      ans += map[s.slice(i, i + 1)]
      i += 1
    }
  }

  return ans
}


console.log(romanToInt('MCMXCIV'))
