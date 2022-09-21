import {example, full} from "./day13.data";
import {Folder} from "./day13";

test('for example finds 18 dots and 2 fold instructions', () => {
    const folder = new Folder(example);
    expect(folder.dots.length).toBe(18);
    expect(folder.folds.length).toBe(2);
})

test('parses fold instructions correctly', () => {
    const folder = new Folder(example);
    expect(folder.folds).toEqual([ { along: 'y', coordinate: 7 }, { along: 'x', coordinate: 5 } ]);
})

test('for example after 1 fold 17 dots are visible', () => {
    const folder = new Folder(example);
    folder.foldOnce();

    expect(folder.dots.length).toBe(17);
})

test('for full input after 1 fold print how many dots are visible', () => {
    const folder = new Folder(full);
    folder.foldOnce();

    console.log('After 1 fold', folder.dots.length, 'dots are visible');
})

test('for full input after all folds prints output', () => {
    const folder = new Folder(full);
    folder.fold();
    folder.print();
})