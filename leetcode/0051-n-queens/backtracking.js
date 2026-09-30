/**
 * LeetCode 51. N-Queens — https://leetcode.com/problems/n-queens/
 * List every way to place n chess queens on an n × n board so that no two
 * attack each other: no two share a row, a column or a diagonal.
 *
 * Backtracking, one row at a time: every row needs exactly one queen, so
 * `queens[row]` is the column of the queen in that row. For each column of
 * the current row, check it against the queens above; if it is safe, place
 * the queen and continue with the next row. When all n rows are filled,
 * draw the board. Keeping sets of the used columns and diagonals would
 * make the check O(1) instead of O(n).
 *
 * Two queens share a diagonal when their row distance equals their column
 * distance.
 *
 * Time: O(n!) placements at most, each checked in O(n). Space: O(n), besides
 * the answers.
 */

export function solveNQueens(n) {
  const boards = []
  const queens = []

  const isSafe = (row, column) =>
    queens.every((c, r) => c !== column && Math.abs(c - column) !== row - r)

  function place(row) {
    if (row === n) {
      boards.push(queens.map(c => '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1)))
      return
    }
    for (let column = 0; column < n; column++) {
      if (!isSafe(row, column)) continue
      queens.push(column)
      place(row + 1)
      queens.pop()
    }
  }

  place(0)
  return boards
}

if (import.meta.main) console.log(solveNQueens(4))
