export class PolymerizationSystem {
    rules: Record<string, string> = {};
    pairs: Record<string, number> = {};
    singles: Record<string, number> = {};

    private incrementCounter(record: Record<string, number>, key: string, incrementBy?:number) {
        if (!record[key]) {
            record[key] = 0;
        }
        record[key] += (incrementBy || 1);
    }

    constructor(input: string[]) {
        const polymerTemplate = input[0];

        for (let i = 0; i < polymerTemplate.length - 1; i++) {
            this.incrementCounter(this.pairs, polymerTemplate.substring(i, i + 2));
            this.incrementCounter(this.singles, polymerTemplate[i]);
        }
        this.incrementCounter(this.singles, polymerTemplate[polymerTemplate.length - 1]);

        input.slice(2).forEach(r => {
            const [ sequence, insertion ] = r.split(' -> ');
            this.rules[sequence] = insertion;
        })
    }

    getPolymerLength(): number {
        return Object.values(this.singles).map(x => +x).reduce((acc, x) => acc + x);
    }

    step(count?:number) {
        for (let i = 0; i < (count || 1); i++) {
            this.takeOneStep();
        }
    }

    private takeOneStep() {
        let newPairs: Record<string, number> = {};

        for (const currentPairsKey in this.pairs) {
            const insertion = this.rules[currentPairsKey];
            const currentPairCount = this.pairs[currentPairsKey];
            if (insertion) {
                this.incrementCounter(this.singles, insertion, currentPairCount);
                this.incrementCounter(newPairs, currentPairsKey[0] + insertion, currentPairCount);
                this.incrementCounter(newPairs, insertion + currentPairsKey[1], currentPairCount);
            } else {
                this.incrementCounter(newPairs, currentPairsKey, currentPairCount);
            }
        }

        this.pairs = newPairs;
    }
}