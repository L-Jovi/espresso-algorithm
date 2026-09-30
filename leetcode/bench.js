// Race the approaches of every problem here that has several on one input:
// `npm run bench:leetcode`. The races themselves, their inputs and the
// approaches that sit out an input, are in races.js; the site's race page
// runs the same ones in your browser.
//
// Each time is the fastest of three runs on a freshly built input, which
// smooths out just-in-time compilation and garbage collection. Timings
// depend on the machine: compare the rows of one problem, not the numbers
// themselves.
import { measure } from '../shared/measure.js'
import { RACES } from './races.js'

const bestOfThree = (solve, build) => Math.min(...[1, 2, 3].map(() => measure(solve, ...build()).ms))
const format = ms => (ms < 0.01 ? '< 0.01' : ms < 10 ? ms.toFixed(2) : ms.toFixed(0))

console.log(`Milliseconds per call, best of 3; Node ${process.version}, ${new Date().toISOString().slice(0, 10)}`)
for (const { title, approaches, inputs } of RACES) {
  const widths = inputs.map(input => Math.max(input.label.length, 8))
  console.log(`\n${title}`)
  console.log(`  ${''.padEnd(22)}  ${inputs.map((input, i) => input.label.padStart(widths[i])).join('  ')}`)
  for (const [name, solve] of Object.entries(approaches)) {
    const cells = inputs.map((input, i) =>
      (input.slow?.includes(name) ? '–' : format(bestOfThree(solve, input.build))).padStart(widths[i]))
    console.log(`  ${name.padEnd(22)}  ${cells.join('  ')}`)
  }
}
