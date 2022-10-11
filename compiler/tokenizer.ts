// lexical analysis
interface IToken {
    type: string,
    value: string | number
}

export const tokenizer = (input: string): IToken[] => {

    const tokens: IToken[] = [];
    let currentIndex = 0;

    while( currentIndex < input.length ) {
        let char = input[currentIndex];

        // 处理括号
        if( char === '(' || char === ')' ){
            tokens.push({
                type: 'paren',
                value: char
            })
            currentIndex++;
            continue;
        }

        // 处理空格
        let spaceRegExp = /\s/;
        if( spaceRegExp.test(char) ) {
            currentIndex++;
            continue;
        }

        // 处理数字
        let numberRegExp = /[0-9]/
        if( numberRegExp.test(char) ) {
            let value = '';
            while( numberRegExp.test(char) ){
                value += char;
                char = input[++currentIndex];
            }
            tokens.push({
                type: "number",
                value
            })
            continue;
        }

        // 处理字符串
    
        if( char === '"' ) {
            let value = '';
            // 跳过当前的双引号 "
            let char = input[++currentIndex];
            while( char !== '"' ) {
                value += char;
                char = input[++currentIndex];
            }
            tokens.push({ type: 'string', value })
            // 跳过结束的双引号 "
            currentIndex++;
            continue;
        }

        // 处理函数名
        let stringRegExp = /[a-z]/i;
        if( stringRegExp.test(char) ) {
            let value = '';
            while( stringRegExp.test(char) ){
                value += char;
                char = input[++currentIndex]
            }
            tokens.push({type:'name', value})
            currentIndex++;
            continue;
        }

        // 如果有识别不出来的,会走到这里,抛出错误
        throw new TypeError("I don't know what this word is:" + char);
    }

    return tokens;
}


