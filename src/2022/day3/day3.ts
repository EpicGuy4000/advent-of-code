export class Rucksack {
    private static lowerCaseLowerBound: number = 'a'.charCodeAt(0);
    private static upperCaseLowerBound: number = 'A'.charCodeAt(0);

    static getPrioritySum(input: string[]) {
        return input.map(items => Rucksack.getRepeatingItem(items))
            .map(repeatingItem => Rucksack.getPriority(repeatingItem))
            .reduce((total, x) => total + x)
    }

    static getElfGroups(input: string[]): string[][] {
        const groups: string[][] = [];

        for (let i = 0; i < input.length; i++) {
            const groupIndex = Math.floor(i / 3);

            if (groups[groupIndex] === undefined) {
                groups[groupIndex] = [];
            }

            groups[groupIndex].push(input[i]);
        }

        return groups;
    }

    static getRepeatingItem(input: string): string {
        const firstCompartment = input.slice(0, input.length / 2);
        const secondCompartment = input.slice(input.length / 2);

        return this.getRepeatingItemInArrays([ firstCompartment, secondCompartment ]);
    }

    static getRepeatingItemInArrays(arrays: string[]): string {
        return arrays.map(a => [...a]).reduce((repeatingItems, array) => repeatingItems.filter(v => array.includes(v)))[0];
    }

    static getPriority(itemType: string): number {
        const charCode = itemType.charCodeAt(0);

        if (charCode - this.lowerCaseLowerBound < 0) {
            return charCode - this.upperCaseLowerBound + 27;
        }

        return charCode - this.lowerCaseLowerBound + 1;
    }
}