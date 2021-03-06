/*
 * @Description: Merge sort implements by Javascript rely on control cursor instead of split array.
 * @FileName: merge-sort/use-cursor-in-recursion.js
 * O(nlog(n))
 */

const randomArray = require('../../libs/random-list')
const timer = require('../../libs/timer')

const merge = (array, l, mid, r) => {
  const sortedArray = []
  let p1 = l
  let p2 = mid + 1

  while (p1 <= mid && p2 <= r) {
    if (array[p1] <= array[p2]) {
      sortedArray.push(array[p1])
      p1++
    } else {
      sortedArray.push(array[p2])
      p2++
    }
  }

  // p1 or p2 oversize
  while (p1 <= mid) {
    sortedArray.push(array[p1])
    p1++
  }
  while (p2 <= r) {
    sortedArray.push(array[p2])
    p2++
  }

  // copy sortedArray to array (which refer origin array)
  for (let j = 0; j < sortedArray.length; j++) {
    array[l + j] = sortedArray[j]
  }
}

const mergeSort = (array, l, r) => {
  if (l === r) {
    return
  }

  const mid = l + ((r - l) >> 1)        // reset mid
  mergeSort(array, l, mid)              // mergeSort => merge
  mergeSort(array, mid + 1, r)          // mergeSort => merge
  merge(array, l, mid, r)

  return array
}

const array = randomArray.list100000()
timer(mergeSort, array, 0, array.length - 1)
