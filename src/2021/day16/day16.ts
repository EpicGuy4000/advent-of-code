export function hex2bin(hex): string {
    return hex.split('').map(h => (parseInt(h, 16).toString(2)).padStart(4, '0')).join('');
}

interface IConcretePacketParser {
    (version: number, data: string): IPacket;
}

export interface IPacket {
    readonly version: number;
    readonly typeId: number;
    readonly subPackets: IPacket[];
    readonly length: number;
    get value():number;
}

export class LiteralValuePacket implements IPacket {
    readonly typeId: number = 4;
    readonly subPackets: IPacket[] = [];
    readonly version: number;
    readonly length: number;
    private readonly _value: number;

    constructor(version: number, data: string) {
        this.version = version;
        let reachedEnd = false;
        let value = '';
        let i = 0;

        for (;!reachedEnd; i += 5) {
            if (data[i] == '0')
                reachedEnd = true;

            value += data.substring(i + 1, i + 5);
        }

        this.length = i + 6;
        this._value = parseInt(value, 2);
    }

    get value(): number {
        return this._value;
    }
}

export abstract class OperatorPacket implements IPacket {
    readonly subPackets: IPacket[];
    readonly typeId: number;
    readonly version: number;
    readonly length: number;

    protected constructor(version: number, typeId: number, data: string) {
        this.version = version;
        this.typeId = typeId;

        const lengthTypeId = parseInt(data[0]);
        let pointer = 1;

        if (lengthTypeId === 0) {
            const subPacketLength = parseInt(data.substring(pointer, pointer + 15), 2);
            pointer += 15;

            this.subPackets = this.parseSubPackets(data, pointer, packets => packets.reduce((acc, p) => acc + p.length, 0) >= subPacketLength);
        } else {
            const numberOfPackets = parseInt(data.substring(pointer, pointer + 11), 2);
            pointer += 11;
            this.subPackets = this.parseSubPackets(data, pointer, packets => packets.length === numberOfPackets);
        }

        this.length = this.subPackets.reduce((acc, s) => acc + s.length, 0) + pointer + 6;
    }

    private parseSubPackets(data: string, currentPointer: number, endCondition: (packets:IPacket[]) => boolean) : IPacket[] {
        const packets = [];

        while (!endCondition(packets)) {
            const parsedPacket = PacketParser.parse(data.substring(currentPointer));
            packets.push(parsedPacket);
            currentPointer += parsedPacket.length;
        }

        return packets;
    }

    abstract get value():number;
}

export class SumPacket extends OperatorPacket {
    constructor(version: number, data: string) {
        super(version, 0, data);
    }

    get value(): number {
        return this.subPackets.map(s => s.value).reduce((acc, x) => acc + x);
    }
}

export class ProductPacket extends OperatorPacket {
    constructor(version: number, data: string) {
        super(version, 1, data);
    }

    get value(): number {
        return this.subPackets.map(s => s.value).reduce((acc, x) => acc * x);
    }
}

export class MinimumPacket extends OperatorPacket {
    constructor(version: number, data: string) {
        super(version, 2, data);
    }

    get value(): number {
        return Math.min(...this.subPackets.map(s => s.value));
    }
}

export class MaximumPacket extends OperatorPacket {
    constructor(version: number, data: string) {
        super(version, 3, data);
    }

    get value(): number {
        return Math.max(...this.subPackets.map(s => s.value));
    }
}

export class GreaterThanPacket extends OperatorPacket {
    constructor(version: number, data: string) {
        super(version, 5, data);
    }

    get value(): number {
        return this.subPackets[0].value > this.subPackets[1].value ? 1 : 0;
    }
}

export class LessThanPacket extends OperatorPacket {
    constructor(version: number, data: string) {
        super(version, 6, data);
    }

    get value(): number {
        return this.subPackets[0].value < this.subPackets[1].value ? 1 : 0;
    }
}

export class EqualToPacket extends OperatorPacket {
    constructor(version: number, data: string) {
        super(version, 7, data);
    }

    get value(): number {
        return this.subPackets[0].value === this.subPackets[1].value ? 1 : 0;
    }
}

const packetParserMap: Record<number, IConcretePacketParser> = {
    0: (version: number, data: string) => new SumPacket(version, data),
    1: (version: number, data: string) => new ProductPacket(version, data),
    2: (version: number, data: string) => new MinimumPacket(version, data),
    3: (version: number, data: string) => new MaximumPacket(version, data),
    4: (version: number, data: string) => new LiteralValuePacket(version, data),
    5: (version: number, data: string) => new GreaterThanPacket(version, data),
    6: (version: number, data: string) => new LessThanPacket(version, data),
    7: (version: number, data: string) => new EqualToPacket(version, data)
}

export class PacketParser {
    static parse(binary:string): IPacket {
        const version = parseInt(binary.substring(0, 3), 2);
        const typeId = parseInt(binary.substring(3, 6), 2);

        return packetParserMap[typeId](version, binary.substring(6));
    }
}