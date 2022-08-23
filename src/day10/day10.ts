export class SyntaxChecker {
    private symbolOpeners = [ '(', '[', '{', '<' ];
    private symbolValue = [ 3, 57, 1197, 25137 ];
    private symbolMapper:Record<string, string> = {};

    constructor() {
        this.symbolMapper['}'] = '{';
        this.symbolMapper['{'] = '}';
        this.symbolMapper[')'] = '(';
        this.symbolMapper['('] = ')';
        this.symbolMapper[']'] = '[';
        this.symbolMapper['['] = ']';
        this.symbolMapper['>'] = '<';
        this.symbolMapper['<'] = '>';
    }

    getErrorScore(lines:string[]):number {
        return lines
            .map(line => this.getErrorScoreForLine(line))
            .reduce((acc, score) => acc + score);
    }

    private getErrorScoreForLine(line:string):number {
        return this.validateLine(line, []);
    }

    private validateLine(line:string, expectedClosers:string[]):number {
        if (line.length === 0)
            return 0;
        if (expectedClosers.length === 0 && this.symbolOpeners.indexOf(line[0]) === -1)
            throw line;
        if (this.symbolOpeners.indexOf(line[0]) !== -1) {
            expectedClosers.push(this.symbolMapper[line[0]]);
            return this.validateLine(line.substring(1), expectedClosers);
        }
        if (line[0] !== expectedClosers[expectedClosers.length - 1])
            return this.symbolValue[this.symbolOpeners.indexOf(this.symbolMapper[line[0]])];
        expectedClosers.pop();
        return this.validateLine(line.substring(1), expectedClosers);
    }
}