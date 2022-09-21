function reverseRecord(input) {
    return Object.fromEntries(
        Object.entries(input).map(([key, value]) => [
            value,
            key,
        ]),
    )
}

export class Decoder {
    private except(str1:string, str2:string):string {
        return str1.split('').filter(x => str2.indexOf(x) === -1).join('');
    }
    private containsAll(str1:string, str2:string):boolean {
        return [...new Array(str2.length).keys()].reduce((acc, i) => acc && str1.indexOf(str2[i]) !== -1, true);
    }
    private containsNone(str1:string, str2:string):boolean {
        return [...new Array(str2.length).keys()].reduce((acc, i) => acc && str1.indexOf(str2[i]) === -1, true);
    }

    decode(input:string):string {
        const mapping:Record<string, string> = {};

        const [ digits, result ] = input.split(' | ').map(x => x.split(' '));
        mapping['1'] = digits.find(d => d.length == 2);
        mapping['7'] = digits.find(d => d.length == 3);
        mapping['4'] = digits.find(d => d.length == 4);
        mapping['8'] = digits.find(d => d.length == 7);
        mapping['a'] = this.except(mapping['7'], mapping['1']);
        mapping['3'] = digits.find(d => d.length == 5 && this.containsAll(d, mapping['1']));
        mapping['b'] = this.except(mapping['4'], mapping['3']);
        mapping['g'] = this.except(mapping['3'], mapping['4'] + mapping['a']);
        mapping['d'] = this.except(mapping['3'], mapping['1'] + mapping['a'] + mapping['g']);
        mapping['5'] = digits.find(d => d.length == 5 && this.containsAll(d, mapping['a'] + mapping['b'] + mapping['d'] + mapping['g']));
        mapping['9'] = digits.find(d => d.length == 6 && this.containsAll(d, mapping['1'] + mapping['5']));
        mapping['c'] = this.except(mapping['9'], mapping['5']);
        mapping['f'] = this.except(mapping['1'], mapping['c']);
        mapping['e'] = this.except(mapping['8'], mapping['9']);
        mapping['0'] = digits.find(d => d.length == 6 && this.containsNone(d, mapping['d']));
        mapping['6'] = digits.find(d => d.length == 6 && this.containsNone(d, mapping['c']));
        mapping['2'] = digits.find(d => d.length == 5 && this.containsNone(d, mapping['b'] + mapping['f']));

        const reverseMap = reverseRecord(mapping);

        return result.map(x => reverseMap[Object.values(mapping).find(y => x.length === y.length && this.containsAll(x, y))]).join('');
    }
}

export function countInstancesOfUniqueSegmentCombinations(input:string[]) {
    return input.map(e => e.split(' | ')[1].split(' ')).flat()
        .map(digit => digit.length).filter(x => x == 2 || x == 3 || x == 4 || x == 7).length
}