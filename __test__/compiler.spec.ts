import { compiler } from '../compiler/index'

it('compiler happy path', () => {
  let originCode = '(add 2 (subtract 4 2))';
  let expectCode = 'add(2,subtract(4,2));';
  let result = compiler(originCode)
  expect(result).toBe(expectCode)
})