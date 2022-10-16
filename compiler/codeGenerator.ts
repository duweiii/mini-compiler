export const codeGenerator = (node: any): string => {
  /**
   * 把每一种类型的节点，细分到分支中处理
   */
  switch(node.type){
    case 'program': 
      return node.body.map(codeGenerator).join('\n');
    case 'expressionStatement': 
      return codeGenerator(node.expression) + ';'
    case 'callExpression': 
      /**
       * 第一点
       * 这里你会发现即使 node.arguments.map(codeGenerator) 不加join
       * 生成的代码也是没有问题的
       * 这是因为map后得到了数组
       * 而前后要拼接的字符串 ( ) ，在拼接时会对数组进行类型转换
       * 触发数组的偏字符串算法，也就是toString
       * 而Array.toString方法默认就是以逗号拼接数组中的每一个元素
       */
      return codeGenerator(node.callee) + "(" + node.arguments.map(codeGenerator).join(',') + ")";
      /**
       * 第二点
       * 可能在前面的transform中你并不理解，为什么当父节点也是callExpression类型时，
       * 就不需要再去创建type为expressionStatement的节点
       * 但是看到这应该也明白了。
       * 因为在codeGenerator的分支处理中，expressionStatement的作用就是在表达式后添加分号 ";"
       * 但是当父节点已经是一个函数节点callExpression,说明当前节点在一个函数中
       * 如果还处理成expressionStatemnt节点，就会在后面拼接上分号，造成函数调用中误加分号的问题
       * 像这样 👉 add(2,subtract(4,2);)
       * 所以当父节点也是callExpression类型，就不再创建expressionStatement节点了。
       */
    case 'identifier':
      return node.name;
    case 'numberLiteral':
      return node.value;
    case 'stringLiteral':
      return '"' + node.value + '"';
    default: 
      throw new TypeError("unrecognized type")
  }
}