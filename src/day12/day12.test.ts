import {larger_example, example, even_large_example, full} from "./day12.data";
import {CaveSystem} from "./day12";

test('For one path in the system finds that one path', () => {
    const system = new CaveSystem([ 'start-a', 'a-end' ]);
    expect(system.getPathCount()).toBe(1)
})

test('For example finds 10 distinct paths', () => {
    const system = new CaveSystem(example);
    expect(system.getPathCount()).toBe(10)
})

test('For example with duplicates finds 36 distinct paths', () => {
    const system = new CaveSystem(example);
    expect(system.getPathCountWithDuplicates()).toBe(36)
})

test('For larger example finds 19 distinct paths', () => {
    const system = new CaveSystem(larger_example);
    expect(system.getPathCount()).toBe(19)
})

test('For larger example with duplicates finds 103 distinct paths', () => {
    const system = new CaveSystem(larger_example);
    expect(system.getPathCountWithDuplicates()).toBe(103)
})

test('For even larger example finds 226 distinct paths', () => {
    const system = new CaveSystem(even_large_example);
    expect(system.getPathCount()).toBe(226)
})

test('For even larger example with duplicates finds 3509 distinct paths', () => {
    const system = new CaveSystem(even_large_example);
    expect(system.getPathCountWithDuplicates()).toBe(3509)
})

test('For full input prints number of distinct paths', () => {
    const system = new CaveSystem(full);
    console.log('Total path count for given cave system is', system.getPathCount());
})

test('For full input prints number of distinct paths with duplicates', () => {
    const system = new CaveSystem(full);
    console.log('Total path count for given cave system is', system.getPathCountWithDuplicates());
})