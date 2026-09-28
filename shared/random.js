/**
 * Seeded pseudo-random numbers for examples and tests.
 *
 * `Math.random()` cannot be seeded, so a test that failed on random input
 * could never be replayed. The same seed here always produces the same
 * numbers. The generator is mulberry32: tiny and fast, fine for shuffling
 * and test data, never for anything security related.
 */

/**
 * Create a generator of floats in [0, 1).
 *
 * @param {number} [seed]
 * @returns {() => number}
 */
export function createRandom(seed = 1) {
  let state = seed >>> 0
  return function next() {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * `length` integers between `min` and `max`, both inclusive.
 *
 * The default range includes negative numbers on purpose: data limited to
 * 1–100 is how negative-number bugs in the old sorting code went unnoticed.
 *
 * @param {number} length
 * @param {{ min?: number, max?: number, seed?: number }} [options]
 * @returns {number[]}
 */
export function randomIntegers(length, { min = -100, max = 100, seed = 1 } = {}) {
  const next = createRandom(seed)
  return Array.from({ length }, () => min + Math.floor(next() * (max - min + 1)))
}

/**
 * `length` floats between `min` and `max`, rounded to `digits` decimals.
 *
 * @param {number} length
 * @param {{ min?: number, max?: number, digits?: number, seed?: number }} [options]
 * @returns {number[]}
 */
export function randomFloats(length, { min = -100, max = 100, digits = 2, seed = 1 } = {}) {
  const next = createRandom(seed)
  const scale = 10 ** digits
  return Array.from({ length }, () => Math.round((min + next() * (max - min)) * scale) / scale)
}
