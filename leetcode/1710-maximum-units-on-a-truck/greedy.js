/**
 * LeetCode 1710. Maximum Units on a Truck — https://leetcode.com/problems/maximum-units-on-a-truck/
 * boxTypes[i] = [how many boxes, units per box]. Load at most truckSize
 * boxes and return the largest number of units on the truck.
 *
 * Greedy: every box takes one slot on the truck, so a box with more units
 * is always the better use of a slot. Load the box types in order of units
 * per box, most first, until the truck is full. The sort works on a copy,
 * so the caller's array keeps its order.
 *
 * Time: O(k log k) for k box types. Space: O(k) for the sorted copy.
 */

export function maximumUnits(boxTypes, truckSize) {
  let units = 0
  let space = truckSize
  for (const [boxes, unitsPerBox] of boxTypes.toSorted((a, b) => b[1] - a[1])) {
    const loaded = Math.min(boxes, space)
    units += loaded * unitsPerBox
    space -= loaded
    if (space === 0) break
  }
  return units
}

if (import.meta.main) console.log(maximumUnits([[5, 10], [2, 5], [4, 7], [3, 9]], 10))
