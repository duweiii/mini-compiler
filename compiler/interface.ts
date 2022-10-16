export interface IToken {
  type: string,
  value: string
}

export interface IFuncNode {
  type: string,
  value: string,
  params: Array<INode>
}

export type INode = IFuncNode | IToken;

export interface IAst {
  type: string,
  body: Array<INode>
}

export enum ETokenType {
  paren = 'paren',
  name = 'name',
  number = 'number',
  string = 'string',
}

export enum ENodeType {
  program = 'program',
  callExpression = 'callExpression',
  numberLiteral = 'numberLiteral',
  stringLiteral = 'stringLiteral'
}

export interface IVisitor {
  [key: string]: {
    enter?: (node: INode | IAst, parent: INode | null) => void,
    exit?: (node: INode | IAst, parent: INode | null) => void
  }
}