/**
 * Queue: first in, first out, stored in an array.
 *
 * Items join at the end and leave from the front. Leaving uses shift(), which
 * in the worst case moves every remaining item one position: O(n) per
 * dequeue. circular-queue.js avoids that by moving the front index instead of
 * the items.
 *
 * enqueue, front, size, isEmpty: O(1). dequeue: O(n) in the worst case.
 */

export class Queue {
  #items = []

  enqueue(element) {
    this.#items.push(element)
  }

  dequeue() {
    return this.#items.shift()
  }

  front() {
    return this.#items[0]
  }

  isEmpty() {
    return this.#items.length === 0
  }

  size() {
    return this.#items.length
  }

  toArray() {
    return [...this.#items]
  }
}

if (import.meta.main) {
  const queue = new Queue()
  for (const name of ['ann', 'bob', 'cai']) queue.enqueue(name)
  console.log('dequeue:', queue.dequeue())
  console.log('front:  ', queue.front())
  console.log('left:   ', queue.toArray().join(', '))
}
