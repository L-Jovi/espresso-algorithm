/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function(s) {
  let ans = 0
  const map = {}

  for (let j = 0, i = 0; j < s.length; j++) {
    const c = s[j]
    if (c in map) {
      i = Math.max(i, map[c])  // reset start point
    }

    ans = Math.max(ans, j - i + 1)  // offset => length
    map[s[j]] = j + 1
  }

  return ans
}
