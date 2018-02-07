const insertSort = (array) => {
  const n = array.length
  for (let i = 1; i < n; i++) {
    let tmp = array[i]
    let index = i
    let j = i - 1
    while (j >= 0 && array[j] > tmp) {
      array[j+1] = array[j]
      index = j
      j--
    }
    array[index] = tmp
  }
}

let array = [5, 4, 8, 1, 2]
insertSort(array)
console.log(array)
