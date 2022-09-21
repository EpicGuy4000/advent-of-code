import {example, full} from "./day2.data";
import {ValidationRequest, Validator} from "./day2";

const parseOne = (line: string): ValidationRequest => {
    const [ rule, password ] = line.split(': ');
    const [ range, letter ] = rule.split(' ');
    const [ min, max ] = range.split('-').map(x => +x);

    return {
        rule: {
            secondNumber: max,
            firstNumber: min,
            letter: letter
        },
        password: password
    };
}

const parseInput = (str: string): ValidationRequest[] => str.split('\n').map(parseOne);

test('for example finds 2 valid passwords', () => {
    expect(new Validator().checkAllForPart1(parseInput(example))).toBe(2);
})

test('for full input print number of valid passwords with old policy', () => {
    console.log('number of valid passwords is', new Validator().checkAllForPart1(parseInput(full)));
})

test('for example finds 1 valid passwords with new policy', () => {
    expect(new Validator().checkAllForPart2(parseInput(example))).toBe(1);
})

test('for full input print number of valid passwords with new policy', () => {
    console.log('number of valid passwords is', new Validator().checkAllForPart2(parseInput(full)));
})
