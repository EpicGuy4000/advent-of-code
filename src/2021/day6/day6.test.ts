import {example, full} from "./day6.data";
import {LanternfishSimulator} from "./day6";

test('after 0 days for example data expect 5 fish', () => {
    const simulator = new LanternfishSimulator(example);

    expect(simulator.getCurrentFishCount()).toBe(5);
})

test('after 1 day for example data expect 5 fish', () => {
    const simulator = new LanternfishSimulator(example);

    simulator.passTime(1);

    expect(simulator.getCurrentFishCount()).toBe(5);
})

test('after 2 days for example data expect 6 fish', () => {
    const simulator = new LanternfishSimulator(example);

    simulator.passTime(2);

    expect(simulator.getCurrentFishCount()).toBe(6);
})

test('after 18 days for example data we have 26 fish', () => {
    const simulator = new LanternfishSimulator(example);

    simulator.passTime(18);

    expect(simulator.getCurrentFishCount()).toBe(26);
})

test('after 80 days for example data we have 5934 fish', () => {
    const simulator = new LanternfishSimulator(example);

    simulator.passTime(80);

    expect(simulator.getCurrentFishCount()).toBe(5934);
})

test('after 80 days for test data we print answer', () => {
    const simulator = new LanternfishSimulator(full);

    simulator.passTime(80);

    console.log("After 80 days we will have this many fish:", simulator.getCurrentFishCount());
})

test('after 256 days for example data we have 26984457539 fish', () => {
    const simulator = new LanternfishSimulator(example);

    simulator.passTime(256);

    expect(simulator.getCurrentFishCount()).toBe(26984457539);
})

test('after 256 days for test data we print answer', () => {
    const simulator = new LanternfishSimulator(full);

    simulator.passTime(256);

    console.log("After 256 days we will have this many fish:", simulator.getCurrentFishCount());
})