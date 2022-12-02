import {RockPaperScissorsStrategyGuide, Shape} from "./day2";
import {example, full} from "./day2.data";

test('Example is parsed correctly', () => {
    const guide = new RockPaperScissorsStrategyGuide(example);
    expect(guide.rounds.length).toBe(3);
    expect(guide.rounds[0].myShape).toBe(Shape.Rock);
    expect(guide.rounds[0].opponentsShape).toBe(Shape.Rock);
    expect(guide.rounds[1].myShape).toBe(Shape.Rock);
    expect(guide.rounds[1].opponentsShape).toBe(Shape.Paper);
    expect(guide.rounds[2].myShape).toBe(Shape.Rock);
    expect(guide.rounds[2].opponentsShape).toBe(Shape.Scissors);
});

test('Example gives score of 12', () => {
    const guide = new RockPaperScissorsStrategyGuide(example);
    console.log(guide.rounds);
    expect(guide.getTotalScore()).toBe(12);
})

test('My example gives score of 15', () => {
    const guide = new RockPaperScissorsStrategyGuide('B Y\nC X\nA Z');
    console.log(guide.rounds);
    expect(guide.getTotalScore()).toBe(15);
})

test('My other example gives score of 18', () => {
    const guide = new RockPaperScissorsStrategyGuide('C Y\nA X\nB Z');
    console.log(guide.rounds);
    expect(guide.getTotalScore()).toBe(18);
})

test('For full input calculates score', () => {
    const guide = new RockPaperScissorsStrategyGuide(full);
    console.log('For part 2, score is', guide.getTotalScore());
})

