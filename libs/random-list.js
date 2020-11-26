const Mock = require('mockjs')

const randomArray = {
  list10: () => {
    const { list10 } = Mock.mock({ 'list10|10': [ '@integer(1,100)' ] })
    console.log('Origin list (length=10):', list10, '\n')
    return list10;
  },
  list100: () => {
    const { list100 } = Mock.mock({ 'list100|100': [ '@integer(1,100)' ] })
    console.log('Origin list (length=100):', list100, '\n')
    return list100;
  },
  list1000: () => {
    const { list1000 } = Mock.mock({ 'list1000|1000': [ '@integer(1,100)' ] })
    console.log('Origin list (length=1000):', list1000, '\n')
    return list1000;
  },
  list10000: () => {
    const { list10000 } = Mock.mock({ 'list10000|10000': [ '@integer(1,100)' ] })
    console.log('Origin list (length=10000):', list10000, '\n')
    return list10000;
  },
  list100000: () => {
    const { list100000 } = Mock.mock({ 'list100000|100000': [ '@integer(1,100)' ] })
    console.log('Origin list (length=100000):', list100000, '\n')
    return list100000;
  },
}

module.exports = randomArray
