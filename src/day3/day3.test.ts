import {ReportAnalyzer} from "./day3";
import {example, full} from "./day3.data";


test('For 11 gamma rate is 3 and epsilon is 0', () => {
    const analyzer = new ReportAnalyzer(2);

    analyzer.addReport('11');
    expect(analyzer.getGammaAndEpsilon()).toEqual([3, 0])
})

test('For 101 gamma rate is 5 and epsilon is 2', () => {
    const analyzer = new ReportAnalyzer(3);

    analyzer.addReport('101');
    expect(analyzer.getGammaAndEpsilon()).toEqual([5, 2])
})

test('For example gamma is 22 and epsilon is 9', () => {
    const analyzer = new ReportAnalyzer(example[0].length);

    analyzer.addReports(example);
    expect(analyzer.getGammaAndEpsilon()).toEqual([22, 9])
    expect(analyzer.getPowerConsumption()).toBe(198);
})

test('For question 1, give answer', () => {
    const analyzer = new ReportAnalyzer(full[0].length);

    analyzer.addReports(full);
    console.log('power consumption', analyzer.getPowerConsumption());
})

test('For example gives expected oxygen rating', () => {
    const analyzer = new ReportAnalyzer(example[0].length);

    analyzer.addReports(example);
    expect(analyzer.getOxygenGeneratorRating()).toEqual(23)
})

test('For example gives expected CO2 scrubber rating', () => {
    const analyzer = new ReportAnalyzer(example[0].length);

    analyzer.addReports(example);
    expect(analyzer.getCO2ScrubberRating()).toEqual(10)
})

test('For question 2, give answer', () => {
    const analyzer = new ReportAnalyzer(full[0].length);

    analyzer.addReports(full);
    console.log('life support rating', analyzer.getLifeSupportRating());
})