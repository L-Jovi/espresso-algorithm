/*
 * @Description: Using a memory-based data structure as solution (fibonacci sequence).
 * @Example: 1 1 2 3 5 8 13
 * @FileName: memory.js
 * O(n)
 */

const timer = require('../../libs/timer')

/**
 * Although the time complexity is reduced, a set needs to be maintained to store the calculation results, resulting in increased space complexity.
 *
 * @param {number} k
 * @returns {number}
 */
function memory(k, map = {}) {
  if (k < 1) {
    return 0

  } else if (k === 1 || k === 2) {
    return 1

  } else {
    // Determines whether the result of the current k has been calculated. If k exists in the map, the result has been calculated.
    if (k in map) {
      return map[k]

    } else {
      const value = memory(k - 1, map) + memory(k - 2, map)
      map[k] = value
      return value
    }
  }
}


timer(memory, 1000)
