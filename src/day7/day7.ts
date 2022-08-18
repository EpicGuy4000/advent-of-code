export class CrabArmy {
    private readonly crabs:Record<number, number> = {};
    private maxLocation:number = 0;

    constructor(positions: number[]) {
        positions.forEach(x => {
            if (!this.crabs[x]) {
                this.crabs[x] = 0;
            }
            this.crabs[x]++;
            if (this.maxLocation < x) {
                this.maxLocation = x;
            }
        })
    }

    getSpentFuelForLocation(location:number) {
        let fuelSpent = 0;

        for (let crabLocation in this.crabs) {
            const crabLocationNumber = +crabLocation;
            const crabCountOnLocation = this.crabs[crabLocation];
            const stepsToTake = Math.abs(location - crabLocationNumber);
            const fuelSpendPerCrab = stepsToTake * (stepsToTake + 1) / 2;
            fuelSpent += fuelSpendPerCrab * crabCountOnLocation;
        }

        return fuelSpent;
    }

    align():number {
        let minFuelSpent = Infinity;

        for (let crabLocation = 1; crabLocation <= this.maxLocation; crabLocation++) {
            minFuelSpent = Math.min(minFuelSpent, this.getSpentFuelForLocation(crabLocation))
        }

        return minFuelSpent;
    }
}
