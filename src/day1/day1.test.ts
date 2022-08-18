import {countIncrements, countIncrementsInIncrements} from "./day1";
import measurements from "./day1.data";

test('for test input gives correct result', () => {
    expect(countIncrements([199, 200, 208, 210, 200, 207, 240, 269, 260, 263])).toBe(7);
});

test('what\'s the answer?', () => {
    console.log(countIncrements(measurements));
})

test('what\'s the answer, part 2?', () => {
    console.log(countIncrementsInIncrements(measurements, 3));
})