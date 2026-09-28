// Run every *.test.js file with Node's built-in test runner.
//
// `node --test` on its own exits 0 when no test file matches, so a broken
// pattern would look green. This script fails instead. It also refuses Node
// versions without import.meta.main, which the runnable examples rely on.
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { listFiles } from './lib/files.mjs'

function fail(message) {
  console.error(message)
  process.exit(1)
}

if (typeof import.meta.main !== 'boolean') {
  fail(`Node ${process.version} has no import.meta.main. Use Node ^22.18.0 or >=24.2.0.`)
}

const files = listFiles(file => file.endsWith('.test.js'))
if (files.length === 0) fail('No *.test.js files found.')

const dir = mkdtempSync(join(tmpdir(), 'espresso-tests-'))
const tapFile = join(dir, 'report.tap')
const { status } = spawnSync(
  process.execPath,
  [
    '--test',
    '--test-reporter=spec', '--test-reporter-destination=stdout',
    '--test-reporter=tap', `--test-reporter-destination=${tapFile}`,
    ...files,
  ],
  { stdio: 'inherit' },
)

const report = readFileSync(tapFile, 'utf8')
rmSync(dir, { recursive: true, force: true })
const tests = Number(report.match(/^# tests (\d+)$/m)?.[1] ?? 0)
if (tests === 0) fail('The test run finished without running a single test.')
process.exit(status ?? 1)
