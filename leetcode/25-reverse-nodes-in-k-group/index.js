/**
 * Definition for singly-linked list.
 */
 function ListNode(val) {
   this.val = val
   this.next = null
 }


/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const reverseKGroup = function(head, k) {
  const dummy = new ListNode(0)
  dummy.next = head

  let pre = end = dummy

  while (end.next) {
    // find the kth node as end node
    for (let i = 0; i < k && end; i++) {
      end = end.next
    }

    if (!end) {
      break
    }

    const start = pre.next
    const next = end.next
    end.next = null
    pre.next = reverse(start)
    start.next = next   // concat start and end.next
    pre = start         // concat pre and pre.next [k's first node]
  }
}


const reverse = (head) => {
  let pre = null
  let curr = head

  while (curr) {
    const next = curr.next
    curr.next = pre
    pre = curr
    curr = next
  }

  return pre
}
