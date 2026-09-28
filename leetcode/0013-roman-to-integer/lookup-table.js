/**
 * LeetCode 13. Roman to Integer — https://leetcode.com/problems/roman-to-integer/
 * Read a Roman numeral from 1 to 3999 and return its value.
 *
 * Lookup table: next to the seven letters, the table holds the six
 * subtractive pairs (IV, IX, XL, XC, CD, CM). Read from the left: if the
 * next two characters form a pair, add its value and move past both;
 * otherwise add the value of the one letter.
 *
 * Time: O(n). Space: O(1).
 */

const VALUES = new Map([
  ['I', 1], ['IV', 4], ['V', 5], ['IX', 9], ['X', 10], ['XL', 40], ['L', 50],
  ['XC', 90], ['C', 100], ['CD', 400], ['D', 500], ['CM', 900], ['M', 1000],
])

export function romanToInt(s) {
  let total = 0
  for (let i = 0; i < s.length;) {
    const symbol = VALUES.has(s.slice(i, i + 2)) ? s.slice(i, i + 2) : s[i]
    total += VALUES.get(symbol)
    i += symbol.length
  }
  return total
}

if (import.meta.main) console.log(romanToInt('MCMXCIV'))
