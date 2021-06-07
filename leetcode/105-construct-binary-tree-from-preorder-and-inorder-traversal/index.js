/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247487270&idx=1&sn=2f7ad74aabc88b53d94012ceccbe51be&chksm=9bd7f12eaca078384733168971147866c140496cb257946f8170f05e46d16099f3eef98d39d9&scene=21#wechat_redirect
 */
const buildTree = function(preorder, inorder) {
  return buildNode(
    preorder, 0, preorder.length - 1,
    inorder, 0, inorder.length - 1
  )
}

const buildNode = (preorder, preStart, preEnd, inorder, inStart, inEnd) => {
  if (preStart > preEnd) {
    return null
  }

  // record current node index (increasing)
  let index = 0

  const rootVal = preorder[preStart]
  const root = new TreeNode(rootVal)

  for (let i = inStart; i <= inEnd; i++) {
    if (inorder[i] === rootVal) {
      index = i
      break
    }
  }

  // left children's count
  // preorder => [ rootVal, [ root.left ], [ root.right ] ]
  // inorder => [ [ root.left ], rootVal, [ root.right ] ]
  const leftSize = index - inStart

  // ensure seperate index
  root.left = buildNode(
    preorder, preStart + 1, preStart + leftSize,
    inorder, inStart, index - 1
  )
  root.right = buildNode(
    preorder, preStart + leftSize + 1, preEnd,
    inorder, index + 1, inEnd
  )

  return root
}

const preorder = [3, 9, 20, 15, 7]
const inorder = [9, 3, 15, 20, 7]
const tree = buildTree(preorder, inorder)
console.log(tree)
