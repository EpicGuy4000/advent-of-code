class Field {
    constructor(x: number, y: number, weight: number, id: string) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.weight = weight;
    }

    id: string;
    neighbours: Field[] = [];
    weight: number;
    x: number;
    y: number;
}

interface IGraphNode {
    id: string;
    neighbours: IGraphNode[];
    weight: number;
}

export abstract class GraphSolver<TGraphNode extends IGraphNode> {
    abstract findPath(start: TGraphNode, end: TGraphNode):TGraphNode[];

    protected reconstructPath(cameFrom: Record<string, TGraphNode>, current: TGraphNode): TGraphNode[] {
        const path = [current];

        while (current && cameFrom[current.id]) {
            current = cameFrom[current.id];
            path.push(current);
        }
        return path.reverse();
    }
}

export class AStarGraphSolver<TGraphNode extends IGraphNode> extends GraphSolver<TGraphNode> {
    private readonly heuristicFunction:(node: TGraphNode) => number;

    constructor(heuristicFunction: (node: TGraphNode) => number) {
        super();
        this.heuristicFunction = heuristicFunction;
    }

    findPath(start: TGraphNode, end: TGraphNode): TGraphNode[] {
        let openSet:TGraphNode[] = [ start ];
        const cameFrom:Record<string, TGraphNode> = {};

        const gScore:Record<string, number> = {};
        gScore[start.id] = 0;

        const getGScoreOrDefault = (field:TGraphNode) => gScore[field.id] ?? Infinity;

        const fScore:Record<string, number> = {};
        fScore[start.id] = this.heuristicFunction(start);

        while(openSet.length !== 0) {
            const current = openSet.splice(0, 1)[0];

            if (current === end) {
                return this.reconstructPath(cameFrom, current);
            }

            for (const neighbour of current.neighbours.map(n => n as TGraphNode)) {
                const tentativeGScore = getGScoreOrDefault(current) + neighbour.weight;

                if (tentativeGScore < getGScoreOrDefault(neighbour)) {
                    cameFrom[neighbour.id] = current;
                    gScore[neighbour.id] = tentativeGScore;
                    fScore[neighbour.id] = tentativeGScore + this.heuristicFunction(neighbour);

                    if (openSet.indexOf(neighbour) === -1) {
                        openSet.push(neighbour);
                        openSet.sort((x, y) => fScore[x.id] - fScore[y.id]);
                    }
                }
            }
        }

        return [];
    }
}

export class CavernNavigation {
    fields:Record<string, Field> = {};
    private readonly end: Field;
    private readonly start: Field;

    constructor(fields:string[], fieldMultiplier?:number) {
        const multiplier = fieldMultiplier || 1;

        let lastX = fields.length * multiplier - 1;
        let lastY = fields[0].length * multiplier - 1;

        for (let i = 0; i < fields.length; i++) {
            for (let j = 0; j < fields[i].length; j++) {
                const value = +fields[i][j];

                for (let ip = 0; ip < multiplier; ip++) {
                    for (let jp = 0; jp < multiplier; jp++) {
                        let proposedValue = value + ip + jp;
                        while (proposedValue > 9) {
                            proposedValue -= 9;
                        }

                        const field = new Field(i + ip * fields.length, j + jp * fields[0].length, proposedValue, this.getFieldId(i + ip * fields.length, j + jp * fields[0].length, lastX));
                        this.fields[field.id] = field;
                    }
                }
            }
        }

        this.end = this.fields[this.getFieldId(lastX, lastY, lastX)];
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

    findLowestRisk(): number {
        const path = this.findPath();

        path.splice(0, 1)

        return path.reduce((acc, x) => acc + x.weight, 0);
    }

    private getFieldId(x: number, y: number, lastX?: number): string {
        return y * ((lastX || this.end.x) + 1) + x + '';
    }

    private findPath():IGraphNode[] {
        return new AStarGraphSolver<Field>(field => Math.sqrt((this.end.x - field.x) ** 2 + ((this.end.y - field.y) ** 2)))
            .findPath(this.start, this.end);
    }
}