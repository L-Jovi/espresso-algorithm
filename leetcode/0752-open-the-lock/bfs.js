/**
 * LeetCode 752. Open the Lock — https://leetcode.com/problems/open-the-lock/
 * A lock has four wheels of digits 0–9 and starts at "0000"; one turn moves
 * one wheel one step up or down, and 9 wraps around to 0. Return the fewest
 * turns to reach `target` without ever showing one of the `deadends`, or −1.
 *
 * Breadth-first search: every code is a node, and each has eight
 * neighbors, one turn away. Visiting the codes in order of distance from
 * "0000", level by level, means the first time the target shows up, it is
 * reached in the fewest turns. Dead ends are simply never entered.
 *
 * Time: O(10⁴ · 8), every code at most once. Space: O(10⁴).
 */

export function openLock(deadends, target) {
  const dead = new Set(deadends)
  if (dead.has('0000')) return -1
  const seen = new Set(['0000'])
  let level = ['0000']
  for (let turns = 0; level.length > 0; turns++) {
    const next = []
    for (const code of level) {
      if (code === target) return turns
      for (const neighbor of neighbors(code)) {
        if (seen.has(neighbor) || dead.has(neighbor)) continue
        seen.add(neighbor)
        next.push(neighbor)
      }
    }
    level = next
  }
  return -1
}

/** The eight codes one turn away from `code`. */
export function neighbors(code) {
  const result = []
  for (let wheel = 0; wheel < 4; wheel++) {
    for (const step of [1, 9]) { // one up; nine up is one down
      const digit = (Number(code[wheel]) + step) % 10
      result.push(code.slice(0, wheel) + digit + code.slice(wheel + 1))
    }
  }
  return result
}

if (import.meta.main) console.log(openLock(['0201', '0101', '0102', '1212', '2002'], '0202'))
