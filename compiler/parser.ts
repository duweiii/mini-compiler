// syntax analysis
import { IAst, IFuncNode, IToken } from "./interface";

export const parser = (tokens: IToken[]): IAst => {
  let current = 0;

  const walk = (): IFuncNode | IToken => {
    let token = tokens[current];

    // 处理数字token
    if( token.type === 'number' ){
      current++; 
      return {
        type: "numberLiteral",
        value: token.value
      }
    }

    // 处理字符token
    if( token.type === 'string' ){
      current++; 
      return {
        type: "stringLiteral",
        value: token.value
      }
    }

    // 处理函数名
    if( 
      token.type === 'paren' 
      && 
      token.value === '('
    ){
      token = tokens[++current];

      let node: IFuncNode = {
        type: 'callExpression',
        value: token.value,
        params: [],
      }

      token = tokens[++current];

      while(
        token.type !== 'paren'
        ||
        token.type === 'paren' && token.value !== ')'
      ){
        node.params.push(walk())
        token = tokens[current]
      }

      current++;

      return node;
    }

    // 没有匹配到上述类型就抛出异常
    throw new Error('unrecognized type')
  }

  let ast: IAst = {
    type: 'program',
    body: []
  }

  // 索引小于tokens数组长度时，循环处理tokens
  while( current < tokens.length ){
    ast.body.push(walk())
  }

  return ast;
}