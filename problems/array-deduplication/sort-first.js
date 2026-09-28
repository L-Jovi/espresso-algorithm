/**
 * Remove duplicates by sorting first.
 *
 * After sorting, equal numbers sit next to each other, so one pass that skips
 * an item equal to the one before it removes every duplicate. The result
 * comes out sorted, not in the original order.
 *
 * The sort uses a numeric comparator on a copy of the input. The default
 * sort() compares items as strings, which would put 10 before 9, and sorting
 * the input itself would reorder the caller's array. This version is meant for
 * numbers: with a mix such as [1, '1', 1], a numeric comparator sees all three
 * as equal and cannot bring the two 1s together.
 *
 * Time: O(n log n) for the sort. Space: O(n).
 * Learning source: https://github.com/mqyqingfeng/Blog/issues/27
 */

export function unique(array) {
  const sorted = array.toSorted((a, b) => a - b)
  const result = []
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0 || sorted[i] !== sorted[i - 1]) result.push(sorted[i])
  }
  return result
}

if (import.meta.main) {
  console.log(unique([10, 9, 10, 2, 9, 2]))
}
