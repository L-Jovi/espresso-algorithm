function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247487270&idx=1&sn=2f7ad74aabc88b53d94012ceccbe51be&chksm=9bd7f12eaca078384733168971147866c140496cb257946f8170f05e46d16099f3eef98d39d9&scene=21#wechat_redirect
 */
const buildTree = function(inorder, postorder) {
  return buildNode(
    inorder, 0, inorder.length - 1,
    postorder, 0, postorder.length - 1
  )
}

const buildNode = (inorder, inStart, inEnd, postorder, postStart, postEnd) => {
  // base case
  if (postStart > postEnd) {
    return null
  }

  const rootValue = postorder[postEnd]
  const root = new TreeNode(rootValue)

  // find indexRoot in inorder
  let index = 0
  for (let i = inStart; i <= inEnd; i++) {
    if (inorder[i] === rootValue) {
      index = i
      break
    }
  }

  // get left children size
  const leftSize = index - inStart

  root.left = buildNode(
    inorder, inStart, index - 1,
    postorder, postStart, postStart + leftSize - 1
  )
  root.right = buildNode(
    inorder, index + 1, inEnd,
    postorder, postStart + leftSize, postEnd - 1
  )

  return root
}

const inorder = [9, 3, 15, 20, 7]
const postorder = [9, 15, 7, 20, 3]
const tree = buildTree(inorder, postorder)
console.log(tree)
