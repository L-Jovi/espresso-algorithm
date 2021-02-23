/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = (nums) => {
  const root = []
  const branch = []

  const backtrack = () => {
    if (branch.length === nums.length) {
      root.push(branch.slice())
      return
    }

    for (let i = 0; i < nums.length; i++) {
      if (branch.indexOf(nums[i]) !== -1) {
        continue
      }

      branch.push(nums[i])
      backtrack()
      branch.pop()
    }
  }

  backtrack()
  return root
}


console.log(permute([1,2,3]))
// [
//   [ 1, 2, 3 ],
//   [ 1, 3, 2 ],
//   [ 2, 1, 3 ],
//   [ 2, 3, 1 ],
//   [ 3, 1, 2 ],
//   [ 3, 2, 1 ]
// ]
