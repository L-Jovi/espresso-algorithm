/**
 * LeetCode 12. Integer to Roman — https://leetcode.com/problems/integer-to-roman/
 * Write a number from 1 to 3999 in Roman numerals.
 *
 * Greedy: Roman numerals are written from the largest value down. Next to
 * the seven letters, list the six subtractive pairs (CM = 900, CD = 400,
 * XC = 90, XL = 40, IX = 9, IV = 4) as if they were letters too. Then keep
 * writing the largest symbol that still fits and subtract its value.
 *
 * Time: O(1): no number up to 3999 needs more than 15 symbols (3888 is
 * MMMDCCCLXXXVIII). Space: O(1).
 */

const SYMBOLS = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

export function intToRoman(num) {
  let roman = ''
  for (const [value, symbol] of SYMBOLS) {
    while (num >= value) {
      roman += symbol
      num -= value
    }
  }
  return roman
}

if (import.meta.main) console.log(intToRoman(1994), intToRoman(3888))
