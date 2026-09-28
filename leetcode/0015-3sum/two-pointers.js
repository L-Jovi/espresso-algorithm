/**
 * [https: //leetcode-cn.com/problems/3sum/solution/hua-jie-suan-fa-15-san-shu-zhi-he-by-guanpengchn/]
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function(nums) {
  let ans = []
  const len = nums.length

  if (!nums || len < 3) {
    return ans
  }

  nums.sort((a, b) => a - b)

  for (let i = 0; i < len; i++) {
    // min number cannot > 0
    if (nums[i] > 0) {
      break
    }

    // de-weight
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue
    }

    let l = i + 1
    let r = len - 1
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];

      // sum === 0
      if (sum === 0) {
        ans.push([nums[i], nums[l], nums[r]]);

        // skip double series number
        while (l < r && nums[l] == nums[l + 1]) {
          l++
        }
        while (l < r && nums[r] == nums[r - 1]) {
          r--
        }

        l++
        r--

      } else if (sum < 0) {
        l++

      } else if (sum > 0) {
        r--
      }
    }
  }

  return ans
}
