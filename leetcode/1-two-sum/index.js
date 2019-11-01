/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 *
 * O(n)
 */
const twoSum = function(nums, target) {
  const map = {}

  for (let index in nums) {
    const currentNum = nums[index]
    const anotherNum = target - currentNum

    if (anotherNum in map) {
      return [map[anotherNum], index]

    } else {
      map[currentNum] = index
    }
  }
}


// test
const nums = [2, 7, 4, 1, 5]
console.log(twoSum(nums, 5))
