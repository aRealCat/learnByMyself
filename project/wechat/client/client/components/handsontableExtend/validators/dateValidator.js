/**
 * 交货日期与制单日期的比较验证
 * 交货日期 >= 制单日期 为true
 * 反之则 false
 */
function dateValidator (value, callback) {
  // let billTime // 制单日期
  let result = true
  let createDate = this.instance.getPlugin('StorePlugin').createDate

  if (value === '') {
    // 交货日期为空
    callback(result)
    return
  }

  if (value < createDate) {
    result = false
  }

  return callback(result)
}

export default dateValidator
