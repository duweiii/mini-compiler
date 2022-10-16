import { transform } from '../compiler/transform';
import { ast } from './parser.spec'
export const newAst = {
  type: 'program',
  body: [{
    type: 'expressionStatement',
    expression: {
      type: 'callExpression',
      callee: {
        type: 'identifier',
        name: 'add'
      },
      arguments: [{
        type: 'numberLiteral',
        value: '2'
      }, {
        type: 'callExpression',
        callee: {
          type: 'identifier',
          name: 'subtract'
        },
        arguments: [{
          type: 'numberLiteral',
          value: '4'
        }, {
          type: 'numberLiteral',
          value: '2'
        }]
      }]
    }
  }]
}
it("transform happy path", () => {
  const result = transform(ast);
  expect(result).toEqual(newAst)
})