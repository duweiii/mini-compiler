import { parser } from "../compiler/parser";
export const ast = {
  type: 'program',
  body: [
    {
      type: 'callExpression',
      value: 'add',
      params: [
        {
          type: 'numberLiteral',
          value: '2'
        },
        {
          type: "callExpression",
          value: 'subtract',
          params: [
            {
              type: 'numberLiteral',
              value: '4'
            },
            {
              type: 'numberLiteral',
              value: '2'
            },
          ]
        }
      ]
    }
  ]
}
it("parser happy path", () => {
  // (add 2 (subtract 4 2))
  const tokens = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'paren', value: '(' },
    { type: 'name', value: 'subtract' },
    { type: 'number', value: '4' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: ')' },
  ]
  const result = parser(tokens);
  expect( result ).toEqual(ast)
})