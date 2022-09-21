export class Submarine {
    private horizontalPosition:number = 0;
    private depth:number = 0;
    private aim:number = 0;

    private moves: Record<string, (number) => void> = {
        "forward": (units:number) => {
            this.horizontalPosition += units;
            this.depth += this.aim * units;
        },
        "down": (units:number) => this.aim += units,
        "up": (units:number) => this.aim -= units
    };

    getHorizontalPosition() {
        return this.horizontalPosition;
    }

    getDepth() {
        return this.depth;
    }

    executeCommand(command: string) {
        const directionAndSpeed = command.split(' ');

        this.moves[directionAndSpeed[0]](+directionAndSpeed[1]);
    }


}