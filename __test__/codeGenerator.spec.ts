import { codeGenerator } from '../compiler/codeGenerator'
import { newAst } from './transform.spec'
it('codeGenerator happy path', () => {
  let standCode = 'add(2,subtract(4,2));'
  let code = codeGenerator(newAst)
  expect(code).toBe(standCode)
})