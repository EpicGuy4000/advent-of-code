import re
from operator import concat


def part_1(input: str) -> int:
    pattern =r"mul\((\d+),(\d+)\)"
    matches = re.findall(pattern, input)

    return sum(int(num1) * int(num2) for num1, num2 in matches)

def part_2(input: str) -> int:
    parts = input.split("don't()")

    dos = [parts[0]] + [item for sub_parts in (part.split("do()")[1:] for part in parts[1:]) for item in sub_parts]

    return sum(map(part_1, dos))


def read_input(filename: str) -> str:
    reports = list()

    with open(filename, 'r') as file:
        for line in file:
            reports.append(line.strip())
    return str.join("", reports)