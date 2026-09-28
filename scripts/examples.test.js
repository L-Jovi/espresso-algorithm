// Every file that ends with an `if (import.meta.main)` example must run with
// `node <file>`, print something, and exit cleanly. Importing the same file
// must print nothing, so tests and other modules can use it quietly.
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { listFiles } from './lib/files.mjs'
import { SECTIONS } from './lib/layout.mjs'

const examples = listFiles(file =>
  SECTIONS.some(section => file.startsWith(section)) &&
  file.endsWith('.js') &&
  !file.endsWith('.test.js') &&
  readFileSync(file, 'utf8').includes('if (import.meta.main)'))

describe('runnable examples', () => {
  it('found some examples to run', () => assert.ok(examples.length > 0))

  for (const file of examples) {
    it(`${file} prints an example and exits 0`, { timeout: 30_000 }, () => {
      const output = execFileSync(process.execPath, [file], { encoding: 'utf8' })
      assert.ok(output.trim().length > 0, 'the example printed nothing')
    })

    it(`${file} prints nothing when imported`, { timeout: 30_000 }, () => {
      const url = pathToFileURL(file).href
      const output = execFileSync(process.execPath, ['--input-type=module', '-e', `await import(${JSON.stringify(url)})`], { encoding: 'utf8' })
      assert.equal(output, '')
    })
  }
})
