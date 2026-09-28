/**
 * A set built on an array: every element appears at most once.
 *
 * `has` scans the array, so most operations are O(n), and the set operations
 * on two sets are O(n · m). The built-in `Set` uses a hash table and answers
 * `has` in O(1) on average. Since ES2025 it also has `union`,
 * `intersection`, `difference` and `isSubsetOf`, the same operations this
 * class implements by hand.
 *
 * Membership uses SameValueZero, like the built-in `Set`: NaN equals NaN.
 */

// SameValueZero: like ===, except that NaN equals NaN (the rule of Set and includes()).
const sameValueZero = (a, b) => a === b || (Number.isNaN(a) && Number.isNaN(b))

export class MySet {
  #items = []

  constructor(elements = []) {
    for (const element of elements) this.add(element)
  }

  has(element) {
    return this.#items.includes(element)
  }

  /** A copy of the elements, in insertion order. */
  values() {
    return [...this.#items]
  }

  size() {
    return this.#items.length
  }

  /** Add an element; return false if it was already there. */
  add(element) {
    if (this.has(element)) return false
    this.#items.push(element)
    return true
  }

  /** Remove an element; return false if it was not there. */
  remove(element) {
    const index = this.#items.findIndex(item => sameValueZero(item, element))
    if (index === -1) return false
    this.#items.splice(index, 1)
    return true
  }

  union(otherSet) {
    return new MySet([...this.#items, ...otherSet.values()])
  }

  intersection(otherSet) {
    return new MySet(this.#items.filter(element => otherSet.has(element)))
  }

  difference(otherSet) {
    return new MySet(this.#items.filter(element => !otherSet.has(element)))
  }

  /** True when every element of this set is also in `otherSet`. */
  subset(otherSet) {
    return this.#items.every(element => otherSet.has(element))
  }
}

if (import.meta.main) {
  const a = new MySet([1, 2, 3])
  const b = new MySet([2, 3, 4])
  console.log('union:       ', a.union(b).values().join(' '))
  console.log('intersection:', a.intersection(b).values().join(' '))
  console.log('difference:  ', a.difference(b).values().join(' '))
  console.log('a ⊆ b:       ', a.subset(b))
}
