/*
 * @Description: Selection sort implements by Javascript.
 * @FileName: selection-sort/once-swap.js
 */

const randomArray = require('../../libs/random-list')
const timer = require('../../libs/timer')
const swap = require('../../libs/swap')

/**
 * Select sort.
 *
 * @returns {Array}
 */
const selectSort = (array) => {
  if (!array || array.length <= 1) {
    return array
  }

  let i = 0
  while (i < array.length) {
    let indexMin = i

    for (let j = i + 1; j < array.length; j++) {
      if (array[indexMin] > array[j]) {
        indexMin = j
      }
    }

    swap(array, i, indexMin)
    i++
  }

  return array
}

const array = randomArray.list100()
timer(selectSort, array)
