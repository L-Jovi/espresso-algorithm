/*
 * @Description: Recursion solution (fibonacci sequence).
 * @FileName: recursion.js
 * O(2^n)
 */

/**
 * Recursively recalculates a large number of subproblems.
 *
 * @param {number} k
 * @returns {number}
 */
function recursion(k) {
  if (k < 1) {
    return 0

  } else if (k === 1) {
    return 1

  } else if (k === 2) {
    return 1

  } else {
    return recursion(k - 1) + recursion(k - 2)
  }
}


// test
console.log(recursion(45))
