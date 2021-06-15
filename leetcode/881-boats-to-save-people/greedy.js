/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 * https://leetcode-cn.com/problems/boats-to-save-people/solution/jiu-sheng-ting-by-leetcode/
 */
const numRescueBoats = (people, limit) => {
  // sort
  people.sort((a, b) => a - b)
  console.log(people)

  let l = 0
  let r = people.length - 1
  let count = 0

  while (l <= r) {
    count++

    // light + heavy => 1 boat l++ r--
    // heavy => 1boat r--
    if (people[l] + people[r] <= limit) {
      l++
    }

    r--
  }

  return count
}


const people = [44, 10, 29, 12, 49, 41, 23, 5, 17, 26]
const limit = 50
console.log(numRescueBoats(people, limit))
