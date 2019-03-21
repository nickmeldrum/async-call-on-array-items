const asyncCallOnArrayItems = require('../')

describe('async call on array items', () => {
  test('it runs the func', async () => {
    const asyncFunc = jest.fn()
    asyncCallOnArrayItems(asyncFunc, ['hi'])

    expect(asyncFunc.mock.calls.length).toEqual(1)
  })
})
