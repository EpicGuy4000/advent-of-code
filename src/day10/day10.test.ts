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

test('for example, returns expected autocomplete score', () => {
    const syntaxChecker = new SyntaxChecker();
    expect(syntaxChecker.getAutocompleteScores(example)).toEqual([ 288957, 5566, 1480781, 995444, 294 ]);
})

test('for full input, prints autocomplete score', () => {
    const syntaxChecker = new SyntaxChecker();
    const scores = syntaxChecker.getAutocompleteScores(full).sort();
    console.log('Syntax checker middle autocomplete score is:', scores[Math.floor(scores.length / 2)]);
})