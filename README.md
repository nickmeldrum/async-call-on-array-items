# async-call-on-array-items-node

[![Build Status](https://travis-ci.org/nickmeldrum/async-call-on-array-items-node.svg?branch=master)](https://travis-ci.org/nickmeldrum/async-call-on-array-items-node)
[![Coverage Status](https://coveralls.io/repos/github/nickmeldrum/async-call-on-array-items-node/badge.svg?branch=master)](https://coveralls.io/github/nickmeldrum/async-call-on-array-items-node?branch=master)
[![NPM Version](https://img.shields.io/npm/v/async-call-on-array-items.svg)](https://www.npmjs.com/package/async-call-on-array-items)
[![NPM Downloads](https://img.shields.io/npm/dw/async-call-on-array-items.svg)](https://www.npmjs.com/package/async-call-on-array-items)

"Wait for all async invocations of functions on all array items."

A ridiculously simple package. Probably best not to actually use this, but to learn from it.

The implementation is simply:

```
module.exports = (func, items) => Promise.all(items.map(func))
```

## What is this for?

If you want to run an async function on all items in an array, you can't just use the normal array methods like `forEach()` if you want to wait for all the async methods to complete before continuing.

I mostly wrote this to remind myself of this syntax as I find myself using the pattern quite often in async code

## Installation

`yarn add async-call-on-array-items`

or

`npm install async-call-on-array-items`

## Basic usage example

The following code will log out the array: `['hella', 'warld']`. For simplicity I am artificially making this potentially synchronous method asynchronous to show the point of the method. The point being that it will wait for all of the called async functions to complete before returning (because of `Promise.all`)

```
const asyncCallOnArrayItems = require('async-call-on-array-items')
const pause = delay => new Promise(resolve => { setTimeout(resolve, delay) })

const asyncFunc = async item => {
  await pause(1)
  return item.replace('o', 'a')
}
asyncCallOnArrayItems(asyncFunc, ['hello', 'world']).then(result => console.log(result))
```

Notice that it doesn't support callbacks and is promisified by default.

## API

### asyncCallOnArrayItems method

This is the only method available in the library. It is the default export (there are no named exports.)

It expects 2 required parameters.

#### asyncFunc: function (required)

The async function that you want to run against every item in the array.
Note there is no point in using this is your function is not async - just use `Array.forEach()` in that case.

#### items: Array (required)

The array containing the items you want passed into each function

## Errors

### Invalid Arguments

If too few arguments are supplied, then an `Error: More arguments needed` is thrown.
If arguments supplied are of the wrong type, then a `TypeError` is thrown.
If the array is empty, then a `RangeError` is thrown.

## Examples

See basic usage above, not too many variations on that really.

## License

[ISC](https://opensource.org/licenses/ISC)
(i.e. feel free to use this for any purpose, but I accept no liability for it's use.)

## Contributing

Feel free to [open issues](https://github.com/nickmeldrum/async-call-on-array-items-node/issues) or even better [submit pull requests](https://github.com/nickmeldrum/async-call-on-array-items-node/pulls).

### Guidelines for contributing (good pull requests):

 * Please follow the style that is already present in the repository.
 * Please ensure the code passes all lint (eslint) and format (prettier) rules (Check using `yarn lint`.)
 * Please ensure all (jest) tests are passing (Check using `yarn test`.)
 * Please ensure all code is covered by tests. (Check the coverage report created by `yarn test`.)
 * Please ensure any change in the public api is documented properly in the *README*.

If you would like to become a maintainer, feel free to [contact me](https://github.com/nickmeldrum). You would probably have to have become known to me via submitted pull requests first.

## Keywords

 * async
 * arrays
