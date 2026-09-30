/**
 * LeetCode 811. Subdomain Visit Count — https://leetcode.com/problems/subdomain-visit-count/
 * Each entry reads "count domain", such as "9001 discuss.leetcode.com". A
 * visit to a domain also visits every domain it belongs to, here
 * leetcode.com and com. Return the total visits of every domain in the same
 * format, in any order.
 *
 * Hash map: for each entry, the domain itself and every suffix after one of
 * its dots get the entry's visits added. The totals live in a Map. With a
 * plain object, a domain such as "constructor" found the object's inherited
 * constructor function and "added" to it, turning the total into text.
 *
 * Time: O(total characters): a domain has at most two dots. Space: O(number
 * of different domains).
 * Learning source: https://leetcode.cn/problems/subdomain-visit-count/solutions/38846/zi-yu-ming-fang-wen-ji-shu-by-leetcode/
 */

export function subdomainVisits(cpdomains) {
  const visits = new Map()
  for (const entry of cpdomains) {
    const [count, domain] = entry.split(' ')
    for (let suffix = domain; ; suffix = suffix.slice(suffix.indexOf('.') + 1)) {
      visits.set(suffix, (visits.get(suffix) ?? 0) + Number(count))
      if (!suffix.includes('.')) break
    }
  }
  return [...visits].map(([domain, total]) => `${total} ${domain}`)
}

if (import.meta.main) console.log(subdomainVisits(['900 google.mail.com', '50 yahoo.com', '1 intel.mail.com', '5 wiki.org']))
