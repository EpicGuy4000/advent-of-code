class DumboOctopus {
    private readonly Octopuses:OctopusesSimulator;
    lastFlashOnRound:number = -1;
    private static neighbors = [
        [ -1, -1 ], [ 0, -1 ], [ 1, -1 ],
        [ -1, 0 ], /* self */ [ 1, 0 ],
        [ -1, 1 ], [ 0, 1 ], [ 1, 1 ]
    ];
    energyLevel:number;
    x:number;
    y:number;

    constructor(octopuses:OctopusesSimulator, energyLevel:number, x:number, y:number) {
        this.Octopuses = octopuses;
        this.energyLevel = energyLevel;
        this.x = x;
        this.y = y;
    }

    gainEnergy() {
        if (this.lastFlashOnRound === this.Octopuses.currentRound)
            return;

        if (this.energyLevel === 9) {
            this.flash();
        }
        else {
            this.energyLevel++;
        }
    }

    flash() {
        this.lastFlashOnRound = this.Octopuses.currentRound;
        this.energyLevel = 0;
        this.Octopuses.flashCounter++;
        this.getNeighbours()
            .forEach(neighbour => neighbour.gainEnergy());
    }

    getNeighbours():DumboOctopus[] {
        return DumboOctopus.neighbors.map(xy => this.Octopuses.getOctopus(this.x + xy[0], this.y + xy[1]))
            .filter(x => x !== undefined);
    }
}

export class OctopusesSimulator {
    flashCounter:number = 0;
    currentRound:number = 0;
    octopuses:Record<number, DumboOctopus> = {};

    constructor(octopuses:string[]) {
        for (let x = 0; x < octopuses.length; x++)
            for (let y = 0; y < octopuses[x].length; y++) {
                this.octopuses[this.getHash(x, y)] = new DumboOctopus(this, +octopuses[x][y], x, y);
            }
    }

    private getHash(x, y) {
        return x * 10 + y;
    }

    simulateRounds(roundNumber:number) {
        const allOctopuses = Object.values(this.octopuses).map(x => x as DumboOctopus);
        for (let i = 0; i < roundNumber; i++) {
            this.currentRound++;
            allOctopuses
                .forEach(dumbo => dumbo.gainEnergy());
        }
    }

    findFirstSimultaneousFlash():number {
        let oldFlashCount = this.flashCounter;
        while(this.flashCounter - oldFlashCount !== 100) {
            oldFlashCount = this.flashCounter;
            this.simulateRounds(1);
        }
        return this.currentRound;
    }

    getOctopus(x: number, y: number):DumboOctopus {
        if (x < 0 || x > 9 || y < 0 || y > 9)
            return undefined;

        return this.octopuses[this.getHash(x, y)];
    }
}