import {example, full} from "./day14.data";
import {PolymerizationSystem} from "./day14";

test('input is parsed correctly', () => {
    const system = new PolymerizationSystem([ "ABCD", "", "AB -> D", "CD -> B" ]);

    expect(system.getPolymerLength()).toBe(4);
    expect(Object.keys(system.rules).length).toBe(2);
})

test('for example after 1 step polymers is as expected', () => {
    const system = new PolymerizationSystem(example);

    system.step();

    expect(system.getPolymerLength()).toBe(7);
})

test('for example after 4 steps polymers is as expected', () => {
    const system = new PolymerizationSystem(example);

    system.step(4);

    expect(system.getPolymerLength()).toBe('NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB'.length);
})

test('for example after 10 steps, least and most common quantities are 161 and 1749, respectively', () => {
    const system = new PolymerizationSystem(example);

    system.step(10);

    let sortedQuantities = Object.values(system.singles).map(x => +x).sort((x, y) => x - y);

    expect(sortedQuantities[0]).toBe(161);
    expect(sortedQuantities[sortedQuantities.length - 1]).toBe(1749);
})

test('for full input prints difference between most and least common quantities after 10 steps', () => {
    const system = new PolymerizationSystem(full);

    system.step(10);

    let sortedQuantities = Object.values(system.singles).map(x => +x).sort((x, y) => x - y);

    let leastCommonCount = sortedQuantities[0];
    let mostCommonCount = sortedQuantities[sortedQuantities.length - 1];

    console.log('After 10 steps difference between quantities of most and least common element is', mostCommonCount - leastCommonCount);
})

test('for full input prints difference between most and least common quantities after 40 steps', () => {
    const system = new PolymerizationSystem(full);

    system.step(40);

    let sortedQuantities = Object.values(system.singles).map(x => +x).sort((x, y) => x - y);

    let leastCommonCount = sortedQuantities[0];
    let mostCommonCount = sortedQuantities[sortedQuantities.length - 1];

    console.log('After 40 steps difference between quantities of most and least common element is', mostCommonCount - leastCommonCount);
})