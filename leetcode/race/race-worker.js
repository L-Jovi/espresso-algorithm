// Times the approaches of a race away from the page's main thread, so the
// page stays responsive while brute force takes its time.
import { checkRace, RACES } from '../races.js'

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
  const reply = message => postMessage({ ...message, runId: data.runId, requestId: data.requestId })
  try {
    if (data.type === 'init') {
      reply({ type: 'ready' })
    } else if (data.type === 'check') {
      reply({ type: 'check', race: race.id, ...checkRace(race) })
    } else if (data.type === 'time') {
      const input = race.inputs[data.input]
      reply({ type: 'time', race: race.id, input: data.input, approach: data.approach, ms: timePerCall(race, race.approaches[data.approach], input.build) })
    } else throw new Error('Unknown request')
  } catch (error) {
    reply({ type: 'error', race: race?.id, approach: data.approach, message: String(error?.message ?? error) })
  }
}
