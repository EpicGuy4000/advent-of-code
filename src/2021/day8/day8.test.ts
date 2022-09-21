import {example, full} from "./day8.data";
import {countInstancesOfUniqueSegmentCombinations, Decoder} from "./day8";

test('for example counts 28 instances of 1, 4, 7 or 8', () => {
    expect(countInstancesOfUniqueSegmentCombinations(example)).toBe(26);
})

test('for input counts instances of 1, 4, 7 or 8', () => {
    console.log('Found this many instances of 1, 4, 7 or 8', countInstancesOfUniqueSegmentCombinations(full));
})

test('for first example produces 8394', () => {
    const decoder = new Decoder();

    expect(decoder.decode(example[0])).toBe("8394");
})

test('for all examples produces expected results', () => {
    const decoder = new Decoder();

    expect(decoder.decode(example[0])).toBe("8394");
    expect(decoder.decode(example[1])).toBe("9781");
    expect(decoder.decode(example[2])).toBe("1197");
    expect(decoder.decode(example[3])).toBe("9361");
    expect(decoder.decode(example[4])).toBe("4873");
    expect(decoder.decode(example[5])).toBe("8418");
    expect(decoder.decode(example[6])).toBe("4548");
    expect(decoder.decode(example[7])).toBe("1625");
    expect(decoder.decode(example[8])).toBe("8717");
    expect(decoder.decode(example[9])).toBe("4315");
})

test('for all examples sum is 61229', () => {
    const decoder = new Decoder();
    expect(example.reduce((acc, ex) => +decoder.decode(ex) + acc, 0)).toBe(61229);
})

test('for puzzle input produces result', () => {
    const decoder = new Decoder();
    console.log('Decoded sum is', full.reduce((acc, ex) => +decoder.decode(ex) + acc, 0))
})