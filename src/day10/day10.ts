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
            .map(line => this.getScoreForLine(line))
            .filter(score => !Array.isArray(score))
            .map(score => score as number)
            .reduce((acc, score) => acc + score);
    }

    getAutocompleteScores(lines:string[]):number[] {
        return lines
            .map(line => this.getScoreForLine(line))
            .filter(score => Array.isArray(score))
            .map(score => score as string[])
            .map(closers => this.getAutocompleteScore(closers));
    }

    private getAutocompleteScore(closers:string[]):number {
        let score = 0;
        for (let i = closers.length - 1; i >= 0; i--) {
            score *= 5;
            score += this.symbolOpeners.indexOf(this.symbolMapper[closers[i]]) + 1;
        }
        return score;
    }

    private getScoreForLine(line:string):number|string[] {
        return this.validateLine(line, []);
    }

    private validateLine(line:string, expectedClosers:string[]):number|string[] {
        if (line.length === 0)
            return expectedClosers;
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