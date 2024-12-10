def part_1(input: list[list[int]]) -> int:
    output = 0
    for i in range(len(input)):
        for j in range(len(input[0])):
            score = count_valid_trails(input, (i, j), 0, [])
            if score != 0:
                print((i, j), score)
            output += score

    return output

def count_valid_trails(topological_map: list[list[int]], current: tuple[int, int], current_value: int, already_counted: list[tuple[int, int]]) -> int:
    x, y = current

    if x < 0 or x >= len(topological_map):
        return 0
    if y < 0 or y >= len(topological_map[0]):
        return 0
    if topological_map[x][y] != current_value:
        return 0

    if current_value == 9: # and not already_counted.__contains__((x, y)):
        already_counted.append((x, y))
        return 1

    trail_counter = 0
    trail_counter += count_valid_trails(topological_map, (x-1, y), current_value + 1, already_counted)
    trail_counter += count_valid_trails(topological_map, (x+1, y), current_value + 1, already_counted)
    trail_counter += count_valid_trails(topological_map, (x, y-1), current_value + 1, already_counted)
    trail_counter += count_valid_trails(topological_map, (x, y+1), current_value + 1, already_counted)
    return trail_counter


def read_input(filename: str) -> list[list[int]]:
    topographical_map = list[list[int]]()
    with open(filename, 'r') as file:
        for line in file:
            topographical_map.append(list(map(int, [c for c in line.strip()])))
    return topographical_map