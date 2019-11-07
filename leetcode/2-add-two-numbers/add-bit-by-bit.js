/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
  this.val = val
  this.next = null
}


/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function(l1, l2) {
  const head = new ListNode(0)
  let currentNode = head
  let carry = 0

  while (l1 || l2) {
    const x = l1 ? l1.val : 0
    const y = l2 ? l2.val : 0
    const sum = x + y + carry

    carry = sum >= 10 ? 1 : 0 // reset carry
    currentNode.val = sum % 10

    if (l1) {
      l1 = l1.next
    }
    if (l2) {
      l2 = l2.next
    }
    if (l1 || l2) {
      currentNode.next = new ListNode(0)
      currentNode = currentNode.next
    }
  }

  // check the overflow
  // eg: l1=[9, 9]，l2=[1, 1]
  if (carry > 0) {
    currentNode.next = new ListNode(carry)
    currentNode = currentNode.next
  }

  return head
}


let l1 = new ListNode(2)
l1.next = new ListNode(4)
l1.next.next = new ListNode(3)

let l2 = new ListNode(9)
l2.next = new ListNode(6)
l2.next.next = new ListNode(4)

console.log(addTwoNumbers(l1, l2))
