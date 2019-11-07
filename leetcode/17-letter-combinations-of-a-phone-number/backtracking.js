/**
 * @param {string} digits
 * @return {string[]}
 * [https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/solution/leetcode-17-letter-combinations-of-a-phone-number-/]
 */
const letterCombinations = (digits) => {
  const map = [
    ' ',     // 0
    '',      // 1
    'abc',   // 2
    'def',   // 3
    'ghi',   // 4
    'jkl',   // 5
    'mno',   // 6
    'pqrs',  // 7
    'tuv',   // 8
    'wxyz',   // 9
  ]

  const result = []

  if (digits === '') {
    return result
  }

  findCombination(map, digits, 0, result, '')

  return result
}


const findCombination = (map, digits, index, result, strCombo) => {
  if (index === digits.length) {
    result.push(strCombo)
    return

  } else {
    const strNum = digits[index]
    const letters = map[strNum - '0']

    for (let i = 0; i < letters.length; i++) {
      findCombination(map, digits, index + 1, result, strCombo + letters[i])
    }

    return
  }
}
