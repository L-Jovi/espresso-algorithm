const isValid = function(s) {
  const map = {
    '(': -1,
    ')': 1,
    '[': -2,
    ']': 2,
    '{': -3,
    '}': 3,
  }

  let stack = []  // consider use packaged function

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] < 0) {
      stack.push(s[i])
    } else {
      let last = stack.pop()
      if (map[last] + map[s[i]] !== 0) {
        return false
      }
    }

    // [x] remain parentheses
    if (stack.length > 0) {
      return false
    }

    return true
  }
}
