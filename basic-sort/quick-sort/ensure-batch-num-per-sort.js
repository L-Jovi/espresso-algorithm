/*
 * @Description: Quick sort implements by Javascript.
 * @FileName: ensure-batch-num-per-sort.js
 * O(nlogn)
 */

const randomArray = require('../../libs/random-list')
const timer = require('../../libs/timer')
const swap = require('../../libs/swap')

const getEqualEdge = (array, l, r, pivot) => {
  if (l > r) {
    return [-1, -1]
  }

  if (l === r) { return [l, r]
  }

  let indexSmallArea = l - 1
  let indexBigArea = r + 1
  let i = l

  while (i < indexBigArea) {
    if (array[i] < pivot) {
      swap(array, i++, ++indexSmallArea)
    } else if (array[i] > pivot) {
      swap(array, i, --indexBigArea)
    } else {
      i++
    }
  }

  return [indexSmallArea, indexBigArea]
}

const process = (array, l, r) => {
  if (l >= r) {
    return
  }

  const pivot = array[r]
  const equalEdge = getEqualEdge(array, l, r, pivot)
  process(array, 0, equalEdge[0])
  process(array, equalEdge[1], r)

  return array
}

const quickSort = (array) => {
  if (!array || array.length < 2) {
    return
  }
  process(array, 0, array.length - 1)
  return array
}

const array = randomArray.list100()
timer(quickSort, array)
