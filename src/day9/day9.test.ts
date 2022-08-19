import {example, full} from "./day9.data";
import {RiskAssessmentEngine} from "./day9";

test('for example finds 4 low points, with a total risk level of 15', () => {
    const riskAssessmentEngine = new RiskAssessmentEngine();

    const lowPoints = riskAssessmentEngine.getLowPoints(example);
    const riskLevel = riskAssessmentEngine.assessRiskLevel(lowPoints);

    expect(lowPoints.length).toBe(4);
    expect(riskLevel).toBe(15);
})

test('for input gives puzzle result', () => {

    const riskAssessmentEngine = new RiskAssessmentEngine();

    const lowPoints = riskAssessmentEngine.getLowPoints(full);
    const riskLevel = riskAssessmentEngine.assessRiskLevel(lowPoints);

    console.log('Assessed risk level is', riskLevel);
})