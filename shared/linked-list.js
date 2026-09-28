/**
 * LeetCode-style singly linked list nodes, and conversions from and to arrays.
 *
 * LeetCode gives linked-list problems nodes of the shape { val, next }. The
 * solutions in leetcode/ use that shape, and their tests and examples build
 * the inputs with these helpers.
 */

export const listNode = (val, next = null) => ({ val, next })

/** [1, 2, 3] → 1 → 2 → 3; [] → null */
export function arrayToList(array) {
  let head = null
  for (let i = array.length - 1; i >= 0; i--) head = listNode(array[i], head)
  return head
}

/** 1 → 2 → 3 → [1, 2, 3]; null → [] */
export function listToArray(head) {
  const array = []
  for (let node = head; node; node = node.next) array.push(node.val)
  return array
}
