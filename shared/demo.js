import { randomIntegers } from './random.js'

/**
 * Print a small, reproducible example of a sort: the input, then the output.
 * Every sorting file calls this when it is run directly with `node <file>`.
 *
 * @param {(array: number[]) => number[]} sort
 * @param {{ length?: number, seed?: number }} [options]
 */
export function showSort(sort, { length = 12, seed = 7 } = {}) {
  const input = randomIntegers(length, { seed })
  console.log(`input:  ${input.join(' ')}`)
  console.log(`sorted: ${sort([...input]).join(' ')}`)
}
