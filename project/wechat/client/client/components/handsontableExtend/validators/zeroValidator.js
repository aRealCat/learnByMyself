/**
 * Greater than zero Validator
 * 小于等于0 为false
 */
function zeroValidator (value, callback) {
  var result = true
  if (value <= 0) { // 可能为非必填项，则不需要数字验证： (typeof value) != 'number'
    result = false
  }
  return callback(result)
}

export default zeroValidator
