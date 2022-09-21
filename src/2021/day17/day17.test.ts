class Probe {
    x: number = 0;
    y: number = 0;

    private velocityX: number;
    private velocityY: number;

    constructor(velocityX: number, velocityY: number) {
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    step() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.velocityX > 0)
            this.velocityX--;

        this.velocityY--;
    }
}

class Target {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;

    constructor(minX: number, maxX: number, minY: number, maxY: number) {
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
    }

    hasReachedTarget(probe: Probe): boolean {
        return probe.x > this.maxX || probe.y <= this.minY || (probe.x >= this.minX && probe.y <= this.maxY);
    }

    isOnTarget(probe: Probe): boolean {
        return probe.x <= this.maxX && probe.x >= this.minX && probe.y <= this.maxY && probe.y >= this.minY;
    }
}

class ProbeSimulator {
    target: Target;
}
