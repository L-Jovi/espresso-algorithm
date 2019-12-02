/*
 * @Description: Insert sort implements by Javascript.
 * @FileName: insertion-sort/index.js
 * O(n^2)
 */

/**
 * Insert sort.
 *
 * @returns {Array}
 */
const insertSort = (array) => {
  const n = array.length

  for (let i = 1; i < n; i++) {
    let tmp = array[i]
    let j = i - 1

    while (j >= 0 && array[j] > tmp) {
      array[j+1] = array[j]
      j--
    }

    array[j+1] = tmp
  }
}

let array = [5, 4, 8, 1, 2]
insertSort(array)
console.log(array)
