import { tokenizer } from "./tokenizer";
import { parser } from "./parser";
import { transform } from "./transform";
import { codeGenerator } from "./codeGenerator"; 

export * from "./tokenizer";
export * from "./parser";
export * from "./transform";
export * from "./codeGenerator"; 

export const compiler = (code: string): string => {
  let tokens = tokenizer(code);
  let ast = parser(tokens);
  let newAst = transform(ast);
  let output = codeGenerator(newAst)
  return output;
}