/*
 * @Description: Merge sort implements by Javascript without recursion.
 * @FileName: merge-sort/without-recursion.js
 * O(nlog(n))
 */
const randomArray = require('../../libs/random-list')
const timer = require('../../libs/timer')

const merge = (array, l, mid, r) => {
  const sortedArray = []
  let i = 0
  let p1 = l
  let p2 = mid + 1

  while (p1 <= mid && p2 <= r) {
    if (array[p1] <= array[p2]) {
      sortedArray[i++] = array[p1]
      p1++
    } else {
      sortedArray[i++] = array[p2]
      p2++
    }
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

  return sortedArray
}

const mergeSort = (array) => {
  if (!array || array.length <= 1) {
    return array
  }

  const n = array.length
  let mergeSize = 1           // half group size

  while (mergeSize < n) {
    let l = 0               // cursor start at index 0

    while (l < n) {
      const mid = l + mergeSize -1

      // check l + mergeSize reach or overflow array
      if (mid > n) {
        break
      }

      // check mid + mergeSize reach or overflow array
      const r = Math.min(mid + mergeSize, n - 1)
      merge(array, l, mid, r)

      l = r + 1
    }

    mergeSize <<= 1
  }

  return array
}

const array = randomArray.list100000()
timer(mergeSort, array)
