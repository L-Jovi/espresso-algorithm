/*
 * @Description: No additional space complexity required as solution (fibonacci sequence).
 * @Example: 1 1 2 3 5 8 13
 * @FileName: no-addtional-space.js
 * O(n)
 */

const timer = require('../../libs/timer')

/**
 * Recursive implementation of dynamic programming.
 *
 * @param {number} k
 * @returns {number}
 */
function noAddtionalSpace(k) {
  if (k < 1) {
    return 0

  } else if (k === 1 || k === 2) {
    return 1

  } else {
    // Use variables a, b to save the results of the last iteration and the last iteration.
    let a = 1
    let b = 1
    let tmp = 0

    for (let i = 3; i <= k; i++) {
      tmp = a + b
      a = b
      b = tmp
    }

    return tmp
  }
}


timer(noAddtionalSpace, 1000)
