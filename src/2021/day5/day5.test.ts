import {VentRadar} from "./day5";
import {example, full} from "./day5.data";

test('for example, 5 points have overlapping lines', () => {
    const ventRadar = new VentRadar(example);
    expect(ventRadar.countMultipleHits()).toBe(12);
})

test('for part 1, answer is', () => {
    const ventRadar = new VentRadar(full);
    console.log("Part 1 answer is", ventRadar.countMultipleHits())
})