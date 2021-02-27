/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr = (haystack, needle) => {
  let end = 0
  let substr = ''

  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      end = i + needle.length
      substr = haystack.slice(i, end)

      if (substr === needle) {
        return i
      }
    }
  }

  if (!needle) {
    return 0
  }

  return -1
}


const haystack = 'mississippi'
const needle = 'issip'
console.log(strStr(haystack, needle))
