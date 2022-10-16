import { IAst, INode, IVisitor } from "./interface";

export const traverser = (ast: IAst, visitor: IVisitor) => {

  function traverseArray(array: Array<INode>, parent: INode | null) {
    array.forEach(node => {
      traverseNode(node, parent)
    });
  }

  function traverseNode(node: IAst | INode, parent: INode | null) {
    const methods = visitor[node.type];
    methods?.enter?.(node, parent);

    switch(node.type){
      case 'program':
        // @ts-ignore
        traverseArray(node.body, parent);
        break;
      case 'callExpression':
        // @ts-ignore
        traverseArray(node.params, parent);
        break;
      case 'numberLiteral':
      case 'stringLiteral':
      default: 
        break;
    }

    methods?.exit?.(node, parent);
  }

  traverseNode(ast, null)
}