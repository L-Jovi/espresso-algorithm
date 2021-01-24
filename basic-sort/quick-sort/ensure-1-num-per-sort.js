/*
 * @Description: Quick sort implements by Javascript.
 * @FileName: ensure-1-num-per-sort.js
 * O(nlogn)
 */

const randomArray = require('../../libs/random-list')
const timer = require('../../libs/timer')

const quickSort = (array) => {
  if (array.length <= 1) {
    return array
  }

  const pivotIndex = Math.floor(array.length / 2)
  const pivot = array.splice(pivotIndex, 1)[0]

  let left = []
  let right = []

  for (let i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }

  return quickSort(left).concat(pivot, quickSort(right))
}

const array = randomArray.list100000()
timer(quickSort, array)
