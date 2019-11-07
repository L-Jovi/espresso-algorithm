/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
const fourSum = function(nums, target) {
  let ans = []
  const len = nums.length

  if (nums && len < 4) {
    return ans
  }

  nums.sort((a, b) => a - b)

  for (let i = 0; i < len - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) { // de-weight
      continue
    }

    for (let j = i + 1; j < len - 2; j ++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) { // de-weight
        continue
      }

      let l = j + 1
      let r = len - 1 

      while (l < r) {
        const sum = nums[i] + nums[j] + nums[l] + nums[r]

        if (sum === target) {
          ans.push([nums[i], nums[j], nums[l], nums[r]])

          while (l < r && nums[l] == nums[l + 1]) { // de-weight
            l++
          }

          while (l < r && nums[r] == nums[r - 1]) { // de-weight
            r--
          }

          l++
          r--

        } else if (sum < target) {
          l++

        } else if (sum > target){
          r--
        }
      }
    }
  }

  return ans
}
