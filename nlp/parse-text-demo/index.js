const Recognizers = require('@microsoft/recognizers-text-suite');
const NumberRecognizers = require('@microsoft/recognizers-text-number');
const NumberWithUnitRecognizers = require('@microsoft/recognizers-text-number-with-unit');
const DateTimeRecognizers = require('@microsoft/recognizers-text-date-time');
const SequenceRecognizers = require('@microsoft/recognizers-text-sequence');
const ChoiceRecognizers = require('@microsoft/recognizers-text-choice');

const nodejieba = require('nodejieba');
nodejieba.load({
  userDict: './meal.dict.utf8',
});


// corpus resource (zh-hans)
const sentences = [
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
];


function parseSentences(parse) {
  for (const sentence of sentences) {
    const result = parse(sentence, Recognizers.Culture.Chinese);
    console.log('input: ', sentence);
    console.log('result: ', result);
    if (result.length > 0 && result[0].resolution && result[0].resolution.values) {
      for (let r of result) {
        for (let v of r.resolution.values) {
          console.log('result.resolution.value: ', v);
        }
      }
      console.log('\n\n');
    }
    else {
      console.log('\n\n');
    }
  }
}

// microsoft recognizers-text
parseSentences(Recognizers.recognizeNumber);
parseSentences(Recognizers.recognizeDateTime);

// tag words
for (let sentence of sentences) {
  const result1 = nodejieba.tag(sentence);
  const result2 = nodejieba.cut(sentence);
  console.log('\n\n', result1, result2);
}
