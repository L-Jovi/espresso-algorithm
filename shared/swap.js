/**
 * Swap two items of an array in place and return the array.
 *
 * Sorting code calls this in its innermost loop. The bounds check turns an
 * off-by-one index into an error instead of silently growing the array with
 * `undefined` holes, which is how several old bugs in this repository hid.
 *
 * @template T
 * @param {T[]} array
 * @param {number} i
 * @param {number} j
 * @returns {T[]}
 */
export function swap(array, i, j) {
  const { length } = array
  if (!(i >= 0 && i < length && j >= 0 && j < length)) {
    throw new RangeError(`swap(${i}, ${j}) is outside an array of length ${length}`)
  }
  const tmp = array[i]
  array[i] = array[j]
  array[j] = tmp
  return array
}
