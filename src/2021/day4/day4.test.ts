import {exampleBoards, exampleDraw, fullBoards, fullDraw} from "./day4.data";
import {Bingo} from "./day4";

test('for example board expect winner after 12 draws', () => {
    const bingo = new Bingo(exampleBoards);
    const drawnNumbers:number[] = [];

    for (let i = 0; i < exampleDraw.length && !bingo.getWinner(); i++) {
        bingo.draw(exampleDraw[i]);
        drawnNumbers.push(exampleDraw[i]);
    }

    expect(drawnNumbers.length).toBe(12);
    expect(bingo.getWinner()).not.toBeNull();
    expect(bingo.getWinner().getScore(exampleDraw[11])).toBe(4512);
})

test('for example board expect last winner to have a score of 1924', () => {
    const bingo = new Bingo(exampleBoards);
    const drawnNumbers:number[] = [];

    for (let i = 0; i < exampleDraw.length && !bingo.boards.reduce((acc, board) => acc && board.isWinner, true); i++) {
        bingo.draw(exampleDraw[i]);
        drawnNumbers.push(exampleDraw[i]);
    }

    expect(bingo.getWinner().getScore(drawnNumbers[drawnNumbers.length - 1])).toBe(1924);
})

test('for puzzle input gives score', () => {
    const bingo = new Bingo(fullBoards);
    const drawnNumbers:number[] = [];

    for (let i = 0; i < fullDraw.length && !bingo.getWinner(); i++) {
        bingo.draw(fullDraw[i]);
        drawnNumbers.push(fullDraw[i]);
    }

    printResult(bingo, drawnNumbers);
})

test('for puzzle input gives score - part 2', () => {
    const bingo = new Bingo(fullBoards);
    const drawnNumbers:number[] = [];

    for (let i = 0; i < fullDraw.length && !bingo.boards.reduce((acc, board) => acc && board.isWinner, true); i++) {
        bingo.draw(fullDraw[i]);
        drawnNumbers.push(fullDraw[i]);
    }

    printResult(bingo, drawnNumbers);
})

function printResult(bingo:Bingo, drawnNumbers:number[]) {
    console.log('We have a winner! Score:', bingo.getWinner().getScore(drawnNumbers[drawnNumbers.length - 1]));
}