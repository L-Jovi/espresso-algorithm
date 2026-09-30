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

/**
 * Run a design problem in LeetCode's format: a list of method names and a
 * list of their arguments, where the first entry constructs the object.
 * Returns what each call returned, with null for the constructor and for
 * methods that return nothing, as LeetCode shows it.
 *
 * @example runOperations(Trie, ['Trie', 'insert', 'search'], [[], ['a'], ['a']]) // [null, null, true]
 */
export function runOperations(Class, operations, args) {
  const object = new Class(...args[0])
  return [null, ...operations.slice(1).map((name, i) => object[name](...args[i + 1]) ?? null)]
}
