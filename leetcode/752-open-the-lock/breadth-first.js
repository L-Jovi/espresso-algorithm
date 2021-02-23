/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
const openLock = (deadends, target) => {
  const queue = []
  const setVisited = new Set()

  const initStr = '0000'
  queue.push(initStr)
  setVisited.add(initStr)

  let step = 0

  while (queue.length) {
    const size = queue.length
    for (let i = 0; i < size; i++) {
      const currentStr = queue.shift()

      if (deadends.indexOf(currentStr) !== -1) {
        continue
      }

      if (target === currentStr) {
        return step
      }

      for (let j = 0; j < 4; j++) {
        const upStr = up(currentStr, j)
        if (!setVisited.has(upStr)) {
          queue.push(upStr)
          setVisited.add(upStr)
        }

        const downStr = down(currentStr, j)
        if (!setVisited.has(downStr)) {
          queue.push(downStr)
          setVisited.add(downStr)
        }
      }
    }

    step++
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
