class Cave {
    neighbours:Cave[] = [];
    identifier:string;
    isStart:boolean;
    isEnd:boolean;

    constructor(identifier:string) {
        this.identifier = identifier;
        this.isStart = identifier === 'start';
        this.isEnd = identifier === 'end';
    }

    isLarge():boolean {
        return !this.isStart && !this.isEnd && this.identifier.toUpperCase() === this.identifier;
    }

}

export class CaveSystem {
    caves:Record<string, Cave> = {}
    startCave:Cave;

    constructor(connections: string[]) {
        connections.map(c => c.split('-'))
            .forEach(caves => {
                let [ start, end ] = caves;
                if (!this.caves[start]) {
                    this.caves[start] = new Cave(start);
                }
                if (!this.caves[end]) {
                    this.caves[end] = new Cave(end);
                }
                this.caves[start].neighbours.push(this.caves[end]);
                this.caves[end].neighbours.push(this.caves[start]);
            });
        this.startCave = Object.values(this.caves).map(c => c as Cave).find(c => c.isStart);
    }

    getPathCount():number {
        const paths = this.findDistinctPaths(this.startCave, [], false);
        return paths.length;
    }

    getPathCountWithDuplicates(): number {
        const paths = this.findDistinctPaths(this.startCave, [], true);
        return paths.length;
    }

    findDistinctPaths(startCave:Cave, pathSoFar:Cave[], visitSomeCavesTwice:boolean):Cave[][] {
        if (startCave.isEnd) {
            return [ [...pathSoFar, startCave] ];
        }

        const possibleNextCaves = startCave.neighbours.filter(c => pathSoFar.indexOf(c) === -1 || c.isLarge() || (visitSomeCavesTwice && !c.isStart));
        if (possibleNextCaves.length === 0)
            return [];
        const newPathSoFar = [...pathSoFar];
        newPathSoFar.push(startCave);
        return possibleNextCaves
            .map(nextCave => this.findDistinctPaths(nextCave, newPathSoFar, visitSomeCavesTwice && (nextCave.isLarge() || pathSoFar.indexOf(nextCave) === -1)))
            .flat();
    }
}