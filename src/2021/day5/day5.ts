class Coordinates {
    readonly x:number;
    readonly y:number;
    private static coordinates:Record<string, Coordinates> = {};

    private constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    static create(x:number, y:number) {
        const id = Coordinates.getId(x, y);
        if (!Coordinates.coordinates[id]) {
            Coordinates.coordinates[id] = new Coordinates(x, y)
        }
        return Coordinates.coordinates[id];
    }

    static getId(x, y) {
        return x + ':' + y;
    }

    getId() {
        return Coordinates.getId(this.x, this.y);
    }
}

class Line {
    readonly start:Coordinates;
    readonly end:Coordinates;
    constructor(start:Coordinates, end:Coordinates) {
        this.start = start;
        this.end = end;
    }

    getPoints() {
        const coordinates:Coordinates[] = [];


        let i = this.start.x;
        let j = this.start.y;
        const changeX = Math.sign(this.end.x - this.start.x);
        const changeY = Math.sign(this.end.y - this.start.y);

        while (i - changeX != this.end.x || j - changeY != this.end.y) {
            coordinates.push(Coordinates.create(i, j));
            i += changeX;
            j += changeY;
        }

        return coordinates;
    }
}

export class VentRadar {
    validLines:Line[] = [];
    hitsPerCoordinate:Record<string, number> = {};
    constructor(lines:string[]) {
        this.validLines = lines.map(line => {
            const [start, end] = line.split(' -> ')
                .map(coordinate => {
                    const [x, y] = coordinate.split(',').map(x => +x);
                    return Coordinates.create(x, y);
                });

            return new Line(start, end);
        });
    }

    countMultipleHits() {
        this.validLines
            .map(line => line.getPoints())
            .flat()
            .forEach(coordinate => {
                const id = coordinate.getId();
                if (!this.hitsPerCoordinate[id]) {
                    this.hitsPerCoordinate[id] = 0;
                }
                this.hitsPerCoordinate[id]++;
            });
        return Object.values(this.hitsPerCoordinate).filter(x => x > 1).length;
    }
}