/**
 * Priority queue kept in a sorted array.
 *
 * Every item has a priority; the smallest number leaves first. `enqueue`
 * walks the array to the first item with a larger priority and inserts the new
 * item before it, so items with equal priority leave in the order they came.
 * `dequeue` takes the front. binary-heap-priority-queue.js offers the same
 * interface with O(log n) operations.
 *
 * enqueue: O(n). dequeue: O(n) (shift). front, size, isEmpty: O(1).
 */

export class PriorityQueue {
  #items = [] // [value, priority], sorted by priority

  enqueue(value, priority) {
    const index = this.#items.findIndex(([, other]) => priority < other)
    if (index === -1) this.#items.push([value, priority])
    else this.#items.splice(index, 0, [value, priority])
  }

  dequeue() {
    return this.#items.shift()?.[0]
  }

  front() {
    return this.#items[0]?.[0]
  }

  isEmpty() {
    return this.#items.length === 0
  }

  size() {
    return this.#items.length
  }
}

if (import.meta.main) {
  const queue = new PriorityQueue()
  queue.enqueue('gannicus', 3)
  queue.enqueue('spartacus', 1)
  queue.enqueue('crixus', 2)
  queue.enqueue('oenomaus', 4)
  console.log(Array.from({ length: 4 }, () => queue.dequeue()).join(' → '))
}
