/**
 * Definition for singly-linked list.
 */
 function ListNode(val) {
   this.val = val
   this.next = null
 }


/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 * Time complexity: O(NlogN)
 * Space complexity: O(N)O(N)
 */
const mergeKLists = function(lists) {
  const nodes = []

  // pointer => prepare to create new linked list
  const head = new ListNode(0)
  let pointer = head

  for (let l of lists) {
    while (l) {
      nodes.push(l.val)
      l = l.next
    }
  }

  nodes.sort((a, b) => a - b)
  for (let n of nodes) {
    pointer.next = new ListNode(n)
    pointer = pointer.next
  }

  return head.next
}
