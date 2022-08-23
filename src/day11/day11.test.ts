import {example, full} from "./day11.data";
import {OctopusesSimulator} from "./day11";

test.each([
    { steps: 1, flashCounter: 0 },
    { steps: 2, flashCounter: 35 },
    { steps: 10, flashCounter: 204 }
])
('for example, after %s steps flash count is %s', ({ steps, flashCounter }) => {
    const simulator = new OctopusesSimulator(example);
    simulator.simulateRounds(steps)
    console.log('expected', simulator.flashCounter, 'to equal', flashCounter);
    expect(simulator.flashCounter).toEqual(flashCounter);
})

test('for example, after 100 rounds expect 1656 flashes', () => {
    const simulator = new OctopusesSimulator(example);
    simulator.simulateRounds(100);
    expect(simulator.flashCounter).toBe(1656);
})

test('for full input, after 100 rounds prints result', () => {
    const simulator = new OctopusesSimulator(full);
    simulator.simulateRounds(100);
    console.log('after 100 rounds, there will be this many flashes', simulator.flashCounter);
})