export const findAddends = (candidates: number[], targetSum: number, addendCount: number): number[] => {
    if (addendCount === 1) {
        return candidates.indexOf(targetSum) !== -1 ? [ targetSum ] : [];
    }

    addendCount--;

    for (let i = 0; i < candidates.length; i++) {
        const newCandidates = [...candidates];
        newCandidates.splice(i, 1);
        const addends = findAddends(newCandidates, targetSum - candidates[i], addendCount);
        if (addends.length === addendCount) {
            return [ candidates[i], ...addends];
        }
    }

    return [];
}
