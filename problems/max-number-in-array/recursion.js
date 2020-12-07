/*
 * @Description: Search max value in array implements by Javascript.
 * @FileName: max-number-in-array/recursion.js
 */

/**
 * getMaxNumber
 *
 * @param {number[]} array
 * @param {number} l
 * @returns {number} r
 */
const getMaxNumber = (array, l, r) => {
  if (l == r) {
    return array[l]
  }

  const mid = l + ((r - l) >> 1)
  const leftMax = getMaxNumber(array, l, mid)
  const rightMax = getMaxNumber(array, mid + 1, r)
  return Math.max(leftMax, rightMax)
}

const nums = [2, 7, 4, 1, 5]
console.log(getMaxNumber(nums, 0, nums.length - 1))
