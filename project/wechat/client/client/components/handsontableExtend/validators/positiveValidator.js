function positiveValidator (value, callback) {
  var result = true
  if (value < 0) {
    result = false
  }
  return callback(result)
}

export default positiveValidator
