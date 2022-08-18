import {Submarine} from "./day2";
import {plannedCourseExample, plannedCourseFull} from "./day2.data";


test('initially submarine is on 0 - 0', () => {
    const submarine = new Submarine();

    expect(submarine.getHorizontalPosition()).toBe(0);
    expect(submarine.getDepth()).toBe(0);
});

test('for example gives expected result', () => {
    const submarine = new Submarine();

    plannedCourseExample.forEach(command => submarine.executeCommand(command));
    expect(submarine.getHorizontalPosition()).toBe(15);
    expect(submarine.getDepth()).toBe(60);
    expect(submarine.getHorizontalPosition() * submarine.getDepth()).toBe(900);
});

test('for input gives result', () => {
    const submarine = new Submarine();

    plannedCourseFull.forEach(command => submarine.executeCommand(command));
    console.log("horizontal position", submarine.getHorizontalPosition());
    console.log("depth", submarine.getDepth());
    console.log("answer to day 2 part 2", submarine.getHorizontalPosition() * submarine.getDepth());
});