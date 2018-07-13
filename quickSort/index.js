const quickSort = (array) => {
  if (array.length <= 1) {
    return array
  }

  const pivotIndex = Math.floor(array.length / 2)
  const pivot = array.splice(pivotIndex, 1)[0]

  let left = []
  let right = []

  for (let i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }

  return quickSort(left).concat(pivot, quickSort(right))
}

let array = [5, 4, 8, 1, 2]
console.log(quickSort(array))
