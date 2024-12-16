from __future__ import annotations

import typing
from abc import ABCMeta, abstractmethod
from enum import Enum


class Direction(Enum):
    UP = 1, (0, -1), (0, 1)
    DOWN = 2, (0, 1), (0, -1)
    LEFT = 3, (-1, 0), (1, 0)
    RIGHT = 4, (1, 0), (-1, 0)

    def __init__(self, val: int, move: tuple[int, int], reverse: tuple[int, int]):
        self.val = val
        self.move = move
        self.reverse = reverse

    @staticmethod
    def from_char(char: str):
        match char:
            case 'v':
                return Direction.DOWN
            case '^':
                return Direction.UP
            case '<':
                return Direction.LEFT
            case default:
                return Direction.RIGHT

def read_input(filename: str) -> tuple[list[list[Tile]], list[Direction]]:
    tile_map = list[list[Tile]]()
    directions = list[Direction]()

    with open(filename) as file:
        is_map_read = False
        y = -1

        for line in file:
            y += 1
            stripped_line = line.strip()
            if not is_map_read:
                if stripped_line == "":
                    is_map_read = True
                    continue
                row = list[Tile]()
                for x, char in enumerate(stripped_line):
                    tile_type = TileType.from_char(char)
                    match tile_type:
                        case TileType.WALL:
                            row.append(Wall(x, y, tile_map))
                        case TileType.BOX:
                            row.append(Box(x, y, tile_map))
                        case TileType.ROBOT:
                            row.append(Robot(x, y, tile_map))
                        case default:
                            row.append(Empty(x, y, tile_map))

                tile_map.append(row)
            else:
                for char in stripped_line:
                    directions.append(Direction.from_char(char))

    return tile_map, directions



def read_input_part_2(filename: str) -> tuple[list[list[Tile]], list[Direction]]:
    tile_map = list[list[Tile]]()
    directions = list[Direction]()

    with open(filename) as file:
        is_map_read = False
        y = -1

        for line in file:
            y += 1
            stripped_line = line.strip()
            if not is_map_read:
                if stripped_line == "":
                    is_map_read = True
                    continue
                row = list[Tile]()
                x = 0
                for char in stripped_line:
                    tile_type = TileType.from_char(char)
                    match tile_type:
                        case TileType.WALL:
                            row.append(Wall(x, y, tile_map))
                            row.append(Wall(x + 1, y, tile_map))
                        case TileType.BOX:
                            row.append(DoubleBoxLeft(x, y, tile_map))
                            row.append(DoubleBoxRight(x + 1, y, tile_map))
                        case TileType.ROBOT:
                            row.append(Robot(x, y, tile_map))
                            row.append(Empty(x + 1, y, tile_map))
                        case default:
                            row.append(Empty(x, y, tile_map))
                            row.append(Empty(x + 1, y, tile_map))
                    x += 2

                tile_map.append(row)
            else:
                for char in stripped_line:
                    directions.append(Direction.from_char(char))

    return tile_map, directions

class TileType(Enum):
    ROBOT = 1, '@',
    WALL = 2, '#',
    BOX = 3, 'O'
    EMPTY = 4, '.'

    def __init__(self, val: int, char: str):
        self.char = char

    @staticmethod
    def from_char(char: str):
        match char:
            case '@':
                return TileType.ROBOT
            case '#':
                return TileType.WALL
            case 'O':
                return TileType.BOX
            case default:
                return TileType.EMPTY

    def __repr__(self):
        return self.char

class Tile(metaclass=ABCMeta):
    def __init__(self, x: int, y: int, tile_map: list[list[Tile]], tile_type: TileType, width = 1):
        self.x = x
        self.y = y
        self.type = tile_type
        self.tile_map = tile_map
        self.width = width

    @abstractmethod
    def accept(self, tile: Tile, source: Tile, direction: Direction) -> bool:
        return False

    @abstractmethod
    def can_accept(self, direction: Direction) -> bool:
        return False

    def swap(self, tile: Tile):
        (tx, ty) = self.x, self.y
        self.x = tile.x
        self.y = tile.y
        tile.x = tx
        tile.y = ty

        self.tile_map[tile.y][tile.x] = tile
        self.tile_map[self.y][self.x] = self

    def __repr__(self):
        return self.type.__repr__()



class Wall(Tile):
    def __init__(self, x: int, y: int, tile_map: list[list[Tile]]):
        super().__init__(x, y, tile_map, TileType.WALL)

    def accept(self, tile: Tile, source: Tile, direction: Direction) -> bool:
        return False

    def can_accept(self, direction: Direction) -> bool:
        return False

class Empty(Tile):
    def __init__(self, x: int, y: int, tile_map: list[list[Tile]]):
        super().__init__(x, y, tile_map, TileType.EMPTY)

    def accept(self, tile: Tile, source: Tile, direction: Direction) -> bool:
        self.swap(tile)
        move_x, move_y = direction.reverse
        while tile != source:
            tile = self.tile_map[self.y + move_y][self.x + move_x]
            self.swap(tile)
        return True

    def can_accept(self, direction: Direction) -> bool:
        return True

