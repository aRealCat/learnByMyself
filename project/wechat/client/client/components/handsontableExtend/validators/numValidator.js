/**
 * 验证单重
 * 情况含
 * 1
 * 1-2
 * >1
 * <2
 * 1~2
 * 0.5
 * 0.5-2-4
 */
function numValidator (value, callback) {
  let result = true
  let mtIndex = 0
  let lsIndex = 0
  let valueArray
  if (value && value !== '' && value !== null) {
    mtIndex = value.indexOf('>')
    lsIndex = value.indexOf('<')
    if (/^([<>]?)(\d+(\.\d+)?)(([~-]){0}[0-9]*(.)?[0-9])*$/.test(value)) {
      if ((mtIndex === 0 && lsIndex === -1) || (mtIndex === -1 && lsIndex === 0)) {
        value = value.substring(1)
      }
      valueArray = value.split(/[~-]/)

      for (let i = 0; i < valueArray.length; i++) {
        if (!/^\d+(\.\d+)?$/.test(valueArray[i])) {
          result = false
          break
        }
      }
    } else {
      result = false
    }
  }
  return callback(result)
}

export default numValidator
