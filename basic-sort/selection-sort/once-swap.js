/*
 * @Description: Selection sort implements by Javascript.
 * @FileName: selection-sort/once-swap.js
 */

/**
 * Select sort.
 *
 * @returns {Array}
 */
const selectSort = (array) => {
  const n = array.length

  if (!n || n < 2) {
    return
  }

  for (let i = 0; i < n; i++) {

    let indexMin = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[indexMin]) {
        indexMin = j
      }
    }
    const tmp = array[i]
    array[i] = array[indexMin]
    array[indexMin] = tmp
  }
}

let array = [5, 4, 8, 1, 2]
selectSort(array)
console.log(array)