class Box(Tile):
    def __init__(self, x: int, y: int, tile_map: list[list[Tile]]):
        super().__init__(x, y, tile_map, TileType.BOX)

    def accept(self, tile: Tile, source: Tile, direction: Direction) -> bool:
        move_x, move_y = direction.move
        next_tile = self.tile_map[self.y + move_y][self.x + move_x]
        return next_tile.accept(self, source, direction)

    def can_accept(self, direction: Direction) -> bool:
        move_x, move_y = direction.move
        next_tile = self.tile_map[self.y + move_y][self.x + move_x]
        return next_tile.can_accept(direction)

class DoubleBoxLeft(Box):
    def __init__(self, x: int, y: int, tile_map: list[list[Tile]]):
        super().__init__(x, y, tile_map)

    def accept(self, tile: Tile, source: Tile, direction: Direction) -> bool:
        move_x, move_y = direction.move
        next_tile = self.tile_map[self.y + move_y][self.x + move_x]

        if direction in [ Direction.LEFT, Direction.RIGHT]:
            return next_tile.accept(self, source, direction)

        right_half = self.tile_map[self.y][self.x + 1]
        other_next_tile = self.tile_map[self.y + move_y][self.x + 1]

        if next_tile.can_accept(direction) and other_next_tile.can_accept(direction):
            other_next_tile.accept(right_half, right_half, direction)
            next_tile = self.tile_map[self.y + move_y][self.x + move_x]
            next_tile.accept(self, source, direction)
            return True

        return False

    def can_accept(self, direction: Direction) -> bool:
        move_x, move_y = direction.move
        next_tile = self.tile_map[self.y + move_y][self.x + move_x]

        if direction in [Direction.LEFT, Direction.RIGHT]:
            return next_tile.can_accept(direction)

        other_next_tile = self.tile_map[self.y + move_y][self.x + 1]

        return next_tile.can_accept(direction) and other_next_tile.can_accept(direction)

    def __repr__(self):
        return '['

class DoubleBoxRight(Tile):
    def __init__(self, x: int, y: int, tile_map: list[list[Tile]]):
        super().__init__(x, y, tile_map, TileType.BOX)

    def accept(self, tile: Tile, source: Tile, direction: Direction) -> bool:
        move_x, move_y = direction.move
        next_tile = self.tile_map[self.y + move_y][self.x + move_x]

        if direction in [Direction.LEFT, Direction.RIGHT]:
            return next_tile.accept(self, source, direction)

        left_half = self.tile_map[self.y][self.x - 1]
        other_next_tile = self.tile_map[self.y + move_y][self.x - 1]

        if next_tile.can_accept(direction) and other_next_tile.can_accept(direction):
            other_next_tile.accept(left_half, left_half, direction)
            next_tile = self.tile_map[self.y + move_y][self.x + move_x]
            next_tile.accept(self, source, direction)
            return True
        return False

    def can_accept(self, direction: Direction) -> bool:
        move_x, move_y = direction.move
        next_tile = self.tile_map[self.y + move_y][self.x + move_x]

        if direction in [Direction.LEFT, Direction.RIGHT]:
            return next_tile.can_accept(direction)

        other_next_tile = self.tile_map[self.y + move_y][self.x - 1]

        return next_tile.can_accept(direction) and other_next_tile.can_accept(direction)


    def __repr__(self):
        return ']'

class Robot(Tile):
    def __init__(self, x: int, y: int, tile_map: list[list[Tile]]):
        super().__init__(x, y, tile_map, TileType.ROBOT)

    def accept(self, tile: Tile, source: Tile, direction: Direction) -> bool:
        return False

    def can_accept(self, direction: Direction) -> bool:
        return False

    def move(self, direction: Direction):
        move_x, move_y = direction.move
        next_tile = self.tile_map[self.y + move_y][self.x + move_x]
        next_tile.accept(self, self, direction)

def part_1(warehouse_map: list[list[Tile]], directions: list[Direction]) -> int:
    robot: Robot | None = None
    for row in warehouse_map:
        for x in row:
            if x.type == TileType.ROBOT:
                robot = typing.cast(Robot, x)
                break
        if robot is not None:
            break

    for direction in directions:
        # print_map(warehouse_map)
        # print(direction.name)
        robot.move(direction)

    print_map(warehouse_map)
    result = sum([100 * box.y + box.x for row in map(set, warehouse_map) for box in row if box.type == TileType.BOX and type(box) != DoubleBoxRight])

    return result

def print_map(tile_map: list[list[Tile]]):
    print(str.join('\n', map(lambda row: str.join('', map(str, row)), tile_map)))