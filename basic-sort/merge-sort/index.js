/*
 * @Description: Merge sort implements by Javascript.
 * @FileName: merge-sort/index.js
 * O(nlog(n))
 */

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

let array = [13, 14, 94, 33, 82, 25, 59, 94, 65, 23, 45, 27, 73, 25, 39]
array = mergeSort(array)
console.log(array)
