import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { solveNQueens } from './backtracking.js'

checkApproaches({ backtracking: solveNQueens }, [
  { input: [4], expected: [['.Q..', '...Q', 'Q...', '..Q.'], ['..Q.', 'Q...', '...Q', '.Q..']] },
  { input: [1], expected: [['Q']] },
  { input: [2], expected: [] },
  { input: [3], expected: [] },
])

const isPeaceful = board => {
  const queens = board.map(row => row.indexOf('Q'))
  return board.every(row => row.split('Q').length === 2) &&
    queens.every((c, r) => queens.every((c2, r2) => r === r2 || (c !== c2 && Math.abs(c - c2) !== Math.abs(r - r2))))
}

it('finds the known number of solutions for n up to 9, each of them valid and distinct', () => {
  const known = [1, 0, 0, 2, 10, 4, 40, 92, 352] // OEIS A000170
  known.forEach((count, i) => {
    const boards = solveNQueens(i + 1)
    assert.equal(boards.length, count, `n = ${i + 1}`)
    assert.equal(new Set(boards.map(String)).size, count)
    assert.ok(boards.every(isPeaceful))
  })
})
