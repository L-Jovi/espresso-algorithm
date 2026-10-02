import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { APPROACH_NAMES_ZH, checkRace, RACES } from './races.js'

describe('the races of the bench and the race page', () => {
  for (const race of RACES) {
    it(`${race.title}: every approach matches the expected example answer`, () => {
      assert.equal(checkRace(race).passed, true)
    })
  }

  it('rejects agreement on a wrong answer', () => {
    const race = { check: () => [], approaches: { first: () => 3, second: () => 3 }, expected: 4 }
    assert.equal(checkRace(race).passed, false)
  })

  it('have Chinese text for the race page: titles, inputs and every approach', () => {
    const han = /\p{Script=Han}/u
    for (const race of RACES) {
      assert.match(race.titleZh, han, race.title)
      assert.equal(race.titleZh.split('.')[0], race.title.split('.')[0], `${race.title}: the same number`)
      for (const input of race.inputs) assert.ok(input.labelZh, `${race.title}: ${input.label}`)
      for (const name of Object.keys(race.approaches)) assert.ok(APPROACH_NAMES_ZH[name], `${race.title}: ${name}`)
    }
  })

  it('name real folders, and only real approaches as slow', () => {
    for (const race of RACES) {
      assert.ok(existsSync(new URL(race.id, import.meta.url)), race.id)
      for (const input of race.inputs) {
        for (const name of input.slow ?? []) assert.ok(name in race.approaches, `${race.title}: ${name}`)
      }
    }
  })
})
