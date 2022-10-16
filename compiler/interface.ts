export interface IToken {
  type: string,
  value: string
}

export interface IFuncNode {
  type: string,
  value: string,
  params: Array<INode>
}

export type INode = IFuncNode | IToken | Record<string, any>;

export interface IAst {
  type: string,
  body: Array<INode>,
  [key: string]: any
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

// result of transform => new ast 
export interface INewAst {
  type: string,
  body: INewAstBody
}

export type INewAstBody = Array<IToken | IExpression> 

export interface IExpression {
  type: string,
  expression: IExp
}

export interface IExp {
  type: string,
  callee: {
    type: string,
    name: string,
  },
  arguments: IArg
}

export type IArg = IExpression | IToken;