/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = function(text1, text2) {
  const bruteForce = (i, j) => {
    if (text1[i] === text2[j]) {
      return bruteForce(i - 1, j - 1) + 1
    } else {
      return Math.max(
        bruteForce(i - 1, j),
        bruteForce(i, j - 1),
      )
    }
  }

  return bruteForce(text1.length - 1, text2.length - 1)
}


const text1 = 'abcde'
const text2 = 'ace'
const length = longestCommonSubsequence(text1, text2)
console.log(`${text1} ${text2} has longest length: ${length}`)
