import { tokenizer } from "../tokenizer";


it("happy path", () => {
    const input = '(add 2 (subtract 4 2))';
    
    const tokens = tokenizer(input)
    
    const result = [
        { type: 'paren', value: '(' },
        { type: 'name', value: 'add' },
        { type: 'number', value: '2' },
        { type: 'paren', value: '(' },
        { type: 'name', value: 'subtract' },
        { type: 'number', value: '4' },
        { type: 'number', value: '2' },
        { type: 'paren', value: ')' },
        { type: 'paren', value: ')' },
    ]
    
    expect(tokens).toEqual(result)
})
