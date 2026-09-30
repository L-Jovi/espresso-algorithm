/**
 * LeetCode 881. Boats to Save People — https://leetcode.com/problems/boats-to-save-people/
 * Each boat carries at most two people whose weights add up to at most
 * `limit`. Return the fewest boats that carry everyone.
 *
 * Greedy with two pointers over the sorted weights: the heaviest person
 * needs a boat in any case. If the lightest person fits in with them, put
 * the two together. Whoever else the heaviest might share with, swapping
 * that person with the lightest keeps every boat within the limit, because
 * the heaviest outweighs everyone. Otherwise nobody fits with the heaviest,
 * who goes alone. Either way one boat leaves, and the pointers move in.
 *
 * Time: O(n log n) for the sort. Space: O(n) for the sorted copy; the
 * input is left alone.
 * Learning source: https://leetcode.cn/problems/boats-to-save-people/solutions/3542/jiu-sheng-ting-by-leetcode/
 */

export function numRescueBoats(people, limit) {
  const weights = people.toSorted((a, b) => a - b)
  let boats = 0
  let lightest = 0
  let heaviest = weights.length - 1
  while (lightest <= heaviest) {
    if (weights[lightest] + weights[heaviest] <= limit) lightest++
    heaviest--
    boats++
  }
  return boats
}

if (import.meta.main) console.log(numRescueBoats([3, 5, 3, 4], 5), numRescueBoats([3, 2, 2, 1], 3))
