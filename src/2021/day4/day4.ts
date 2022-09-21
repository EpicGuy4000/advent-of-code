class BingoField {
    private _wasDrawn:boolean = false;
    groups:BingoGroup[] = [];
    value:number;
    constructor(value:number) {
        this.value = value;
    }
    get wasDrawn() {
        return this._wasDrawn;
    };
    set wasDrawn(value) {
        this._wasDrawn = value;
        this.groups.forEach(g => g.onDraw())
    }
}

class BingoGroup {
    constructor(numbers: number[], fields: Record<number, BingoField>, board: BingoBoard) {
        this.fields = numbers.map(number => {
            if (!fields[number]) {
                fields[number] = new BingoField(number);
            }
            fields[number].groups.push(this);
            return fields[number];
        });
        this.board = board;
    }

    fields:BingoField[];
    board:BingoBoard;

    onDraw() {
        const isWinner = this.fields.reduce((acc, current) => acc && current.wasDrawn, true);

        if (isWinner) {
            this.board.declareWinner();
        }
    }
}

class BingoBoard {
    constructor(board: number[], fields: Record<number, BingoField>, bingo: Bingo) {
        for (let i = 0; i < 5; i++) {
            this.groups.push(new BingoGroup(board.slice(i * 5, i * 5 + 5), fields, this))
            this.groups.push(new BingoGroup(board.filter((val, index) => index % 5 == i), fields, this))
        }
        this.bingo = bingo;
    }

    readonly groups:BingoGroup[] = [];
    private bingo:Bingo;
    isWinner: boolean = false;
    declareWinner() {
        if (!this.isWinner) {
            this.bingo.setWinner(this);
            this.isWinner = true;
        }
    }
    getScore(lastBall:number):number {
        const sum = this.groups.map(x => x.fields).flat()
            .filter(x => x.wasDrawn == false)
            .map(field => field.value)
            .reduce((acc, value) => acc + value);

        return (sum / 2) * lastBall;
    }
}

export class Bingo {
    private lastWinningBoard:BingoBoard;
    private fields:Record<number, BingoField> = {};
    boards:BingoBoard[] = [];

    constructor(boards:number[][]) {
        boards.forEach(board => {
            this.boards.push(new BingoBoard(board, this.fields, this));
        })
    }

    draw(ball:number) {
        this.fields[ball].wasDrawn = true;
    }

    setWinner(board: BingoBoard) {
        this._count++;
        this.lastWinningBoard = board;
    }

    getWinner() {
        return this.lastWinningBoard;
    }

    private _count = 0;
}