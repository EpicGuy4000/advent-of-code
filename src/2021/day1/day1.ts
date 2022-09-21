export function countIncrements(measurements: number[]) {
    return countIncrementsInIncrements(measurements, 1);
}

export function countIncrementsInIncrements(measurements: number[], incrementsOfN: number) {
    let increments = 0;
    for (let i = incrementsOfN; i <= measurements.length; i++) {
        if (measurements[i] > measurements[i - incrementsOfN]) increments++
    }
    return increments;
}
