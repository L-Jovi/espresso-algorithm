/*
 * 
 * @Description: Using dp table (fibonacci sequence).
 * @Example: 1 1 2 3 5 8 13
 * @Refer: https://labuladong.github.io/algo/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E7%B3%BB%E5%88%97/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E8%AF%A6%E8%A7%A3%E8%BF%9B%E9%98%B6.html
 * @FileName: dp.js
 * O(n)
 */

const timer = require('../../libs/timer')

/**
 * Recursive implementation of dynamic programming.
 *
 * @param {number} k
 * @returns {number}
 */
function dynamicPlan(k) {
  if (k < 1) {
    return 0

  } else if (k === 1 || k === 2) {
    return 1

  } else {
    const dp = [0]
    dp[1] = dp[2] = 1

    for (i = 3; i <= k; i++) {
      dp[i] = dp[i - 1] + dp[i - 2]
    }

    return dp[k]
  }
}


timer(dynamicPlan, 100)
