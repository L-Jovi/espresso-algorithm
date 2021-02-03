/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = function(text1, text2) {
  if (!text1 || !text2) {
    return 0
  }

  // build records array includes text1 and text2
  const records = Array.from(Array(text1.length), () => Array(text2.length).fill(0))

  /*
   * fill records[0][0]
   *   a b c d e
   * a 1
   * c
   * e
   */
  records[0][0] = text1[0] === text2[0] ? 1 : 0

  /*
   * pre-fill 1st column, postpone previous equal result
   *   a b c d e
   * a 1
   * c 1
   * e 1
   */
  for (let i = 1; i < text1.length; i++) {
    records[i][0] = Math.max(text1[i] === text2[0] ? 1 : 0, records[i - 1][0])
  }

  /*
   * pre-fill 1st row, postpone previous equal result
   *   a b c d e
   * a 1 1 1 1 1
   * c 1
   * e 1
   */
  for (let j = 1; j < text2.length; j++) {
    records[0][j] = Math.max(text2[j] === text1[0] ? 1: 0, records[0][j - 1])
  }

  /*
   * compare start from records[1][1]
   * check previous equal result from top and left
   *   a b c d e
   * a 1 1 1 1 1
   * c 1 1 2 2 2
   * e 1 1 2 2 3
   */
  for (let i = 1; i < text1.length; i++) {
    for (let j = 1; j < text2.length; j++) {
      const current = text1[i] === text2[j] ? 1 : 0
      records[i][j] = Math.max(
        records[i - 1][j],
        records[i][j - 1],
        records[i - 1][j - 1] + current,
      )
    }
  }

  return records[text1.length - 1][text2.length - 1]
}


const text1 = 'abcde'
const text2 = 'ace'
const length = longestCommonSubsequence(text1, text2)
console.log(`${text1} ${text2} has longest length: ${length}`)
