import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { subdomainVisits } from './hash-map.js'

const anyOrder = { check: (actual, expected) => assert.deepEqual(actual.toSorted(), expected.toSorted()) }

checkApproaches({ 'hash map': subdomainVisits }, [
  { input: [['9001 discuss.leetcode.com']], expected: ['9001 discuss.leetcode.com', '9001 leetcode.com', '9001 com'] },
  {
    input: [['900 google.mail.com', '50 yahoo.com', '1 intel.mail.com', '5 wiki.org']],
    expected: ['901 mail.com', '50 yahoo.com', '900 google.mail.com', '5 wiki.org', '5 org', '1 intel.mail.com', '951 com'],
  },
  { input: [['1 a.constructor', '2 b.constructor']], expected: ['1 a.constructor', '2 b.constructor', '3 constructor'], label: 'a domain named like an Object.prototype property' },
], anyOrder)

// Reference: split into labels and rejoin every suffix.
function visitsBySplitting(cpdomains) {
  const totals = new Map()
  for (const entry of cpdomains) {
    const [count, domain] = entry.split(' ')
    const labels = domain.split('.')
    labels.forEach((_, i) => {
      const suffix = labels.slice(i).join('.')
      totals.set(suffix, (totals.get(suffix) ?? 0) + Number(count))
    })
  }
  return [...totals].map(([domain, total]) => `${total} ${domain}`)
}

it('agrees with splitting and rejoining the labels on 500 random inputs', () => {
  const next = createRandom(811)
  const label = () => ['a', 'b', 'mail', 'com', 'org'][Math.floor(next() * 5)]
  for (let round = 0; round < 500; round++) {
    const cpdomains = Array.from({ length: 1 + Math.floor(next() * 6) }, () =>
      `${1 + Math.floor(next() * 9999)} ${Array.from({ length: 2 + Math.floor(next() * 2) }, label).join('.')}`)
    assert.deepEqual(subdomainVisits(cpdomains).toSorted(), visitsBySplitting(cpdomains).toSorted())
  }
})
