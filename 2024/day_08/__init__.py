from itertools import permutations
from typing_extensions import Self

_empty = '.'
_antinode = '#'

class Coordinates:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    x: int
    y: int

    def __str__(self):
        return f'({self.x}, {self.y})'

    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)

    def distance(self, other: Self) -> tuple[int, int]:
        return self.x - other.x, self.y - other.y

    def plus(self, distance: tuple[int, int]) -> Self:
        return Coordinates(self.x + distance[0], self.y + distance[1])

    def is_within_bounds(self, x_bound: int, y_bound: int) -> bool:
        return 0 <= self.x < x_bound and 0 <= self.y < y_bound

def part_1(input: list[str]):
    groups = dict[str, list[Coordinates]]()
    groups[_antinode] = []

    for i in range(len(input)):
        for j in range(len(input[0])):
            group = groups.get(input[i][j], [])
            group.append(Coordinates(i, j))
            groups[input[i][j]] = group

    for key, values in groups.items():
        if key == _empty:
            continue
        for candidate in find_candidates(values):
            if candidate.is_within_bounds(len(input), len(input[0])):
                if not groups[_antinode].__contains__(candidate):
                    groups[_antinode].append(candidate)

    return len(groups[_antinode])

def part_2(input: list[str]):
    groups= dict[str, list[Coordinates]]()
    groups[_antinode] = []

    for i in range(len(input)):
        for j in range(len(input[0])):
            group = groups.get(input[i][j], [])
            group.append(Coordinates(i, j))
            groups[input[i][j]] = group

    for key, values in groups.items():
        if key == _empty:
            continue
        for candidate in find_candidates_2(values, len(input), len(input[0])):
            if not groups[_antinode].__contains__(candidate):
                groups[_antinode].append(candidate)

    return len(groups[_antinode])

def find_candidates(values: list[Coordinates]) -> list[Coordinates]:
    return [c1.plus(c1.distance(c2)) for c1, c2 in permutations(values, 2) if c1 != c2]

def find_candidates_2(values: list[Coordinates], x_bound: int, y_bound: int) -> list[Coordinates]:
    for c1, c2 in permutations(values, 2):
        if c1 != c2:
            distance = c1.distance(c2)
            while c1.is_within_bounds(x_bound, y_bound):
                yield c1
                c1 = c1.plus(distance)

def read_input(filename: str):
    result = []
    with open(filename, 'r') as file:
        for line in file:
            result.append(line.strip())
    return result