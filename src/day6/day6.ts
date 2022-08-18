export class LanternfishSimulator {
    private readonly fish:number[];

    constructor(startingFish: number[]) {
        this.fish = new Array(9).fill(0);

        startingFish.forEach(x => this.fish[x]++);
    }

    passTime(days:number) {
        for (let i = 0; i < days; i++) {
            const fishWithZero = this.fish.shift();
            this.fish[8] = fishWithZero;
            this.fish[6] += fishWithZero;
        }
    }

    getCurrentFishCount() {
        return this.fish.reduce((acc, x) => acc + x);
    }
}