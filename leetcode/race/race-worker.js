// Times the approaches of a race away from the page's main thread, so the
// page stays responsive while brute force takes its time.
import { RACES } from '../races.js'

const byId = new Map(RACES.map(race => [race.id, race]))

// Browsers round performance.now(), to as coarse as a millisecond, so a
// fast approach is timed over enough repeated calls to take 50 ms, on the
// same input when the race allows it. A slow one is the fastest of three.
function timePerCall(race, solve, build) {
  const once = args => {
    const start = performance.now()
    solve(...args)
    return performance.now() - start
  }
  const first = once(build())
  if (first >= 20) return Math.min(first, once(build()), once(build()))
  const repeats = Math.min(10_000, Math.max(3, Math.ceil(50 / Math.max(first, 0.001))))
  if (race.fresh) {
    const sets = Array.from({ length: Math.min(repeats, 30) }, build)
    const start = performance.now()
    for (const args of sets) solve(...args)
    return (performance.now() - start) / sets.length
  }
  const args = build()
  const start = performance.now()
  for (let i = 0; i < repeats; i++) solve(...args)
  return (performance.now() - start) / repeats
}

onmessage = ({ data }) => {
  const race = byId.get(data.race)
  try {
    if (data.type === 'check') {
      const answers = Object.values(race.approaches).map(solve => (race.answer ?? (x => x))(solve(...race.check())))
      postMessage({ type: 'check', race: race.id, agree: answers.every(answer => JSON.stringify(answer) === JSON.stringify(answers[0])), answer: answers[0] })
    } else {
      const input = race.inputs[data.input]
      postMessage({ type: 'time', race: race.id, input: data.input, approach: data.approach, ms: timePerCall(race, race.approaches[data.approach], input.build) })
    }
  } catch (error) {
    postMessage({ type: 'error', race: race?.id, approach: data.approach, message: String(error?.message ?? error) })
  }
}
