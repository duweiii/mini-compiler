import { IAst, INewAst } from './interface';
import { traverser } from './traverser';

export const transform = (ast: IAst): INewAst => {
  const newAst = {
    type: 'program',
    body: [],
  }

  ast.__context = newAst.body;

  traverser(ast, {
    numberLiteral : {
      enter: (node, parent) => {
        parent?.__context.push({
          type: 'numberLiteral',
          value: node.value
        })
      }
    },
    stringLiteral : {
      enter: (node, parent) => {
        parent?.__context.push({
          type: 'stringLiteral',
          value: node.value
        })
      }
    },
    callExpression: {
      enter: (node, parent) => {
        let expression = {
          type: 'callExpression',
          callee: {
            type: 'identifier',
            name: node.value
          },
          arguments: [],
        }

        node.__context = expression.arguments;

        if( parent.type !== 'callExpression' ){
          expression = {
            type: 'expressionStatement',
            expression: expression,
          }
        }

        parent?.__context?.push( expression )
      }
    }
  })

  return newAst;
}