/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function(s, p) {
  let memo = []
  for (let i = 0; i <= s.length; i++) {
    memo[i] = []
    for (let j = 0; j <= p.length; j++) {
      memo[i][j] = null
    }
  }
  return dp(memo, 0, 0, s, p)
}

const Result = {
  FALSE: 0,
  TRUE: 1
}


function dp(memo, i, j, s, p) {
  if (memo[i][j] !== null) {
    return memo[i][j] === Result.TRUE
  }
  let ans = false
  if (j === p.length) {
    ans = i === s.length
  } else {
    let firstMatch = (i < s.length) &&
      (p.charAt(j) === s.charAt(i) || p.charAt(j) === ".")

    if (j + 1 < p.length && p.charAt(j + 1) === "*") {
      ans = (dp(memo, i, j + 2, s, p) ||
        firstMatch && dp(memo, i + 1, j, s, p))
    } else {
      ans = firstMatch && dp(memo, i + 1, j + 1, s, p)
    }
  }
  memo[i][j] = ans ? Result.TRUE : Result.FALSE
  return ans
}
