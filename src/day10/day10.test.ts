import {example, full} from "./day10.data";
import {SyntaxChecker} from "./day10";

test.each([
    '(]', '(}', '(>', '[)', '[}', '[>', '{)', '{]', '{>', '<)', '<]', '<}',
    '(([)', '[(]', '{}(>'
])('corrupted lines are detected correctly', (s) => {
    const syntaxChecker = new SyntaxChecker();
    expect(syntaxChecker.getErrorScore([ s ])).toBeGreaterThan(0);
})

test('for example, returns expected score', () => {
    const syntaxChecker = new SyntaxChecker();
    expect(syntaxChecker.getErrorScore(example)).toBe(26397);
})

test('for full input, prints score', () => {
    const syntaxChecker = new SyntaxChecker();
    console.log('Syntax checker score is:', syntaxChecker.getErrorScore(full));
})