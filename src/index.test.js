const asyncCallOnArrayItems = require('../')

const { MoreArgumentsNeededError } = asyncCallOnArrayItems

const pause = delay =>
  new Promise(resolve => {
    setTimeout(resolve, delay)
  })

describe('async call on array items', () => {
  test('it throws a "More arguments needed" error if no arguments passed in', async () => {
    await expect(asyncCallOnArrayItems()).rejects.toThrow(MoreArgumentsNeededError)
  })

  test('it throws a "More arguments needed" error if 1 argument passed in', async () => {
    await expect(asyncCallOnArrayItems(() => {})).rejects.toThrow(MoreArgumentsNeededError)
  })

  test('it throws a TypeError error if 1st argument is not a function', async () => {
    await expect(asyncCallOnArrayItems('', [''])).rejects.toThrow(TypeError)
  })

  test('it throws a TypeError error if 2nd argument is not an array', async () => {
    await expect(asyncCallOnArrayItems(() => {}, 'hi')).rejects.toThrow(TypeError)
  })

  test('it runs the func', async () => {
    const asyncFunc = jest.fn()
    const asyncFuncWrapper = (...args) => asyncFunc(...args)

    await asyncCallOnArrayItems(asyncFuncWrapper, ['hi'])

    expect(asyncFunc.mock.calls.length).toEqual(1)
  })

  test('it runs the func 3 times if the array has 3 items', async () => {
    const asyncFunc = jest.fn()
    const asyncFuncWrapper = (...args) => asyncFunc(...args)
    await asyncCallOnArrayItems(asyncFuncWrapper, ['hi', 'there', 'world'])

    expect(asyncFunc.mock.calls.length).toEqual(3)
  })

  test('it passes the item into the func', async () => {
    const asyncFunc = jest.fn()
    const asyncFuncWrapper = (...args) => asyncFunc(...args)
    await asyncCallOnArrayItems(asyncFuncWrapper, ['hello', 'world'])

    expect(asyncFunc.mock.calls[0]).toContain('hello')
    expect(asyncFunc.mock.calls[1]).toContain('world')
  })

  test('it returns only when all async functions have completed', async () => {
    let asyncFuncCallCount = 0
    const asyncFunc = async () => {
      await pause(2)
      asyncFuncCallCount += 1
    }
    const asyncFuncWrapper = (...args) => asyncFunc(...args)
    await asyncCallOnArrayItems(asyncFuncWrapper, ['hello', 'world'])

    expect(asyncFuncCallCount).toEqual(2)
  })

  test('it returns an array of all the async functions return values', async () => {
    const asyncFunc = async item => `f${item}`
    const asyncFuncWrapper = (...args) => asyncFunc(...args)
    const result = await asyncCallOnArrayItems(asyncFuncWrapper, ['oh', 'hai', 'world'])

    expect(result).toEqual(['foh', 'fhai', 'fworld'])
  })
})
