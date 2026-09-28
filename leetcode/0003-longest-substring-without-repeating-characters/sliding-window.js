/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function(s) {
  let ans = 0
  if (!s) {
    return ans
  }

  const map = {}
  let start = 0

  for (let index = 0; index < s.length; index++) {
    const char = s[index]
    if (char in map) {
      start = Math.max(start, map[char])
    }

    ans = Math.max(index - start + 1, ans)
    // record the same char's right index
    map[char] = index + 1
  }

  return ans
}


const s = 'abcabcbb'
console.log(lengthOfLongestSubstring(s))
