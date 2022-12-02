import {RockPaperScissorsStrategyGuide, Shape} from "./day2";
import {example, full} from "./day2.data";

test('Example is parsed correctly', () => {
    const guide = new RockPaperScissorsStrategyGuide(example);
    expect(guide.rounds.length).toBe(3);
    expect(guide.rounds[0].myShape).toBe(Shape.Paper);
    expect(guide.rounds[0].opponentsShape).toBe(Shape.Rock);
    expect(guide.rounds[1].myShape).toBe(Shape.Rock);
    expect(guide.rounds[1].opponentsShape).toBe(Shape.Paper);
    expect(guide.rounds[2].myShape).toBe(Shape.Scissors);
    expect(guide.rounds[2].opponentsShape).toBe(Shape.Scissors);
});

test('Example gives score of 15', () => {
    const guide = new RockPaperScissorsStrategyGuide(example);
    expect(guide.getTotalScore()).toBe(15);
})

test('For full input calculates score', () => {
    const guide = new RockPaperScissorsStrategyGuide(full);
    console.log('For part 1, score is', guide.getTotalScore());
})

