const swap = (array, i, j) => {
  const tmp = array[i]
  array[i] = array[j]
  array[j] = tmp
  return array
}

module.exports = swap
