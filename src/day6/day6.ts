class Lanternfish {
    constructor(cycleTimer: number, simulator: LanternfishSimulator) {
        this.cycleTimer = cycleTimer;
        this.simulator = simulator;
    }

    cycleTimer:number;
    private readonly simulator:LanternfishSimulator;

    tick(numberOfDays:number) {
        if (this.cycleTimer === 0) {
            this.cycleTimer = 7;
        }
        this.cycleTimer -= numberOfDays;
        if (this.cycleTimer <= 0) {
            this.simulator.addNewFish(new Lanternfish(this.cycleTimer + 9, this.simulator));
            if (this.cycleTimer < 0) {
                this.cycleTimer += 7;
            }
        }
    }
}

export class LanternfishSimulator {
    private readonly fish:Lanternfish[];

    constructor(startingFish: number[]) {
        this.fish = startingFish.map(x => new Lanternfish(x, this));
    }

    passTime(days:number) {
        let daysPassed = days % 7;
        [...this.fish].forEach(f => f.tick(daysPassed));
        while (daysPassed < days) {
            [...this.fish].forEach(f => f.tick(7));
            daysPassed += 7;
        }
    }

    addNewFish(newFish: Lanternfish) {
        this.fish.push(newFish);
    }

    getCurrentFish() {
        return this.fish.filter(f => f.cycleTimer < 9);
    }
}