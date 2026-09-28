/**
 * Hash table with separate chaining.
 *
 * A hash function turns a key into a bucket number; each bucket is a small
 * list of [key, value] pairs. Keys that land in the same bucket ("collide")
 * share its list, so a lookup hashes the key and scans only that bucket.
 *
 * Two hash functions are included. `sumHash` is the first version: it adds up
 * the character codes. A sum ignores order, so every anagram collides: "abc",
 * "bca" and "cab" always share a bucket, however many buckets there are.
 * `hash` is polynomial, h = 31 · h + code (like Java's String.hashCode), so
 * the position of each character changes the result.
 *
 * The number of buckets is fixed. A production table grows when it fills up,
 * which keeps every bucket short. add, lookup, remove: O(1) on average when
 * the keys spread evenly, O(n) when they all share one bucket.
 */

/** Add up the character codes: fast, but every anagram gets the same bucket. */
export function sumHash(key, bucketCount) {
  const text = String(key)
  let total = 0
  for (let i = 0; i < text.length; i++) total += text.charCodeAt(i)
  return total % bucketCount
}

/** Polynomial string hash, kept in 32 bits, reduced to a bucket index. */
export function hash(key, bucketCount) {
  const text = String(key)
  let h = 0
  for (let i = 0; i < text.length; i++) {
    h = (Math.imul(h, 31) + text.charCodeAt(i)) | 0
  }
  return (h >>> 0) % bucketCount
}

export class HashTable {
  #buckets
  #hash
  #size = 0

  constructor(bucketCount = 16, hashFunction = hash) {
    this.#buckets = Array.from({ length: bucketCount }, () => [])
    this.#hash = hashFunction
  }

  /** Insert a pair, or replace the value of an existing key. */
  add(key, value) {
    const bucket = this.#bucketOf(key)
    const pair = bucket.find(([existing]) => existing === key)
    if (pair) {
      pair[1] = value
    } else {
      bucket.push([key, value])
      this.#size++
    }
  }

  /** The value stored under `key`, or undefined. */
  lookup(key) {
    return this.#bucketOf(key).find(([existing]) => existing === key)?.[1]
  }

  /** Remove `key`; return false if it was not there. */
  remove(key) {
    const bucket = this.#bucketOf(key)
    const index = bucket.findIndex(([existing]) => existing === key)
    if (index === -1) return false
    bucket.splice(index, 1)
    this.#size--
    return true
  }

  size() {
    return this.#size
  }

  /** How many keys each bucket holds, to see how evenly the hash spreads them. */
  bucketSizes() {
    return this.#buckets.map(bucket => bucket.length)
  }

  #bucketOf(key) {
    return this.#buckets[this.#hash(key, this.#buckets.length)]
  }
}

if (import.meta.main) {
  const words = ['abc', 'bca', 'cab', 'act', 'cat', 'tac', 'dog', 'god', 'listen', 'silent', 'enlist']
  for (const [name, hashFunction] of [['sum hash       ', sumHash], ['polynomial hash', hash]]) {
    const table = new HashTable(16, hashFunction)
    for (const word of words) table.add(word, word.length)
    console.log(`${name} bucket sizes: ${table.bucketSizes().join(' ')}`)
  }
}
