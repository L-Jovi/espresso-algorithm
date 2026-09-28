/**
 * @param {string} s
 * @param {number} maxLetters
 * @param {number} minSize
 * @param {number} maxSize
 * @return {number}
 * https://leetcode-cn.com/problems/maximum-number-of-occurrences-of-a-substring/solution/java-hashmap-by-npe_tle/
 */
const maxFreq = (s, maxLetters, minSize, maxSize) => {
  const recordMap = {}

  for (let i = 0; i < s.length; i++) {
    if (i + minSize > s.length) {
      break
    }

    /* sample:
     * aababcaab (minSize = 3)
     * [aab]abcaab
     * a[aba]bcaab
     * aa[bab]caab
     * aab[abc]aab
     * aaba[bca]ab
     * aabab[caa]b
     * aababc[aab]
    */
    const subStr = s.slice(i, i + minSize)

    // legal, record
    if (isLegalItem(subStr, maxLetters)) {
      if (recordMap[subStr]) {
        recordMap[subStr] += 1
      } else {
        recordMap[subStr] = 1
      }
    }
  }

  console.log(recordMap)

  let maxCount = 0
  const keys = Object.keys(recordMap)

  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i]
      const count = recordMap[k]
      if (count > maxCount) {
        maxCount = count
      }
    }
  }

  return maxCount
}

const isLegalItem = (subStr, maxLetters) => {
  const set = new Set(subStr)
  if (set.size <= maxLetters) {
    return true
  }
  return false
}


const s = "aababcaab"
const maxLetters = 2
const minSize = 3
const maxSize = 4
console.log(maxFreq(s, maxLetters, minSize, maxSize))
