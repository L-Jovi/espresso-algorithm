/**
 * Run a function once and report how long it took.
 *
 * `performance.now()` has sub-millisecond resolution, so fast functions no
 * longer measure as 0 ms the way `Date.now()` did. One run includes
 * just-in-time compilation, so treat the number as a rough comparison
 * between approaches, not a benchmark.
 *
 * @template R
 * @param {(...args: any[]) => R} fn
 * @param {...any} args
 * @returns {{ result: R, ms: number }}
 */
export function measure(fn, ...args) {
  const start = performance.now()
  const result = fn(...args)
  return { result, ms: performance.now() - start }
}
