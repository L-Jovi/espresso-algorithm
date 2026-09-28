/**
 * Merge two sorted neighbouring runs, array[l..mid] and array[mid + 1..r],
 * into one sorted run. top-down-indices.js and bottom-up.js share it.
 *
 * `buffer` is scratch space as long as the array, allocated once by the
 * caller instead of once per merge. When two items are equal the one from the
 * left run goes first, which keeps equal items in their original order: that
 * is what makes merge sort stable.
 *
 * @template T
 * @param {T[]} array
 * @param {T[]} buffer
 * @param {number} l first index of the left run
 * @param {number} mid last index of the left run
 * @param {number} r last index of the right run
 * @param {(a: T, b: T) => number} compare
 */
export function merge(array, buffer, l, mid, r, compare) {
  let p1 = l
  let p2 = mid + 1
  let k = l
  while (p1 <= mid && p2 <= r) {
    buffer[k++] = compare(array[p1], array[p2]) <= 0 ? array[p1++] : array[p2++]
  }
  // One run is used up; the rest of the other run is already sorted.
  while (p1 <= mid) buffer[k++] = array[p1++]
  while (p2 <= r) buffer[k++] = array[p2++]
  for (k = l; k <= r; k++) array[k] = buffer[k]
}
