let Mock = require('mockjs')
let Random = Mock.Random
Mock.mock('table.json','get' , {
  result: true,
  'array| 20-99': [
    {
      date: Random.date('yyyy-MM-dd'),
      name: Random.cname(),
      address: Random.province()
    }
  ]
})
