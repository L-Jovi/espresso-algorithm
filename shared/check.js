/**
 * Run every approach to a problem on the same table of cases.
 *
 * Each approach gets its own describe() block and each case its own test,
 * so a failure names both the approach and the input. Inputs are copied
 * before every call, because some solutions rearrange their input.
 */
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

/**
 * @param {Record<string, Function>} approaches name → solution
 * @param {{ input: unknown[], expected: unknown, label?: string }[]} cases
 * @param {{
 *   prepare?: (input: unknown[]) => unknown[],
 *   check?: (actual: unknown, expected: unknown, input: unknown[]) => void,
 * }} [options] prepare builds the arguments (default: a deep copy);
 *   check compares the result (default: deep equality)
 */
export function checkApproaches(approaches, cases, options = {}) {
  const prepare = options.prepare ?? (input => structuredClone(input))
  const check = options.check ?? ((actual, expected) => assert.deepEqual(actual, expected))
  for (const [name, solve] of Object.entries(approaches)) {
    describe(name, () => {
      for (const { input, expected, label } of cases) {
        it(label ?? JSON.stringify(input), () => check(solve(...prepare(input)), expected, input))
      }
    })
  }
}
