import {example, full} from "./day14.data";

export class PolymerizationSystem {
    rules = {};
    element = [];
    quantities = {};

    constructor(input: string[]) {
        const polymerTemplate = input[0].split('');
        this.element = [ polymerTemplate[0] ];
        let currentPolymer = this.element;

        this.quantities[polymerTemplate[0]] = 1;

        for (let i = 1; i < polymerTemplate.length; i++) {
            currentPolymer[1] = [ polymerTemplate[i] ];
            currentPolymer = currentPolymer[1];

            if (!this.quantities[polymerTemplate[i]]) {
                this.quantities[polymerTemplate[i]] = 0;
            }
            this.quantities[polymerTemplate[i]]++;
        }

        input.slice(2).forEach(r => {
            const [ sequence, insertion ] = r.split(' -> ');
            this.rules[sequence] = insertion;
        })
    }

    getPolymer(): string {
        let polymerBuilder = [];
        let currentPolymer = this.element;

        while (currentPolymer) {
            polymerBuilder.push(currentPolymer[0]);
            currentPolymer = currentPolymer[1];
        }

        return polymerBuilder.join('');
    }

    step(count?:number) {
        for (let i = 0; i < (count || 1); i++) {
            console.log('starting step', i + 1);
            this.takeOneStep();
        }
    }

    private takeOneStep() {
        let currentElement = this.element;

        while (currentElement && currentElement[1]) {
            const next = currentElement[1];
            const insertion = this.rules[currentElement[0] + currentElement[1][0]];
            if (insertion) {
                currentElement[1] = [ insertion, next ];

                if (!this.quantities[insertion]) {
                    this.quantities[insertion] = 0;
                }
                this.quantities[insertion]++;
            }

            currentElement = next;
        }
    }
}

test('input is parsed correctly', () => {
    const system = new PolymerizationSystem([ "ABCD", "", "AB -> D", "CD -> B" ]);

    expect(system.getPolymer()).toBe("ABCD");
    expect(Object.keys(system.rules).length).toBe(2);
})

test('for example after 1 step polymers is as expected', () => {
    const system = new PolymerizationSystem(example);

    system.step();

    expect(system.getPolymer()).toBe('NCNBCHB');
})

test('for example after 4 steps polymers is as expected', () => {
    const system = new PolymerizationSystem(example);

    system.step(4);

    expect(system.getPolymer()).toBe('NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB');
})

test('for example after 10 steps, least and most common quantities are 161 and 1749, respectively', () => {
    const system = new PolymerizationSystem(example);

    system.step(10);

    let sortedQuantities = Object.values(system.quantities).map(x => +x).sort((x, y) => x - y);

    expect(sortedQuantities[0]).toBe(161);
    expect(sortedQuantities[sortedQuantities.length - 1]).toBe(1749);
})

test('for full input prints difference between most and least common quantities after 10 steps', () => {
    const system = new PolymerizationSystem(full);

    system.step(10);

    let sortedQuantities = Object.values(system.quantities).map(x => +x).sort((x, y) => x - y);

    let leastCommonCount = sortedQuantities[0];
    let mostCommonCount = sortedQuantities[sortedQuantities.length - 1];

    console.log('After 10 steps difference between quantities of most and least common element is', mostCommonCount - leastCommonCount);
})

test('for full input prints difference between most and least common quantities after 40 steps', () => {
    const system = new PolymerizationSystem(full);

    system.step(40);

    let sortedQuantities = Object.values(system.quantities).map(x => +x).sort((x, y) => x - y);

    let leastCommonCount = sortedQuantities[0];
    let mostCommonCount = sortedQuantities[sortedQuantities.length - 1];

    console.log('After 40 steps difference between quantities of most and least common element is', mostCommonCount - leastCommonCount);
})