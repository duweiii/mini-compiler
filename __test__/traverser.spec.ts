import { traverser } from "../compiler/traverser";
import { ast } from './parser.spec';
it("traverser happy path", () => {
  let count = 0;
  traverser(ast, {
    "numberLiteral": {
      enter: (node, parent) => {
        count++;
      }
    },
    "stringLiteral": {
      enter: (node, parent) => {
        count++;
      }
    },
    "callExpression": {
      enter: (node, parent) => {
        count++;
      }
    },
    "program": {
      enter: (node, parent) => {
        count++;
      }
    }
  })
  // 6个节点
  expect(count).toBe(6)
})