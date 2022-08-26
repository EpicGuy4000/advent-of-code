import {example, full} from "./day15.data";

class Field {
    constructor(x: number, y: number, weight: number, id: string) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.weight = weight;
    }

    id:string;
    neighbours: Field[] = [];
    weight:number;
    x:number;
    y:number;
}

export class CavernNavigation {
    fields:Record<string, Field> = {};
    private readonly end: Field;
    private readonly start: Field;

    constructor(fields:string[], multiplyingFields?:number) {
        for (let i = 0; i < fields.length; i++) {
            for (let j = 0; j < fields[i].length; j++) {
                const field = new Field(i, j, +fields[i][j], this.getFieldId(i, j, fields.length - 1));
                this.fields[field.id] = field;
            }
        }

        this.end = this.fields[this.getFieldId(fields.length - 1, fields[0].length - 1, fields.length - 1)];
        this.start = this.fields[this.getFieldId(0, 0)];

        for (const field of Object.values(this.fields).map(f => f as Field)) {
            if (field.x != 0)
                field.neighbours.push(this.fields[this.getFieldId(field.x - 1, field.y)]);
            if (field.y != 0)
                field.neighbours.push(this.fields[this.getFieldId(field.x, field.y - 1)]);
            if (field.x != this.end.x)
                field.neighbours.push(this.fields[this.getFieldId(field.x + 1, field.y)]);
            if (field.y != this.end.y)
                field.neighbours.push(this.fields[this.getFieldId(field.x, field.y + 1)]);
        }
    }

    private getFieldId(x: number, y: number, lastX?: number): string {
        return y * ((lastX || this.end.x) + 1) + x + '';
    }

    findPath():Field[] {
        return this.aStar(this.start, this.end, field => Math.sqrt((this.end.x - field.x) ** 2 + ((this.end.y - field.y) ** 2)));
    }

    findLowestRisk(): number {
        const path = this.findPath();

        path.splice(0, 1)

        return path.reduce((acc, x) => acc + x.weight, 0);
    }

    private reconstructPath(cameFrom: Record<string, Field>, current: Field): Field[] {
        const path = [current];

        while (current && cameFrom[current.id]) {
            current = cameFrom[current.id];
            path.push(current);
        }
        return path.reverse();
    }

    private aStar(start:Field, end:Field, heuristic:(Field) => number): Field[] {
        let openSet:Field[] = [ start ];
        const cameFrom:Record<string, Field> = {};

        const gScore:Record<string, number> = {};
        gScore[start.id] = 0;

        const getGScoreOrDefault = (field:Field) => gScore[field.id] ?? Infinity;

        const fScore:Record<string, number> = {};
        fScore[start.id] = heuristic(start);

        while(openSet.length !== 0) {
            const current = openSet.splice(0, 1)[0];

            if (current === end) {
                return this.reconstructPath(cameFrom, current);
            }

            for (const neighbour of current.neighbours) {
                const tentativeGScore = getGScoreOrDefault(current) + neighbour.weight;

                if (tentativeGScore < getGScoreOrDefault(neighbour)) {
                    cameFrom[neighbour.id] = current;
                    gScore[neighbour.id] = tentativeGScore;
                    fScore[neighbour.id] = tentativeGScore + heuristic(neighbour);

                    if (openSet.indexOf(neighbour) === -1) {
                        openSet.push(neighbour);
                        openSet.sort((x, y) => fScore[x.id] - fScore[y.id]);
                    }
                }
                else {
                }
            }
        }

        return [];
    }
}

test('for example total risk is 40', () => {
    const cavernNavigation = new CavernNavigation(example);

    expect(cavernNavigation.findLowestRisk()).toBe(40);
})

test('for full input prints lowest risk', () => {
    const cavernNavigation = new CavernNavigation(full);

    console.log('lowest risk path has risk of', cavernNavigation.findLowestRisk());
})