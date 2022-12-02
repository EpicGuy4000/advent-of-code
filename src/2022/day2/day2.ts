export enum Shape {
    Rock,
    Paper,
    Scissors
}

const shapeMap: Record<string, Shape> = {
    'A': Shape.Rock,
    'B': Shape.Paper,
    'C': Shape.Scissors,
    'X': Shape.Rock,
    'Y': Shape.Paper,
    'Z': Shape.Scissors
}

class Round {
    opponentsShape: Shape;
    myShape: Shape;
    constructor(opponentsShape: Shape, myShape: Shape) {
        this.opponentsShape = opponentsShape;
        this.myShape = myShape;
    }
    static parse(input: string): Round {
        const [opponentsShape, myShape] = input.split(' ');
        return new Round(shapeMap[opponentsShape], shapeMap[myShape]);
    }

    getScore(): number {
        let score = 1 + this.myShape;

        switch (this.myShape - this.opponentsShape) {
            case 1:
            case -2:
                score += 6;
                break;
            case 0:
                score += 3;
                break;
        }

        return score;
    }
}

export class RockPaperScissorsStrategyGuide {
    public readonly rounds: Round[];

    constructor(input: string) {
        this.rounds = input.split(/\r?\n/)
            .filter(str => str.length > 0)
            .map(Round.parse);
    }

    getTotalScore() {
        return this.rounds.map(r => r.getScore()).reduce((total, x) => total + x);
    }
}
