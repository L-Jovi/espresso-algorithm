/**
 * LeetCode 6. Zigzag Conversion — https://leetcode.com/problems/zigzag-conversion/
 * Write the string in a zigzag over numRows rows (down, then diagonally up,
 * and so on), then read the rows from top to bottom.
 *
 * Simulation with a direction flag: keep one string per row and a current
 * row. Append each character to the current row, then move down or up; the
 * direction flips whenever the top or bottom row is reached.
 *
 * Time: O(n). Space: O(n).
 */

export function convert(s, numRows) {
  if (numRows < 2 || numRows >= s.length) return s
  const rows = new Array(numRows).fill('')
  let row = 0
  let step = -1
  for (const char of s) {
    rows[row] += char
    if (row === 0 || row === numRows - 1) step = -step
    row += step
  }
  return rows.join('')
}

if (import.meta.main) console.log(convert('PAYPALISHIRING', 3))
