/**
 * 0-1 knapsack, brute force.
 *
 * Every item has a weight and a value, and the bag holds at most `capacity`.
 * Each item is either taken once or left behind (hence "0-1"). Which items give
 * the largest total value?
 *
 * Try both choices for every item, in order. best(index, rest) is the largest
 * value obtainable from items index, index + 1, … with `rest` capacity left:
 * leave item `index`, or take it if it fits, and keep the better result.
 * With no items left the answer is 0. An item of weight 0 always fits, even
 * when the bag is full.
 *
 * Time: O(2ⁿ) for n items. Space: O(n) for the recursion.
 * recursion-to-table.js turns exactly this recursion into a table.
 */

/**
 * @param {number[]} weights non-negative integers
 * @param {number[]} values
 * @param {number} capacity non-negative integer
 * @returns {number} the largest total value that fits
 */
export function knapsack(weights, values, capacity) {
  const best = (index, rest) => {
    if (index === weights.length) return 0
    const leave = best(index + 1, rest)
    const take = weights[index] <= rest ? values[index] + best(index + 1, rest - weights[index]) : -Infinity
    return Math.max(leave, take)
  }
  return best(0, capacity)
}

if (import.meta.main) {
  console.log('weights [3, 2, 4, 7], values [5, 6, 3, 19], capacity 11 →', knapsack([3, 2, 4, 7], [5, 6, 3, 19], 11))
}
