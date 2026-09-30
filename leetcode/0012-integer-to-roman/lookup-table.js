/**
 * LeetCode 12. Integer to Roman — https://leetcode.com/problems/integer-to-roman/
 * Write a number from 1 to 3999 in Roman numerals.
 *
 * Lookup table: each decimal digit turns into Roman symbols on its own, so
 * spell out the ten possibilities for the ones, tens, hundreds and
 * thousands, and join the four that the digits pick.
 *
 * Time: O(1). Space: O(1).
 */

const THOUSANDS = ['', 'M', 'MM', 'MMM']
const HUNDREDS = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
const TENS = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']
const ONES = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']

export function intToRoman(num) {
  return THOUSANDS[Math.floor(num / 1000)] +
    HUNDREDS[Math.floor(num / 100) % 10] +
    TENS[Math.floor(num / 10) % 10] +
    ONES[num % 10]
}

if (import.meta.main) console.log(intToRoman(1994), intToRoman(3888))
