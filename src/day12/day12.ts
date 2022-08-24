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
        const paths = this.findDistinctPaths(this.startCave, []);
        return paths.length;
    }

    getPathCountWithDuplicates(): number {
        return Object.values(this.caves).map(c => c as Cave)
            .filter(c => !c.isLarge() && !c.isStart && !c.isEnd)
            .map(c => this.findDistinctPaths(this.startCave, [], c))
            .flat()
            .map(path => this.getPathAsString(path))
            .filter((v, i, a) => a.indexOf(v) === i) //unique
            .length;
    }

    findDistinctPaths(startCave:Cave, pathSoFar:Cave[], caveToVisitTwice?:Cave):Cave[][] {
        if (startCave.isEnd) {
            return [ [...pathSoFar, startCave] ];
        }

        const possibleNextCaves = startCave.neighbours.filter(c => pathSoFar.indexOf(c) === -1 || c.isLarge() || (c == caveToVisitTwice && pathSoFar.filter(c => c === caveToVisitTwice).length < 2));
        if (possibleNextCaves.length === 0)
            return [];
        const newPathSoFar = [...pathSoFar];
        newPathSoFar.push(startCave);
        return possibleNextCaves
            .map(nextCave => this.findDistinctPaths(nextCave, newPathSoFar, caveToVisitTwice))
            .flat();
    }

    private getPathAsString(path:Cave[]):string {
        return path.map(c => c.identifier).join('-');
    }
}