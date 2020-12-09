/*
 * @Description: Sum left smaller num in array implements by Javascript.
 * @Path: Evernote/application-fields/algorithm/problems/归并思路求解下面的求数组左侧小和问题
 * @FileName: sum-left-smaller-num-in-array/recursion.js
 */

const randomArray = require('../../libs/random-list')
const timer = require('../../libs/timer')

const merge = (array, l, mid, r) => {
  const sortedArray = []
  let i = 0
  let p1 = l
  let p2 = mid + 1
  // sum all right sub-array bigger than left
  let sum = 0

  while (p1 <= mid && p2 <= r) {
    if (array[p1] < array[p2]) {
      // compute how many right num bigger than left num
      sum += (r - p2 + 1) * array[p1]
      sortedArray[i] = array[p1]
      p1++
    } else {
      sortedArray[i] = array[p2]
      p2++
    }
    i++
  }

  // p1 or p2 oversize
  while (p1 <= mid) {
    sortedArray[i] = array[p1]
    i++
    p1++
  }
  while (p2 <= r) {
    sortedArray[i] = array[p2]
    i++
    p2++
  }

  // copy sortedArray to array (which refer origin array)
  for (let j = 0; j < sortedArray.length; j++) {
    array[l + j] = sortedArray[j]
  }

  return sum
}

const process = (array, l, r) => {
  if (l === r) {
    return 0
  }
  const mid = l + ((r - l) >> 1)
  return process(array, l, mid) +
    process(array, mid + 1, r) +
    merge(array, l, mid, r)
}

const sumSmall = (array) => {
  if (!array || array.length <= 1) {
    return 0
  }

  return process(array, 0, array.length - 1)
}

const array = randomArray.list10()
timer(sumSmall, array)
