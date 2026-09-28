/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
const findLength = function(A, B) {
  const lengthA = A.length
  const lengthB = B.length

  if (lengthA < 1 || lengthB < 1) {
    return 0
  }

  let max = 0

  // build records
  const records = Array.from(Array(lengthA), () => Array(lengthB).fill(0))

  // fill 1st column
  for (let i = 0; i < lengthA; i++) {
    if (A[i] === B[0]) {
      records[i][0] = 1
      max = 1
    } else {
      records[i][0] = 0
    }
  }

  // fill 1st row
  for (let j = 0; j < lengthB; j++) {
    if (A[0] === B[j]) {
      records[0][j] = 1
      max = 1
    } else {
      records[0][j] = 0
    }
  }

  // compare current num start from records[1][1]
  for (let i = 1; i < lengthA; i++) {
    for (let j = 1; j < lengthB; j++) {
      if (A[i] === B[j]) {
        const current = records[i - 1][j - 1] + 1
        records[i][j] = current
        max = Math.max(max, current)
      } else {
        records[i][j] = 0
      }
    }
  }

  return max
}


const arr1 = [ 1, 2, 3, 2, 1 ]
const arr2 = [ 3, 2, 1, 4, 7 ]
console.log(findLength(arr1, arr2))
