import {example, full} from "./day6.data";
import {LanternfishSimulator} from "./day6";

test('after 1 day for example data is 2, 3, 2, 0, 1', () => {
    const simulator = new LanternfishSimulator(example);

    simulator.passTime(1);

    expect(simulator.getCurrentFish().map(f => f.cycleTimer)).toEqual([2, 3, 2, 0, 1]);
})

test('after 2 days for example data is 1, 2, 1, 6, 0, 8', () => {
    const simulator = new LanternfishSimulator(example);

    simulator.passTime(2);

    expect(simulator.getCurrentFish().map(f => f.cycleTimer)).toEqual([1, 2, 1, 6, 0, 8]);
})

test('after 18 days for example data we have 26 fish', () => {
    const simulator = new LanternfishSimulator(example);

    simulator.passTime(18);

    expect(simulator.getCurrentFish().length).toBe(26);
})

test('after 80 days for example data we have 5934 fish', () => {
    const simulator = new LanternfishSimulator(example);

    simulator.passTime(80);

    expect(simulator.getCurrentFish().length).toBe(5934);
})

test('after 80 days for test data we print answer', () => {
    const simulator = new LanternfishSimulator(full);

    simulator.passTime(80);

    console.log("After 80 days we will have this many fish:", simulator.getCurrentFish().length);
})

test('after 256 days for example data we have 26984457539 fish', () => {
    const simulator = new LanternfishSimulator(example);

    simulator.passTime(256);

    expect(simulator.getCurrentFish().length).toBe(26984457539);
})

test('after 256 days for test data we print answer', () => {
    const simulator = new LanternfishSimulator(full);

    simulator.passTime(256);

    console.log("After 256 days we will have this many fish:", simulator.getCurrentFish().length);
})