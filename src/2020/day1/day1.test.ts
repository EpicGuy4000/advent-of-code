import {example, full} from "./day1.data";
import {findAddends} from "./day1";

const parseInput = (inputString: string): number[] => inputString.split('\n').map(x => +x).sort((a, b) => a - b);

test('for example input the addends are 1721 and 299', () => {
    expect(findAddends(parseInput(example), 2020, 2).sort()).toEqual([ 1721, 299 ].sort());
})

test('for example input the addends are 979, 366 and 675', () => {
    expect(findAddends(parseInput(example), 2020, 3).sort()).toEqual([ 979, 366, 675 ].sort());
})

test('for full input find 2 addends', () => {
    const addends = findAddends(parseInput(full), 2020, 2).sort();
    console.log('2 addends that make up 2020 are', addends.join(' and '));
    console.log('their product is', addends.reduce((acc, x) => acc * x));
})

test('for full input find 3 addends', () => {
    const addends = findAddends(parseInput(full), 2020, 3).sort();
    console.log('3 addends that make up 2020 are', addends.join(' and '));
    console.log('their product is', addends.reduce((acc, x) => acc * x));
})
