export interface IToken {
  type: string,
  value: string
}

export interface IFuncNode {
  type: string,
  value: string,
  params: Array<IFuncNode | IToken>
}

export interface IAst {
  type: string,
  body: Array<IFuncNode | IToken>
}

export enum EType {
  paren = 'paren',
  name = 'name',
  number = 'number',
  string = 'string',
}

export enum ENodeType {
  function = 'callExpression',
  number = 'numberLiteral',
  string = 'stringLiteral'
}