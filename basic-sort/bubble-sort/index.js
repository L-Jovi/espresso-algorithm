const randomArray = require('../../libs/random-list')
const timer = require('../../libs/timer')
const swap = require('../../libs/swap')

const bubbleSort = (array) => {
  if (!array || array.length <= 1) {
    return array
  }

  let i = 0
  while (i < array.length) {
    for (j = 1; j < array.length - i; j++) {
      if (array[j - 1] > array[j]) {
        swap(array, j - 1, j)
      }
    }

    i++
  }

  return array
}

const array = randomArray.list100()
timer(bubbleSort, array)
