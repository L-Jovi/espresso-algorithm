const merge = (left, right) => {
  let result = []

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  return result.concat(left, right)
}


const mergeSort = (array) => {
  const n = array.length
  if (n <= 1) {
    return array

  } else {
    const pivotIndex = Math.floor(n / 2)
    const left = array.slice(0, pivotIndex)
    const right = array.slice(pivotIndex)
    return merge(mergeSort(left), mergeSort(right))
  }
}


const findMedianSortedArrays = (nums1, nums2) => {
  const nums = merge(nums1, nums2)

  const length = nums.length
  if (length % 2 === 0) {
    const pivot = length / 2
    return (nums[pivot - 1] + nums[pivot]) / 2
  } else {
    const pivot = parseInt(length / 2)
    return nums[pivot]
  }
}


// test

nums1 = [1, 2]
nums2 = [3, 4]
console.log(findMedianSortedArrays(nums1, nums2))
