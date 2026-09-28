/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 * @refer [https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/solution/dong-hua-yan-shi-30-chuan-lian-suo-you-dan-ci-de-z/]
 */
const findSubstring = function(s, words) {
  if (!s || s.length === 0 || !words || words.length === 0) {
    return []
  }

  const map = {}
  const res = []

  for (let w of words) {
    if (!(w in map)) {
      map[w] = 1

    } else {
      map[w] += 1
    }
  }

  const len1stWord = words[0].length
  const lenAllwords = words.length * len1stWord

  for (let i = 0; i < s.length - lenAllwords + 1; i++) {
    const tmpStr = s.slice(i, i + lenAllwords)
    const tmpMap = { ...map }

    for (let j = 0; j < tmpStr.length; j += len1stWord) {
      const key = tmpStr.slice(j, j + len1stWord)

      if (key in tmpMap) {
        tmpMap[key] -= 1

        if (tmpMap[key] === 0) {
          delete tmpMap[key]
        }

      } else {
        break
      }
    }

    if (Object.keys(tmpMap).length === 0) {
      res.push(i)
    }
  }

  return res
}


const s = 'barfoothefoobarman'
const words = ['foo', 'bar']
console.log(findSubstring(s, words))
