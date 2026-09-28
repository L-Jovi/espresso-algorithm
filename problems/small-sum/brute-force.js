/**
 * Small sum, brute force.
 *
 * For every item, add up the earlier items that are smaller than it; the
 * small sum is the total. For [1, 3, 4, 2, 5]: 3 sees 1; 4 sees 1 and 3; 2 sees
 * 1; 5 sees 1, 3, 4 and 2. The small sum is 1 + 4 + 1 + 10 = 16.
 *
 * Checking every earlier item for every item is the definition written as code.
 * merge-sort.js gets the same answer in O(n log n).
 *
 * Time: O(n²). Space: O(1).
 */

export function smallSum(array) {
  let sum = 0
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[j] < array[i]) sum += array[j]
    }
  }
  return sum
}

if (import.meta.main) {
  console.log('smallSum([1, 3, 4, 2, 5]):', smallSum([1, 3, 4, 2, 5]))
}
