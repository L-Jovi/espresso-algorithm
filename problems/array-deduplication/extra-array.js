/**
 * Remove duplicates by building a second array.
 *
 * Walk the input and copy an item into the result only if the result does
 * not contain it yet. The first occurrence of every value is kept, in the
 * original order.
 *
 * `indexOf` compares with ===, and NaN === NaN is false, so this version can
 * never find a NaN it has already copied: every NaN is kept. set.js does not
 * have that problem, because Set compares with SameValueZero.
 *
 * Time: O(n²), since every item scans the result. Space: O(n).
 * Learning source: https://github.com/mqyqingfeng/Blog/issues/27
 */

export function unique(array) {
  const result = []
  for (const current of array) {
    if (result.indexOf(current) === -1) result.push(current)
  }
  return result
}

if (import.meta.main) {
  console.log(unique([1, 1, '1', 2, NaN, NaN]))
}
