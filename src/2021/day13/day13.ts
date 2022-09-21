class Coordinates {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    x:number;
    y:number;
}

interface FoldInstruction {
    along:string,
    coordinate:number
}

export class Folder {
    dots:Coordinates[] = [];
    folds:FoldInstruction[] = [];
    private instructionCounter = 0;
    private canvasSizeX = 0;
    private canvasSizeY = 0;

    constructor(instructions: string[]) {
        let i = 0;
        while (instructions[i] != '') {
            const [x, y] = instructions[i].split(',').map(x => +x);
            this.dots.push(new Coordinates(x, y))
            if (x > this.canvasSizeX)
                this.canvasSizeX = x;
            if (y > this.canvasSizeY)
                this.canvasSizeY = y;
            i++;
        }
        i++;
        for (;i < instructions.length; i++) {
            const [along, coordinate] = instructions[i].slice(11).split('=');
            this.folds.push({ along, coordinate:+coordinate});
        }
    }

    foldOnce() {
        const instruction = this.folds[this.instructionCounter];
        this.instructionCounter++;

        if (instruction.along === 'x') {
            this.foldAlongX(instruction.coordinate);
        }
        else {
            this.foldAlongY(instruction.coordinate);
        }
    }

    fold() {
        while (this.instructionCounter < this.folds.length) {
            this.foldOnce();
        }
    }

    private foldAlongX(coordinate: number) {
        this.dots.filter(d => d.x > coordinate)
            .forEach(d => d.x = 2 * coordinate - d.x);
        this.dots = this.dots.filter((d, i, a) => a.find(d1 => d1.x === d.x && d1.y == d.y) === d);
        this.canvasSizeX = Math.floor(this.canvasSizeX / 2) - 1;
    }

    private foldAlongY(coordinate: number) {
        this.dots.filter(d => d.y > coordinate)
            .forEach(d => d.y = 2 * coordinate - d.y);
        this.canvasSizeY = Math.floor(this.canvasSizeY / 2) - 1;
        this.dots = this.dots.filter((d, i, a) => a.find(d1 => d1.x === d.x && d1.y == d.y) === d);
    }

    print() {
        const allRows = [];
        for (let i = 0; i <= this.canvasSizeY; i++) {
            const row = [];
            for (let j = 0; j <= this.canvasSizeX; j++) {
                row.push(!this.dots.find(d => d.x === j && d.y === i) ? '.' : '#');
            }
            allRows.push(row.join(''));
        }

        console.log(allRows.join('\n'));
    }
}