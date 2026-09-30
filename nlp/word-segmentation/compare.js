// Segment every example sentence three ways: `node nlp/word-segmentation/compare.js`.
// A mark before a line shows where forward maximum matching and the graph
// disagree; Intl.Segmenter's answer depends on the ICU version printed first.
import { dagDp } from './dag-dp.js'
import { forwardMaxMatch } from './forward-max-match.js'
import { intlSegment } from './intl-segmenter.js'
import { AMBIGUOUS, SENTENCES } from './sentences.js'

console.log(`Intl.Segmenter uses ICU ${process.versions.icu} (Node ${process.version})\n`)
for (const sentence of [...SENTENCES, ...AMBIGUOUS]) {
  const [greedy, graph] = [forwardMaxMatch(sentence), dagDp(sentence)]
  const mark = greedy.join() === graph.join() ? ' ' : '≠'
  console.log(sentence)
  console.log(`  forward max match ${mark} ${greedy.join(' · ')}`)
  console.log(`  graph + DP          ${graph.join(' · ')}`)
  console.log(`  Intl.Segmenter      ${intlSegment(sentence).join(' · ')}\n`)
}
