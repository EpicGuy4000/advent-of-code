import {example, full} from "./day3.data";
import {Rucksack} from "./day3";

test.each([ ['p', 16], ['L', 38], ['P', 42], ['v', 22], ['t', 20], ['s', 19] ])(
    'priority of %p is %p', (itemType: string, priority: number) => {
        expect(Rucksack.getPriority(itemType)).toBe(priority);
    }
)

test.each([
    ['vJrwpWtwJgWrhcsFMMfFFhFp', 'p'],
    ['jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'L'],
    ['PmmdzqPrVvPwwTWBwg', 'P'],
    ['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'v'],
    ['ttgJtRGJQctTZtZT', 't'],
    ['CrZsJsPPZsGzwwsLwLmpwMDw', 's']
])(
    'repeating item in %p is %p', (items: string, repeatingItem: string) =>
    {
        expect(Rucksack.getRepeatingItem(items)).toBe(repeatingItem);
    }
)

test('for example gives priority sum of 157', () => {
    const sum = Rucksack.getPrioritySum(example);

    expect(sum).toBe(157);
})

test('for full input gives priority sum', () => {
    const sum = Rucksack.getPrioritySum(full);

    console.log('Priority sum is', sum);
})

test('for example, the sum of each thee elf group badge priority is 70', () => {
    const groups = Rucksack.getElfGroups(example);

    const sum = groups.map(group => Rucksack.getRepeatingItemInArrays(group))
        .map(repeatingItem => Rucksack.getPriority(repeatingItem))
        .reduce((total, x) => total + x);

    expect(sum).toBe(70);
})

test('for full input, the sum of each thee elf group badge priority is logged', () => {
    const groups = Rucksack.getElfGroups(full);

    const sum = groups.map(group => Rucksack.getRepeatingItemInArrays(group))
        .map(repeatingItem => Rucksack.getPriority(repeatingItem))
        .reduce((total, x) => total + x);

    console.log('Priority sum of groups is', sum);
})