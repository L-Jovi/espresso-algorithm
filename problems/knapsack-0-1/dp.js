/**
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485064&idx=1&sn=550705eb67f5e71487c8b218382919d6&chksm=9bd7f880aca071962a5a17d0f85d979d6f0c5a5ce32c84b8fee88e36d451f9ccb3bb47b88f78&scene=21#wechat_redirect
 * 给你一个可装载重量为 W 的背包和 N 个物品，每个物品有重量和价值两个属性。
 * 其中第 i 个物品的重量为 wt[i]，价值为 val[i]，现在让你用这个背包装物品，最多能装的价值是多少
 *
 * N = 3, W = 4
 * wt = [2, 1, 3]
 * val = [4, 2, 3]
 * 算法返回 6，选择前两件物品装进背包，总重量 3 小于 W，可以获得最大价值 6。
 *
 * @param {number} w
 * @param {number} n
 * @param {number[]} wt
 * @param {number[]} val
 * @return {number}
 */
const knapsack_0_1 = (W, N, wt, val) => {
  const dp = Array.from(Array(N + 1), () => Array(W + 1).fill(0))

  for (let i = 1; i <= N; i++) {
    for (let w = 1; w <= W; w++) {
      // not put in
      if (w - wt[i - 1] < 0) {
        dp[i][w] = dp[i - 1][w]

      // put in
      } else {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          val[i - 1] + dp[i - 1][w - wt[i - 1]]
        )
      }
    }
  }

  return dp[N][W]
}


const W = 4
const N = 3
const wt = [2, 1, 3]
const val = [4, 2, 3]
console.log(knapsack_0_1(W, N, wt, val))
