export class Supplies {
    private readonly elvesWithSupplies:number[][] = [];

    constructor(input: string) {
        this.elvesWithSupplies = input
            .split('\n\n')
            .map(elfString => elfString.split('\n').map(calories => +calories));
    }

    public getMostCaloriesCarried(topN: number) {
        const sorted = this.getTotalCaloriesCarried().sort((a, b) => b - a);
        return sorted.slice(0, topN).reduce((total, x) => total + x);
    }

    private getTotalCaloriesCarried() {
        return this.elvesWithSupplies.map(e => e.reduce((total, x) => total + x));
    }
}
