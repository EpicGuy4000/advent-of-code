export class RiskAssessmentEngine {
    getLowPoints(heightmap: number[][]):number[] {
        const lowPoints = [];


        for (let i = 0; i < heightmap.length; i++) {
            for (let j = 0; j < heightmap[i].length; j++) {
                if ((i === 0 || heightmap[i - 1][j] > heightmap[i][j])
                    && (i === heightmap.length - 1 || heightmap[i + 1][j] > heightmap[i][j])
                    && (j === 0 || heightmap[i][j - 1] > heightmap[i][j])
                    && (j === heightmap[i].length - 1 || heightmap[i][j + 1] > heightmap[i][j]))
                {
                    lowPoints.push(heightmap[i][j]);
                }
            }
        }

        return lowPoints;
    }

    assessRiskLevel(lowPoints: number[]):number {
        return lowPoints.reduce((acc, x) => acc + x + 1, 0);
    }
}