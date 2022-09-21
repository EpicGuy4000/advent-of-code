import {example, full} from "./day7.data";
import {CrabArmy} from "./day7";

test('for example data gives expected fuel output', () => {
    let crabArmy = new CrabArmy(example);

    let spentFuel = crabArmy.align();

    expect(spentFuel).toBe(168);
})

test('for task data gives result', () => {
    let crabArmy = new CrabArmy(full);

    let spentFuel = crabArmy.align();

    console.log("To align the army we need to spend this much fuel:", spentFuel);
})