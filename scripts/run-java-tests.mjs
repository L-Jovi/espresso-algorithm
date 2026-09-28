// Run every Java file in the converted sections with the single-file source
// launcher (`java File.java`, Java 11 or newer, no compile step). Each file's
// main() checks its own answers and exits with status 1 when one is wrong.
// Fails when no Java file is found, so an empty run cannot look green.
import { spawnSync } from 'node:child_process'
import { listFiles } from './lib/files.mjs'
import { SECTIONS } from './lib/layout.mjs'

const files = listFiles(file => file.endsWith('.java') && SECTIONS.some(section => file.startsWith(section)))
if (files.length === 0) {
  console.error('No .java files found.')
  process.exit(1)
}

let failures = 0
for (const file of files) {
  const { status, stdout, stderr, error } = spawnSync('java', [file], { encoding: 'utf8' })
  if (error) {
    console.error(`Could not start java: ${error.message}`)
    process.exit(1)
  }
  const ok = status === 0
  if (!ok) failures++
  console.log(`${ok ? '✔' : '✖'} ${file}`)
  if (!ok) console.log(`${stdout}${stderr}`.trim().replace(/^/gm, '    '))
}
console.log(`\n${files.length - failures} of ${files.length} Java files passed.`)
process.exit(failures === 0 ? 0 : 1)
