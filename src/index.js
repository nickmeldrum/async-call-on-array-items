function MoreArgumentsNeededError(numberRequired) {
  this.name = 'MoreArgumentsNeededError'
  this.message = `More arguments needed. Required: (${numberRequired})`
  Error.captureStackTrace(this, MoreArgumentsNeededError)
}
MoreArgumentsNeededError.prototype = new Error()

const validateArgs = (func, items) => {
  if (func === undefined || items === undefined) throw new MoreArgumentsNeededError(2)
  if (func === undefined || func === null || typeof func !== 'function')
    throw new TypeError('The first argument must be a function')
  if (items === undefined || items === null || items.constructor !== Array)
    throw new TypeError('The second argument must be an array')
  if (items.length === 0) throw new RangeError('The array must not be empty')
}

const asyncCallOnArrayItems = async (func, items) => {
  validateArgs(func, items)
  return Promise.all(items.map(func))
}

module.exports = asyncCallOnArrayItems
module.exports.MoreArgumentsNeededError = MoreArgumentsNeededError
