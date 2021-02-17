/* 给定两个长度都为N的数组weights和values，
 * weights[i]和values[i]分别代表 i 号物品的重量和价值。
 * 给定一个正数bag，表示一个载重bag的袋子，你装的物品不能超过这个重量。
 * 返回你能装下最多的价值是多少? */


/* 暴力递归就是尝试
 * 1. 把问题转化为规模缩小了的同类问题的子问题
 * 2. 有明确的不需要继续进行递归的条件(base case)
 * 3. 有当得到了子问题的结果之后的决策过程
 * 4. 不记录每一个子问题的解 */


const getMaxValue1 = (weights, values, bag) => {
  return process(weights, values, 0, bag);
}

// index: 当前决策的 item
// rest: 背包剩下的空间
// @return: 当前的 index 决策后返回的能装的最大价值
const process = (w, v, index, rest) => {
  // 分析不需要继续的条件

  // 如果没有剩余空间
  if (rest <= 0) return 0;
  // 如果东西被装完了
  if (index === w.length) return 0;

  // 不同可能性
  // probability 1
  let p1 = process(w, v, index + 1, rest);
  // probability 2
  let p2 = 0;
  if (rest >= w[index]) {
    p2 = v[index] + process(w, v, index + 1, rest - w[index]);
  }

  return Math.max(p1, p2);
}

const weights1 = [3, 2, 4, 7];
const values1 = [5, 6, 3, 19];
let bag1 = 11;

const ans1 = getMaxValue1(weights1, values1, bag1);
console.log(ans1);


/* 暴力递归的分析过程抽象出来就是动态规划的转移方程。
 * 把参数组合玩成一个结构化的缓存。
 *
 * 确定好 DP 表的范围、返回的项（看暴力递归 process 的可变参数）
 * 递归函数怎么调用，动态规划就怎么填
 * 按照暴力递归的决策过程，来填写 dp 表里的每一个值 */


const getMaxValueDp = (weights, values, bag) => {
  let dp = [];
  let N = weights.length;
  for (let i = 0; i <= N; i++) {
    let col = new Array(bag + 1);
    col.fill(0);
    dp[i] = col;
  }
  for (let i = N - 1; i >= 0; i--) {
    for (let j = 0; j <= bag; j++) {
      let p1 = dp[i + 1][j];
      let p2 = -Infinity;
      if (j >= weights[i]) {
        p2 = dp[i + 1][j - weights[i]] + values[i];
      }
      dp[i][j] = Math.max(p1, p2);
    }
  }
  return dp[0][bag];
}

const ans2 = getMaxValueDp(weights1, values1, bag1);
console.log(ans2);
