class Point {
    engine:RiskAssessmentEngine;
    x:number;
    y:number;
    value:number;
    constructor(x:number, y:number, value:number, engine:RiskAssessmentEngine) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.engine = engine;
    }

    getBasin():number[] {
        return [...this.getBasinInternal(new Set<number>([ this.engine.getHash(this.x, this.y) ]))];
    }

    private getNeighbors():Point[] {
        const neighbors = [];

        for (let change of [-1, 1]) {
            const pointX = this.engine.getPoint(this.x + change, this.y);
            if (pointX) {
                neighbors.push(pointX);
            }
            const pointY = this.engine.getPoint(this.x, this.y + change);
            if (pointY) {
                neighbors.push(pointY);
            }
        }

        return neighbors;
    }

    private getBasinInternal(hashesAlreadyInBasin:Set<number>):Set<number> {
        const neighbors = this.getNeighbors()
            .filter(n => n.value < 9)
            .filter(n => !hashesAlreadyInBasin.has(this.engine.getHash(n.x, n.y)));
        for (const neighbor of neighbors) {
            hashesAlreadyInBasin.add(this.engine.getHash(neighbor.x, neighbor.y));
        }
        for (const neighbor of neighbors) {
            neighbor.getBasinInternal(hashesAlreadyInBasin);
        }

        return hashesAlreadyInBasin;
    }
}

export class RiskAssessmentEngine {
    points:Record<number, Point> = {};
    private readonly heightmap: number[][];

    constructor(heightmap:number[][]) {
        this.heightmap = heightmap;
    }

    getHash(x:number, y:number):number {
        return x * this.heightmap.length * this.heightmap.length + y;
    }

    getPoint(x, y) {
        if (x === -1 || y === -1 || x === this.heightmap.length || y === this.heightmap[0].length) {
            return undefined;
        }

        const hash = this.getHash(x, y);
        if (!this.points[hash]) {
            this.points[hash] = new Point(x, y, this.heightmap[x][y], this);
        }
        return this.points[hash];
    }

    getLowPoints():number[][] {
        const lowPoints:number[][] = [];

        for (let i = 0; i < this.heightmap.length; i++) {
            for (let j = 0; j < this.heightmap[i].length; j++) {
                const point = this.getPoint(i, j);

                if ((i === 0 || this.heightmap[i - 1][j] > point.value)
                    && (i === this.heightmap.length - 1 || this.heightmap[i + 1][j] > point.value)
                    && (j === 0 || this.heightmap[i][j - 1] > point.value)
                    && (j === this.heightmap[i].length - 1 || this.heightmap[i][j + 1] > point.value))
                {
                    lowPoints.push([i, j]);
                }
            }
        }

        return lowPoints;
    }

    assessRiskLevel(lowPoints: number[][]):number {
        return lowPoints.map(xy => this.getPoint(xy[0], xy[1])).reduce((acc, x) => acc + x.value + 1, 0);
    }

    getBasinCounts(lowPoints):number[] {
        return lowPoints.map(xy => this.getPoint(xy[0], xy[1]))
            .map(p => p.getBasin().length)
    }
}