const green = (squareDimension: number, modelRadius: number) => Math.floor(squareDimension / modelRadius) ** 2;
const red = (squareDimension: number, modelRadius: number) => Math.floor(squareDimension ** 2 / (((modelRadius / 2) ** 2) * Math.PI));

test('for green elves 22 * 22 for model radius of 2.2 yields 100 cakes', () => {
    expect(green(22, 2.2)).toBe(100);
})

test('for red elves 22 * 22 for model radius of 2.2 yields 127 cakes', () => {
    expect(red(22, 2.2)).toBe(127);
})

test('Print difference between red and green elves for 96.5 * 96.5 square for a model of radius 2.2', () => {
    const redYield = red(96.5, 2.2);
    const greenYield = green(96.5, 2.2);
    console.log('yield for red is', redYield, 'and for green', greenYield);
    console.log('Difference between yields of red and green elves is', redYield - greenYield);
})
