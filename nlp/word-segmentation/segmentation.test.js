import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../../shared/random.js'
import { dagDp } from './dag-dp.js'
import { candidateEnds, characterOffsets, FREQUENCIES, frequency, TOTAL } from './dictionary.js'
import { forwardMaxMatch } from './forward-max-match.js'
import { intlSegment } from './intl-segmenter.js'
import { AMBIGUOUS, SENTENCES } from './sentences.js'

const cut = text => text.split(' ')
const withoutSpaces = sentence => sentence.replace(/\s/g, '')

// With this dictionary both hand-written segmenters are deterministic.
const EXPECTED = [
  cut('3 个 明天 过期 的 鸡蛋'),
  cut('4 个 苹果 在 后天 过期'),
  cut('大前天 过期 的 1 瓶 牛奶'),
  cut('下个月 过期 的 3 块 巧克力'),
  cut('大后天 有 五 个 香蕉 过期'),
  cut('十五 个 葡萄 在 这 周六 过期'),
  cut('5 个 猕猴桃 下 周三 过期'),
  cut('1 个 桃子 有效期 至 2023 年 6 月 11 日'),
  cut('3 个 杨梅 有效期 至 二零二二 年 六 月 11 日'),
  cut('三十五 个 圣女果 有效期 是 二零二三 年 九 月 三 日'),
  cut('3 个 小黄瓜 有效期 至 2023 年 10 月 2 日'),
]

describe('graph + dynamic programming', () => {
  it('splits the eleven example sentences', () => {
    SENTENCES.forEach((sentence, i) => assert.deepEqual(dagDp(sentence), EXPECTED[i], sentence))
  })

  it('reads the two ambiguous sentences the way they are meant', () => {
    assert.deepEqual(dagDp(AMBIGUOUS[0]), cut('结婚 的 和 尚未 结婚 的'))
    assert.deepEqual(dagDp(AMBIGUOUS[1]), cut('研究 生命 的 起源'))
  })
})

describe('forward maximum matching', () => {
  it('agrees with the graph except where the longest word misleads it', () => {
    const differ = SENTENCES.filter((sentence, i) => forwardMaxMatch(sentence).join() !== EXPECTED[i].join())
    assert.deepEqual(differ, ['十五 个葡萄在这周六过期', '5 个猕猴桃下周三过期'])
    assert.deepEqual(forwardMaxMatch(SENTENCES[5]), cut('十五 个 葡萄 在 这周 六 过期'))
    assert.deepEqual(forwardMaxMatch(SENTENCES[6]), cut('5 个 猕猴桃 下周 三 过期'))
  })

  it('is misled by the two classic ambiguous sentences', () => {
    assert.deepEqual(forwardMaxMatch(AMBIGUOUS[0]), cut('结婚 的 和尚 未 结婚 的'))
    assert.deepEqual(forwardMaxMatch(AMBIGUOUS[1]), cut('研究生 命 的 起源'))
  })
})

describe('both hand-written segmenters', () => {
  const segmenters = { 'forward maximum matching': forwardMaxMatch, 'graph + dynamic programming': dagDp }

  it('keeps supplementary Han and emoji whole, and accepts empty or spaced text', () => {
    for (const sentence of ['', '   ', '𠮷野家', '𠀀你好', '你好👋世界', '𠮷 𠀀 ABC 2023 👨‍👩‍👧‍👦']) {
      for (const segment of [...Object.values(segmenters), intlSegment]) {
        const words = segment(sentence)
        assert.equal(words.join(''), withoutSpaces(sentence))
        assert.ok(words.every(word => word.isWellFormed()), sentence)
      }
    }
    assert.deepEqual(characterOffsets('𠮷野家'), [0, 2, 3, 4])
    assert.deepEqual(candidateEnds('𠮷野家', 0), [2])
    assert.deepEqual(dagDp('𠀀你好'), ['𠀀', '你', '好'])
  })

  it('keep 圣女果 whole, the word the first version added to jieba by hand', () => {
    for (const segment of Object.values(segmenters)) assert.ok(segment(SENTENCES[9]).includes('圣女果'))
  })

  it('treat a run of numerals as one candidate, without letting it split a word such as 一直', () => {
    assert.deepEqual(candidateEnds('三十五个', 0), [1, 3])
    for (const segment of Object.values(segmenters)) assert.deepEqual(segment('一直过期'), ['一直', '过期'])
  })

  it('return words that join back into the sentence, on 1,000 random strings of dictionary words', () => {
    const words = [...FREQUENCIES.keys(), '三十五', '2023', '十']
    const next = createRandom(2026)
    for (let round = 0; round < 1000; round++) {
      const sentence = Array.from({ length: 1 + Math.floor(next() * 6) }, () => words[Math.floor(next() * words.length)]).join('')
      for (const [name, segment] of Object.entries(segmenters)) assert.equal(segment(sentence).join(''), withoutSpaces(sentence), `${name}: ${sentence}`)
    }
  })
})

// Reference: try every path through the graph of candidate words.
function bestScoreOfAllSplits(text, start = 0) {
  if (start === text.length) return 0
  return Math.max(...candidateEnds(text, start).map(end =>
    Math.log(frequency(text.slice(start, end))) - Math.log(TOTAL) + bestScoreOfAllSplits(text, end)))
}
const score = words => words.reduce((sum, word) => sum + Math.log(frequency(word)) - Math.log(TOTAL), 0)

it('the graph finds the most likely split, checked against every split of 500 random runs', () => {
  const characters = [...new Set([...FREQUENCIES.keys(), '𠮷𠀀'].join(''))]
  const next = createRandom(2027)
  for (let round = 0; round < 500; round++) {
    const text = Array.from({ length: 1 + Math.floor(next() * 8) }, () => characters[Math.floor(next() * characters.length)]).join('')
    assert.ok(Math.abs(score(dagDp(text)) - bestScoreOfAllSplits(text)) < 1e-9, text)
    assert.ok(score(dagDp(text)) >= score(forwardMaxMatch(text)) - 1e-9, `greedy beat the graph on ${text}`)
  }
})

it('Intl.Segmenter returns pieces that join back into each sentence (its splits depend on the ICU version)', () => {
  for (const sentence of [...SENTENCES, ...AMBIGUOUS]) assert.equal(intlSegment(sentence).join(''), withoutSpaces(sentence))
})
