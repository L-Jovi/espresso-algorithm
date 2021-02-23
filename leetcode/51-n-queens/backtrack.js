/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function(n) {
  const results = []
  const chess = Array.from(Array(n), () => Array(n).fill('.'))
  console.log('init chess: ', chess)

  const backtrack = (row) => {
    if (row === n) {
      const res = chess.map(row => row.join(''))
      results.push(res)
      return
    }

    for (let column = 0; column < n; column++) {
      if (isValid(row, column)) {
        chess[row][column] = 'Q'
        backtrack(row + 1)
        chess[row][column] = '.'
      }
    }
  }

  const isValid = (row, column) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < n; j++) {
        if (chess[i][j] === 'Q') {
          if (j === column ||
            i + j === row + column ||
            i - j === row - column
          ) {
            return false
          }
        }
      }
    }

    return true
  }

  backtrack(0)
  return results
}


console.log(solveNQueens(4))
// [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
