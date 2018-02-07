const selectSort = (array) => {
  const n = array.length
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[i]) {
        const tmp = array[i]
        array[i] = array[j]
        array[j] = tmp
      }
    }
  }
}

let array = [5, 4, 8, 1, 2]
selectSort(array)
console.log(array)
