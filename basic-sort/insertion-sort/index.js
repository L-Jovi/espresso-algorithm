/*
 * @Description: Insert sort implements by Javascript.
 * @FileName: insertion-sort/index.js
 * O(n^2)
 */

const randomArray = require('../../libs/random-list')
const timer = require('../../libs/timer')

/**
 * Insert sort.
 *
 * @returns {Array}
 */
const insertSort = (array) => {
  const n = array.length

  if (!n || n < 2) {
    return
  }

  for (let i = 1; i < n; i++) {
    let tmp = array[i]
    let j = i - 1

    while (j >= 0 && array[j] > tmp) {
      array[j+1] = array[j]
      j--
    }

    array[j+1] = tmp
  }

  return array
}

const array = randomArray.list10000()
timer(insertSort, array)
