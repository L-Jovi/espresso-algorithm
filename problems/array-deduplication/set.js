/**
 * Remove duplicates with a Set.
 *
 * A Set keeps each value once, in insertion order, and checks membership in
 * O(1) on average. Spreading it back into an array gives the first occurrence
 * of every value in the original order. Set compares with SameValueZero, so
 * one NaN is kept, and 1 and '1' stay different.
 *
 * Time: O(n) on average. Space: O(n).
 * Learning source: https://github.com/mqyqingfeng/Blog/issues/27
 */

export function unique(array) {
  return [...new Set(array)]
}

if (import.meta.main) {
  console.log(unique([1, 1, '1', 2, NaN, NaN]))
}
