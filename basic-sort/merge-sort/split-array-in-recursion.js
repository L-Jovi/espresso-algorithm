/*
 * @Description: Merge sort implements by Javascript rely on split array.
 * @FileName: merge-sort/split-array-in-recursion.js
 * O(nlog(n))
 */

const randomArray = require('../../libs/random-list')
const timer = require('../../libs/timer')

const merge = (left, right) => {
  let result = []

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  return result.concat(left, right)
}

const mergeSort = (array) => {
  const n = array.length
  if (n <= 1) {
    return array

  } else {
    const pivotIndex = Math.floor(n / 2)
    const left = array.slice(0, pivotIndex)
    const right = array.slice(pivotIndex)
    return merge(mergeSort(left), mergeSort(right))
  }
}

const array = randomArray.list100000()
timer(mergeSort, array)
