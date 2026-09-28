/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const threeSumClosest = function(nums, target) {
  nums.sort((a, b) => a - b)
  let ans = nums[0] + nums[1] + nums[2]
  const len = nums.length

  for (let i = 0; i < len; i++) {
    let L = i + 1
    let R = len - 1

    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R]
      if (Math.abs(target - ans) > Math.abs(target - sum)) {
        ans = sum

      } else if (sum < target) {
        L++

      } else if (sum > target) {
        R--

      } else {
        return ans
      }
    }
  }

  return ans
}
