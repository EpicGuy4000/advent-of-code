import { full } from "./day16.data";
import {hex2bin, IPacket, LiteralValuePacket, OperatorPacket, PacketParser} from "./day16";

test('hex2bin works', () => {
    expect(hex2bin('D2FE28')).toBe('110100101111111000101000');
});

test('literal packet is parsed correctly', () => {
    const parsedPacket = PacketParser.parse(hex2bin("D2FE28"));

    expect(parsedPacket.subPackets).toEqual([]);
    expect(parsedPacket.version).toBe(6);
    expect(parsedPacket.typeId).toBe(4);
    const literalValuePacket = parsedPacket as LiteralValuePacket;
    expect(literalValuePacket).toBeTruthy();
    expect(literalValuePacket.value).toBe(2021);
    expect(literalValuePacket.length).toBe(21);
})

test('operator packet is parsed correctly', () => {
    const parsedPacket = PacketParser.parse(hex2bin("38006F45291200"));

    expect(parsedPacket.subPackets.length).toBe(2);
    expect(parsedPacket.version).toBe(1);
    expect(parsedPacket.typeId).toBe(6);
    const operatorPacket = parsedPacket as OperatorPacket;
    expect(operatorPacket).toBeTruthy();
    const firstLiteralPacket = operatorPacket.subPackets[0] as LiteralValuePacket;
    expect(firstLiteralPacket).toBeTruthy();
    const secondLiteralPacket = operatorPacket.subPackets[1] as LiteralValuePacket;
    expect(secondLiteralPacket).toBeTruthy();
    expect(firstLiteralPacket.value).toBe(10);
    expect(secondLiteralPacket.value).toBe(20);
    expect(parsedPacket.length).toBe(49);
})

test('operator packet with three sub packets is parsed correctly', () => {
    const parsedPacket = PacketParser.parse(hex2bin("EE00D40C823060"));

    expect(parsedPacket.subPackets.length).toBe(3);
    expect(parsedPacket.version).toBe(7);
    expect(parsedPacket.typeId).toBe(3);
    const operatorPacket = parsedPacket as OperatorPacket;
    expect(operatorPacket).toBeTruthy();
    const firstLiteralPacket = operatorPacket.subPackets[0] as LiteralValuePacket;
    expect(firstLiteralPacket).toBeTruthy();
    const secondLiteralPacket = operatorPacket.subPackets[1] as LiteralValuePacket;
    expect(secondLiteralPacket).toBeTruthy();
    const thirdLiteralPacket = operatorPacket.subPackets[2] as LiteralValuePacket;
    expect(thirdLiteralPacket).toBeTruthy();
    expect(firstLiteralPacket.value).toBe(1);
    expect(secondLiteralPacket.value).toBe(2);
    expect(thirdLiteralPacket.value).toBe(3);
})

const getAllPackets = function (packet: IPacket): IPacket[] {
    return [ packet, ...packet.subPackets.map(getAllPackets).flat()];
}

test.each([
    { expectedVersionSum: 16, packet: "8A004A801A8002F478" },
    { expectedVersionSum: 12, packet: "620080001611562C8802118E34" },
    { expectedVersionSum: 23, packet: "C0015000016115A2E0802F182340" },
    { expectedVersionSum: 31, packet: "A0016C880162017C3686B18A3D4780" }
])('for example, adding all version numbers of packets results in $expectedVersionSum', ({ expectedVersionSum, packet }) => {
    const parsedPacket = PacketParser.parse(hex2bin(packet));

    const allPackets = getAllPackets(parsedPacket);

    expect(allPackets.reduce((acc, p) => acc + p.version, 0)).toBe(expectedVersionSum);
})

test('for puzzle input, outputs version sum',  () => {
    console.log('version sum is', getAllPackets(PacketParser.parse(hex2bin(full))).reduce((acc, p) => acc + p.version, 0));
})

test.each([
    { result: 3, packet: "C200B40A82" },
    { result: 54, packet: "04005AC33890" },
    { result: 7, packet: "880086C3E88112" },
    { result: 9, packet: "CE00C43D881120" },
    { result: 1, packet: "D8005AC2A8F0" },
    { result: 0, packet: "F600BC2D8F" },
    { result: 0, packet: "9C005AC2F8F0" },
    { result: 1, packet: "9C0141080250320F1802104A08" },
])('calculates correctly for result of $result', ({ result, packet }) => {
    expect(PacketParser.parse(hex2bin(packet)).value).toBe(result);
});

test('for puzzle input, outputs packet value',  () => {
    console.log('packet value is', PacketParser.parse(hex2bin(full)).value);
})