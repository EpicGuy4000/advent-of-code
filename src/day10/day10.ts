export class SyntaxChecker {
    private static symbolOpeners = [ '(', '[', '{', '<' ];
    private static symbolValue = [ 3, 57, 1197, 25137 ];
    private static symbolMapper:Record<string, string> = {
        '{':'}',
        '}':'{',
        '(':')',
        ')':'(',
        '[':']',
        ']':'[',
        '<':'>',
        '>':'<',
    };

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
            score += SyntaxChecker.symbolOpeners.indexOf(SyntaxChecker.symbolMapper[closers[i]]) + 1;
        }
        return score;
    }

    private getScoreForLine(line:string):number|string[] {
        return this.validateLine(line, []);
    }

    private validateLine(line:string, expectedClosers:string[]):number|string[] {
        if (line.length === 0)
            return expectedClosers;
        if (expectedClosers.length === 0 && SyntaxChecker.symbolOpeners.indexOf(line[0]) === -1)
            throw line;
        if (SyntaxChecker.symbolOpeners.indexOf(line[0]) !== -1) {
            expectedClosers.push(SyntaxChecker.symbolMapper[line[0]]);
            return this.validateLine(line.substring(1), expectedClosers);
        }
        if (line[0] !== expectedClosers[expectedClosers.length - 1])
            return SyntaxChecker.symbolValue[SyntaxChecker.symbolOpeners.indexOf(SyntaxChecker.symbolMapper[line[0]])];
        expectedClosers.pop();
        return this.validateLine(line.substring(1), expectedClosers);
    }
}