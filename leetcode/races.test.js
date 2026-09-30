import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { RACES } from './races.js'

describe('the races of the bench and the race page', () => {
  for (const race of RACES) {
    it(`${race.title}: every approach gives the same answer to LeetCode's example`, () => {
      const answers = Object.values(race.approaches).map(solve => (race.answer ?? (x => x))(solve(...race.check())))
      for (const answer of answers) assert.deepEqual(answer, answers[0])
    })
  }

  it('name real folders, and only real approaches as slow', () => {
    for (const race of RACES) {
      assert.ok(existsSync(new URL(race.id, import.meta.url)), race.id)
      for (const input of race.inputs) {
        for (const name of input.slow ?? []) assert.ok(name in race.approaches, `${race.title}: ${name}`)
      }
    }
  })
})
