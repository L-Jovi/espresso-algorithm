/**
 * Record every read and write that a sort makes on an array, so that the
 * visualizer can replay them one at a time.
 *
 * The sort receives a Proxy of the array instead of the array itself. The
 * Proxy's get and set traps see each access by index, also the ones made
 * by built-in helpers such as the array iterator behind for...of, and pass
 * them through unchanged, so the sort runs exactly as it always does. A
 * counting comparator records the comparisons as steps too, for sorts that
 * take one; radix sort compares nothing.
 *
 * Only sorts that rearrange the array they are given can be traced. A sort
 * that builds and returns a new array, such as the copying merge sort,
 * leaves no writes to replay; sorts.js lists the ones that can.
 */

/** The integer index that `key` names, or undefined for other properties such as length. */
function indexOf(key) {
  if (typeof key !== 'string') return undefined
  const index = Number(key)
  return Number.isInteger(index) && index >= 0 && String(index) === key ? index : undefined
}

/**
 * @param {(array: number[], compare?: (a: number, b: number) => number) => unknown} sort
 * @param {number[]} values the input; it is copied, never changed
 * @returns {{ steps: { kind: 'read' | 'write' | 'compare', index?: number, value?: number }[], sorted: number[], comparisons: number }}
 */
export function trace(sort, values) {
  const array = [...values]
  const steps = []
  let comparisons = 0
  const proxy = new Proxy(array, {
    get(target, key, receiver) {
      const index = indexOf(key)
      if (index !== undefined && index < target.length) steps.push({ kind: 'read', index })
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const index = indexOf(key)
      if (index !== undefined) steps.push({ kind: 'write', index, value })
      return Reflect.set(target, key, value, receiver)
    },
  })
  sort(proxy, (a, b) => {
    comparisons++
    steps.push({ kind: 'compare' })
    return a - b
  })
  return { steps, sorted: array, comparisons }
}

/** Apply the writes among `steps` to a copy of `values`: the replay the visualizer draws. */
export function replay(values, steps) {
  const array = [...values]
  for (const step of steps) if (step.kind === 'write') array[step.index] = step.value
  return array
}
