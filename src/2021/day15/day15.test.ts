import {example, full} from "./day15.data";
import {CavernNavigation} from "./day15";

test('for example total risk is 40', () => {
    const cavernNavigation = new CavernNavigation(example);

    expect(cavernNavigation.findLowestRisk()).toBe(40);
})

test('for example with multiplier of 5 total risk is 315', () => {
    const cavernNavigation = new CavernNavigation(example, 5);

    expect(cavernNavigation.findLowestRisk()).toBe(315);
})

test('for full input prints lowest risk', () => {
    const cavernNavigation = new CavernNavigation(full);

    console.log('lowest risk path has risk of', cavernNavigation.findLowestRisk());
})

test('for full input with multiplier of 5 prints lowest risk', () => {
    const cavernNavigation = new CavernNavigation(full, 5);

    console.log('lowest risk path with multiplier of 5 has risk of', cavernNavigation.findLowestRisk());
})