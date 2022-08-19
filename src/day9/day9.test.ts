import {example, full} from "./day9.data";
import {RiskAssessmentEngine} from "./day9";

test('for example finds 4 low points, with a total risk level of 15', () => {
    const riskAssessmentEngine = new RiskAssessmentEngine(example);

    const lowPoints = riskAssessmentEngine.getLowPoints();
    const riskLevel = riskAssessmentEngine.assessRiskLevel(lowPoints);

    expect(lowPoints.length).toBe(4);
    expect(riskLevel).toBe(15);
})

test('for example finds 4 basins with counts of 3, 9, 14, and 9', () => {
    const riskAssessmentEngine = new RiskAssessmentEngine(example);

    const lowPoints = riskAssessmentEngine.getLowPoints();
    const basins = riskAssessmentEngine.getBasinCounts(lowPoints);

    expect(basins).toEqual([ 3, 9, 14, 9]);

    const threeLargesBasins = basins.sort((a, b) => b - a).slice(0, 3);
    expect(threeLargesBasins.reduce((acc, b) => acc * b)).toEqual(1134);
})

test('for input gives puzzle result', () => {

    const riskAssessmentEngine = new RiskAssessmentEngine(full);

    const lowPoints = riskAssessmentEngine.getLowPoints();
    const riskLevel = riskAssessmentEngine.assessRiskLevel(lowPoints);

    console.log('Assessed risk level is', riskLevel);
})

test('for input gives puzzle result for part 2', () => {

    const riskAssessmentEngine = new RiskAssessmentEngine(full);

    const lowPoints = riskAssessmentEngine.getLowPoints();
    const basins = riskAssessmentEngine.getBasinCounts(lowPoints);

    const threeLargesBasins = basins.sort((a, b) => b - a).slice(0, 3);
    console.log('answer for part 2 is', threeLargesBasins.reduce((acc, b) => acc * b))
})