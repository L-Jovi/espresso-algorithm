/**
 * Stack: last in, first out.
 *
 * Two versions of the same interface. `Stack` keeps its items in a plain
 * object keyed by position and counts them itself, which shows what an array
 * does for you. `ArrayStack` lets an array do that work: pushing and popping
 * at the end of an array never moves the other items.
 *
 * Every operation is O(1).
 */

export class Stack {
  #count = 0
  #storage = {}

  push(value) {
    this.#storage[this.#count] = value
    this.#count++
  }

  pop() {
    if (this.#count === 0) return undefined
    this.#count--
    const top = this.#storage[this.#count]
    delete this.#storage[this.#count]
    return top
  }

  peek() {
    return this.#storage[this.#count - 1]
  }

  size() {
    return this.#count
  }

  isEmpty() {
    return this.#count === 0
  }
}

export class ArrayStack {
  #items = []

  push(value) {
    this.#items.push(value)
  }

  pop() {
    return this.#items.pop()
  }

  peek() {
    return this.#items.at(-1)
  }

  size() {
    return this.#items.length
  }

  isEmpty() {
    return this.#items.length === 0
  }
}

if (import.meta.main) {
  const stack = new Stack()
  stack.push('foo')
  stack.push('bar')
  console.log('peek:', stack.peek())
  console.log('pop: ', stack.pop())
  console.log('size:', stack.size())
}
