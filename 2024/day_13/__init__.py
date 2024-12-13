import re


class Button:
    regex = r"^Button [A|B]: X([\+\-]\d+), Y([\+\-]\d+)$"

    def __init__(self, x, y):
        self.x = x
        self.y = y

    @staticmethod
    def parse(line: str):
        match = re.match(Button.regex, line)
        if match is None:
            raise ValueError(f"{line} doesn't match button regex pattern {Button.regex}")

        return Button(int(match.group(1)), int(match.group(2)))

    def __repr__(self):
        return f"X: {self.x}, Y: {self.y}"

class Prize:
    regex = r"^Prize: X=(\d+), Y=(\d+)$"

    def __init__(self, x, y):
        self.x = x
        self.y = y

    @staticmethod
    def parse(line: str):
        match = re.match(Prize.regex, line)
        if match is None:
            raise ValueError(f"{line} doesn't match prize regex pattern")

        return Prize(int(match.group(1)), int(match.group(2)))

    def __repr__(self):
        return f"X: {self.x}, Y: {self.y}"

class Console:
    def __init__(self, button_a: Button, button_b: Button, prize: Prize):
        self.button_a = button_a
        self.button_b = button_b
        self.prize = prize

    def __repr__(self):
        return f"{{A: {self.button_a}, B:{self.button_b}, P:{self.prize} }}"

def part_2(consoles: list[Console]) -> int:
    result = 0

    for console in consoles:
        p = console.prize
        a = console.button_a
        b = console.button_b
        p_y = p.y + 10000000000000
        p_x = p.x + 10000000000000
        k = (p_y * a.x - p_x * a.y) * 1.0 / (b.y * a.x - b.x * a.y) * 1.0
        j = (p_x - k * b.x) * 1.0 / a.x * 1.0
        if not j.is_integer() or not k.is_integer():
            continue

        token_cost = 3 * j + k

        result += int(token_cost)

    return result

def part_1(consoles: list[Console]) -> int:
    result = 0

    for console in consoles:
        p = console.prize
        a = console.button_a
        b = console.button_b
        k = (p.y * a.x - p.x * a.y) * 1.0 / (b.y * a.x - b.x * a.y) * 1.0
        j = (p.x - k * b.x) * 1.0 / a.x * 1.0
        if not j.is_integer() or not k.is_integer():
            continue

        token_cost = 3 * j + k

        result += int(token_cost)

    return result

# j * A + k * B = P
# j * a_x * X + j * a_y * Y + k * b_x * X + k * b_y * Y = p_x * X + p_y * Y
# X * (j * a_x + k * b_x) + Y * (j * a_y + k * b_y) = X * p_x + Y * p_y
# j * a_x + k * b_x = p_x
# j * a_y + k * b_y = p_y
# j = (p_x - k * b_x) / a_x
# (p_x - k * b_x) / a_x * a_y + k * b_y = p_y
# (p_x * a_y - k * b_x * a_y) / a_x + k * b_y = p_y
# p_x * a_y - k * b_x * a_y + k * b_y * a_x = p_y * a_x
# k * (b_y * a_x - b_x * a_y) = p_y * a_x - p_x * a_y
# k = (p_y * a_x - p_x * a_y)/(b_y * a_x - b_x * a_y)

def read_input(filename: str) -> list[Console]:
    consoles = []
    lines = []
    with open(filename, 'r') as file:
        for line in file:
            lines.append(line.strip())

    for i in range(0, len(lines), 4):
        consoles.append(Console(Button.parse(lines[i]), Button.parse(lines[i+1]), Prize.parse(lines[i+2])))

    return consoles