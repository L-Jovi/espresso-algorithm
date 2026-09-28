/**
 * Add two non-negative integers written as decimal strings.
 *
 * A JavaScript number is a double, which holds integers exactly only up to
 * Number.MAX_SAFE_INTEGER (2^53 − 1). Beyond that, 9007199254740993 + 1
 * gives 9007199254740992. Adding the strings the way it is done on paper
 * avoids the problem: start from the last digits, add the two digits and the
 * carry, keep the last digit of the sum and carry the rest.
 *
 * Since ES2020, BigInt does this for you: (BigInt(a) + BigInt(b)).toString().
 * The tests use it to check this function on thousands of random numbers.
 * LeetCode 415, Add Strings, is the same problem.
 *
 * Time: O(max(n, m)) for inputs with n and m digits. Space: O(max(n, m)).
 */

/**
 * @param {string} a digits only, e.g. "12345678901234567890"
 * @param {string} b digits only
 * @returns {string} the sum, without leading zeros
 */
export function add(a, b) {
  if (!/^\d+$/.test(a) || !/^\d+$/.test(b)) {
    throw new TypeError(`add() takes two strings of decimal digits, got ${JSON.stringify(a)} and ${JSON.stringify(b)}`)
  }
  const digitsA = [...a].reverse().map(Number)
  const digitsB = [...b].reverse().map(Number)
  const result = []
  let carry = 0
  for (let i = 0; i < Math.max(digitsA.length, digitsB.length); i++) {
    const sum = (digitsA[i] ?? 0) + (digitsB[i] ?? 0) + carry
    result.push(sum % 10)
    carry = sum >= 10 ? 1 : 0
  }
  if (carry) result.push(carry)
  // Inputs such as "007" would otherwise keep their leading zeros.
  return result.reverse().join('').replace(/^0+(?=\d)/, '')
}

if (import.meta.main) {
  console.log('add("99", "99"):', add('99', '99'))
  console.log('as strings:   9007199254740993 + 1 =', add('9007199254740993', '1'))
  console.log('as numbers:   9007199254740993 + 1 =', 9007199254740993 + 1)
}
