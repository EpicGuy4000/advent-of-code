class Trie {
    root:TrieNode = new TrieNode();

    add(value:string) {
        let node = this.root;
        for (let i = 0; i < value.length; i++) {
            node.leafCount++;
            if (node.children[value[i]] === undefined) {
                node.children[value[i]] = new TrieNode();
            }
            node = node.children[value[i]];
        }
        node.isLeaf = true;
        node.value = value;
    }
}

class TrieNode {
    isLeaf:boolean = false;
    children:Record<string, TrieNode> = {};
    leafCount:number = 0;
    value:string = null;
}

export class ReportAnalyzer {
    private readonly zeros:number[];
    private readonly ones:number[];
    private readonly reports:Trie;
    private readonly reportLength: number;

    constructor(reportLength:number) {
        this.zeros = new Array(reportLength).fill(0);
        this.ones = new Array(reportLength).fill(0);
        this.reportLength = reportLength;
        this.reports = new Trie();
    }

    addReport(binaryReport:string) {
        this.reports.add(binaryReport);
        for (let i = 0; i < this.reportLength; i++) {
            if (binaryReport[i] === '0') {
                this.zeros[this.reportLength - 1 - i]++;
            }
            else {
                this.ones[this.reportLength - 1 - i]++;
            }
        }
    }

    addReports(binaryReports:string[]) {
        binaryReports.forEach(this.addReport, this);
    }

    getGammaAndEpsilon() {
        let gamma = 0;
        let epsilon = 0;
        for (let i = 0; i < this.zeros.length; i++) {
            if (this.ones[i] > this.zeros[i]) {
                gamma += 2 ** i;
            }
            else {
                epsilon += 2 ** i;
            }
        }

        return [gamma, epsilon];
    }

    getPowerConsumption() {
        let [gamma, epsilon] = this.getGammaAndEpsilon();
        return gamma * epsilon;
    }

    getOxygenGeneratorRating() {
        let node = this.reports.root;
        while (!node.isLeaf) {
            if (node.children['0'] === undefined || node.children['1']?.leafCount >= node.children['0']?.leafCount) {
                node = node.children['1'];
            } else {
                node = node.children['0'];
            }
        }

        return parseInt(node.value, 2);
    }

    getCO2ScrubberRating() {
        let node = this.reports.root;
        while (!node.isLeaf) {
            if (node.children['1'] === undefined || node.children['0']?.leafCount <= node.children['1'].leafCount) {
                node = node.children['0'];
            } else {
                node = node.children['1'];
            }
        }

        return parseInt(node.value, 2);
    }

    getLifeSupportRating() {
        return this.getOxygenGeneratorRating() * this.getCO2ScrubberRating();
    }
}