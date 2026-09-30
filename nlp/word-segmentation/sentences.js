/**
 * The example sentences. The first eleven come from the first version of
 * this folder, which parsed how many of which food expire when. The last
 * two are classic examples of ambiguous Chinese, where the longest word
 * at one position is the wrong one.
 */

export const SENTENCES = [
  '3个明天过期的鸡蛋',
  '4个苹果在后天过期',
  '大前天过期的1瓶牛奶',
  '下个月过期的3块巧克力',
  '大后天有五个香蕉过期',
  '十五 个葡萄在这周六过期',
  '5 个猕猴桃下周三过期',
  '1个桃子有效期至2023年6月11日',
  '3个杨梅有效期至二零二二年六月11日',
  '三十五个圣女果有效期是二零二三年九月三日',
  '3个小黄瓜有效期至2023年10月2日',
]

export const AMBIGUOUS = [
  '结婚的和尚未结婚的', // the married and the not yet married
  '研究生命的起源', // study the origin of life
]
