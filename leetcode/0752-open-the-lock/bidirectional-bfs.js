/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 * https://labuladong.github.io/algo/%E7%AE%97%E6%B3%95%E6%80%9D%E7%BB%B4%E7%B3%BB%E5%88%97/BFS%E6%A1%86%E6%9E%B6.html
 * 默认扩散 q1 就相当于轮流扩散 q1 和 q2
 */
const openLock = (deadends, target) => {
  const initStr = '0000'
  let set1 = new Set([initStr])
  let set2 = new Set([target])

  let setDead = new Set(deadends)
  const setVisited = new Set([initStr])

  if (setDead.has(target) || setDead.has(initStr)) {
    return -1
  }

  let step = 0

  while (set1.size && set2.size) {
    const setNearby = new Set()

    for (let currentStr of set1) {
      if (setDead.has(currentStr)) {
        continue
      }
      if (set2.has(currentStr)) {
        return step
      }
      setVisited.add(currentStr)

      for (let j = 0; j < 4; j++) {
        const upStr = up(currentStr, j)
        if (!setVisited.has(upStr)) {
          setNearby.add(upStr)
        }

        const downStr = down(currentStr, j)
        if (!setVisited.has(downStr)) {
          setNearby.add(downStr)
        }
      }
    }

    step++
    set1 = set2
    set2 = setNearby
  }

  return -1
}

// 0 1 2 3 ... 8 9 0 1 ...
const up = (currentStr, digit) => {
  const strArray = currentStr.split('')
  if (strArray[digit] === '9') {
    strArray[digit] = '0'
  } else {
    strArray[digit] = (parseInt(strArray[digit]) + 1).toString()
  }
  return strArray.join('')
}

const down = (currentStr, digit) => {
  const strArray = currentStr.split('')
  if (strArray[digit] === '0') {
    strArray[digit] = '9'
  } else {
    strArray[digit] = (parseInt(strArray[digit]) - 1).toString()
  }
  return strArray.join('')
}


const deadends = ['0201', '0101', '0102', '1212', '2002']
const target = '0202'
console.log(openLock(deadends, target))
