export interface Rule {
    firstNumber: number;
    secondNumber: number;
    letter: string;
}

export interface ValidationRequest {
    rule: Rule;
    password: string;
}

const xor = (a: boolean, b: boolean): boolean => (a || b) && !(a && b);

export class Validator {
    checkAllForPart1(requests: ValidationRequest[]): number {
        return requests.filter(r => this.checkForPart1(r)).length;
    }

    checkAllForPart2(requests: ValidationRequest[]): number {
        return requests.filter(r => this.checkForPart2(r)).length;
    }

    checkForPart1(request: ValidationRequest): boolean {
        const count = request.password.split('').filter(c => c === request.rule.letter).length;

        return request.rule.firstNumber <= count && count <= request.rule.secondNumber;
    }

    checkForPart2(request: ValidationRequest): boolean {
        return xor(request.password[request.rule.firstNumber - 1] === request.rule.letter, request.password[request.rule.secondNumber - 1] === request.rule.letter);
    }
}
