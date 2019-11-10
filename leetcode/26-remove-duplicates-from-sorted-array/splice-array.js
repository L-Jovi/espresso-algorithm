/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function(nums) {
  let i = 0
  while (i < nums.length) {
    let j = i + 1
    if (nums[i] === nums[j]) {
      nums.splice(i, 1)
    } else {
      i++
      continue
    }

    if (nums[i] !== nums[i + 1]) {
      i++
    }
  }

  return nums.length
}


const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
console.log(removeDuplicates(nums))
console.log(nums)
