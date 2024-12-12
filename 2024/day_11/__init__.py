def part_1(input: list[int])-> int:
    stones = input
    unique_numbers = set(input)
    for i in range(25):
        stones = blink_all_stones(stones)
        for stone in stones:
            unique_numbers.add(stone)
        # print(stones)

    print(len(unique_numbers))
    return len(stones)

def part_2(input: list[int])-> int:
    stone_count = dict[int, int]()
    for stone in input:
        stone_count[stone] = stone_count.get(stone, 0) + 1
    for i in range(75):
        # print(stone_count)
        stone_count = blink_all_stones_2(stone_count)

    print(len(stone_count))
    return sum(stone_count.values())

def blink_all_stones_2(stones: dict[int, int]) -> dict[int, int]:
    new_stones = dict[int, int]()

    for stone, stone_count in stones.items():
        for new_stone in blink_one_stone(stone):
            new_stones[new_stone] = new_stones.get(new_stone, 0) + stone_count

    return new_stones

def blink_all_stones(stones: list[int]) -> list[int]:
    new_stones = []
    for stone in stones:
        for new_stone in blink_one_stone(stone):
            new_stones.append(new_stone)

    return new_stones

def blink_one_stone(stone: int) -> list[int]:
    if stone == 0:
        return [1]
    stone_string = str(stone)
    if len(stone_string) % 2 == 0:
        return [ int(stone_string[:len(stone_string) // 2]), int(stone_string[len(stone_string) // 2:]) ]
    return [ stone * 2024 ]


def read_input(filename: str) -> list[int]:
    list_one = []
    with open(filename, 'r') as file:
        # Read each line in the file
        for line in file:
            temp = line.strip().split(" ")
            for i in range(len(temp)):
                list_one.append(int(temp[i]))
    return list_one