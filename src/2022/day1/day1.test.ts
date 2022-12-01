import {Supplies} from "./day1";
import {example, full} from "./day1.data";

test('Most calories carried in example is 24000', () => {
    const supplies = new Supplies(example);
    expect(supplies.getMostCaloriesCarried(1)).toBe(24000);
})

test('For full input gives most calories carried by one elf', () => {
    const supplies = new Supplies(full);

    console.log('Highest total of calories carried is', supplies.getMostCaloriesCarried(1));
})

test('Calories carried by 3 most hardworking elves in example is 45000', () => {
    const supplies = new Supplies(example);
    expect(supplies.getMostCaloriesCarried(3)).toBe(45000);
})

test('For full input gives sum of calories carried by 3 most hardworking elves', () => {
    const supplies = new Supplies(full);

    console.log('Highest total of calories carried for 3 elves is', supplies.getMostCaloriesCarried(3));
})
