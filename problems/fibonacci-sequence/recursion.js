/*
 * @Description: Recursion solution (fibonacci sequence).
 * @Example: 1 1 2 3 5 8 13
 * @FileName: recursion.js
 * O(2^n)
 */

const timer = require('../../libs/timer')

/**
 * Recursively recalculates a large number of subproblems.
 *
 * @param {number} k
 * @returns {number}
 */
function recursion(k) {
  if (k < 1) {
    return 0

  } else if (k === 1 || k === 2) {
    return 1

  } else {
    return recursion(k - 1) + recursion(k - 2)
  }
}


timer(recursion, 3)
