/**
 * LeetCode 654. Maximum Binary Tree — https://leetcode.com/problems/maximum-binary-tree/
 * Build a tree from an array of distinct numbers: the largest number is the
 * root, the part of the array to its left builds the left subtree and the
 * part to its right builds the right subtree, each in the same way.
 *
 * Divide and conquer, exactly as the definition says: find the largest
 * number in nums[lo..hi], make it the root, and build both sides
 * recursively. Passing index ranges avoids copying the array with slice()
 * at every level.
 *
 * Time: O(n²) in the worst case, a sorted array, where every step scans all
 * that is left; O(n log n) on average. A monotonic stack builds the same
 * tree in O(n). Space: O(n) for the recursion in the worst case.
 */

import { binaryTree2Array, treeNode } from '../../data-structures/tree/binary-tree-array.js'

export function constructMaximumBinaryTree(nums) {
  function build(lo, hi) {
    if (lo > hi) return null
    let top = lo
    for (let i = lo + 1; i <= hi; i++) if (nums[i] > nums[top]) top = i
    return treeNode(nums[top], build(lo, top - 1), build(top + 1, hi))
  }
  return build(0, nums.length - 1)
}

if (import.meta.main) console.log(binaryTree2Array(constructMaximumBinaryTree([3, 2, 1, 6, 0, 5])))
