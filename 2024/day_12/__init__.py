def part_1_miro(farm: list[str]) -> int:
    all_regions = find_regions(farm)

    result = 0

    for region in all_regions:
        fences = count_fence(farm, region)
        # x, y = list(region)[0]
        # print((x, y), farm[x][y], len(region), fences, region)
        result += len(region) * fences

    return result

def part_2(farm: list[str]) -> int:
    all_regions = find_regions(farm)

    result = 0

    for region in all_regions:
        sides = count_sides(farm, region)
        # x, y = list(region)[0]
        # print((x, y), farm[x][y], len(region), fences, region)
        result += len(region) * sides

    return result


def find_regions(farm):
    all_regions = list[set[tuple[int, int]]]()
    visited = set[tuple[int, int]]()
    for i in range(len(farm)):
        for j in range(len(farm[0])):
            if (i, j) in visited:
                continue
            region = scan_region(farm, i, j)
            all_regions.append(region)
            for x, y in region:
                visited.add((x, y))
    return all_regions


def count_fence(farm: list[str], region: set[tuple[int, int]]) -> int:
    fences = 0
    x_dim = len(farm)
    y_dim = len(farm[0])

    for x, y in region:
        if x + 1 < x_dim and farm[x][y] != farm[x + 1][y] or x + 1 == x_dim:
            fences += 1
        if x > 0 and farm[x][y] != farm[x - 1][y] or x == 0:
            fences += 1
        if y < y_dim - 1 and farm[x][y] != farm[x][y + 1] or y + 1 == y_dim:
            fences += 1
        if y > 0 and farm[x][y] != farm[x][y - 1] or y == 0:
            fences += 1

    return fences

def count_sides(farm: list[str], region: set[tuple[int, int]]) -> int:
    sides = 0
    x_dim = len(farm)
    y_dim = len(farm[0])
    visited_fence = set[tuple[tuple[int, int], tuple[int, int]]]()

    for x, y in region:
        if ((x, y), (x + 1, y)) not in visited_fence and (x + 1 < x_dim and farm[x][y] != farm[x + 1][y] or x + 1 == x_dim):
            sides += 1
            new_y = y + 1
            while (x, new_y) in region and (x + 1, new_y) not in region:
                visited_fence.add(((x, new_y), (x + 1, new_y)))
                new_y += 1
            new_y = y -1
            while (x, new_y) in region and (x + 1, new_y) not in region:
                visited_fence.add(((x, new_y), (x + 1, new_y)))
                new_y -= 1
        if ((x, y), (x - 1, y)) not in visited_fence and (x > 0 and farm[x][y] != farm[x - 1][y] or x == 0):
            sides += 1
            new_y = y + 1
            while (x, new_y) in region and (x - 1, new_y) not in region:
                visited_fence.add(((x, new_y), (x - 1, new_y)))
                new_y += 1
            new_y = y -1
            while (x, new_y) in region and (x - 1, new_y) not in region:
                visited_fence.add(((x, new_y), (x - 1, new_y)))
                new_y -= 1
        if ((x, y), (x, y + 1)) not in visited_fence and (y < y_dim - 1 and farm[x][y] != farm[x][y + 1] or y + 1 == y_dim):
            sides += 1
            new_x = x + 1
            while (new_x, y) in region and (new_x, y + 1) not in region:
                visited_fence.add(((new_x, y), (new_x, y + 1)))
                new_x += 1
            new_x = x - 1
            while (new_x, y) in region and (new_x, y + 1) not in region:
                visited_fence.add(((new_x, y), (new_x, y + 1)))
                new_x -= 1
        if ((x, y), (x, y - 1)) not in visited_fence and (y > 0 and farm[x][y] != farm[x][y - 1] or y == 0):
            sides += 1
            new_x = x + 1
            while (new_x, y) in region and (new_x, y - 1) not in region:
                visited_fence.add(((new_x, y), (new_x, y - 1)))
                new_x += 1
            new_x = x - 1
            while (new_x, y) in region and (new_x, y - 1) not in region:
                visited_fence.add(((new_x, y), (new_x, y - 1)))
                new_x -= 1

    return sides

def scan_region(farm: list[str], i: int, j: int) -> set[tuple[int, int]]:
    visited = set()
    not_visited = set()
    x_dim = len(farm)
    y_dim = len(farm[0])

    not_visited.add((i, j))

    while len(not_visited) > 0:
        x, y = not_visited.pop()
        if farm[x][y] != farm[i][j]:
            continue

        if x < x_dim - 1 and not (x + 1, y) in visited:
            not_visited.add((x + 1, y))
        if x > 0 and not (x - 1, y) in visited:
            not_visited.add((x - 1, y))
        if y < y_dim - 1 and not (x, y + 1) in visited:
            not_visited.add((x, y + 1))
        if y > 0 and not (x, y - 1) in visited:
            not_visited.add((x, y - 1))

        visited.add((x, y))

    return visited


def part_1 (farm: list[str]) -> int:
    result = 0
    current_region = set()
    locations_to_be_visited = set()
    all_regions = []
    current_crop = farm[0][0]
    processed_locations = set()
    max_i = len(farm) - 1
    max_y = len(farm[0]) - 1
    y = 0

    for i in range(len(farm)):
        while y <= max_y :
            if farm[i][y] == current_crop:
                 #add location to region
                current_region.add((i,y))
                #check neighbours if they need to be visited as well



            y += 1






    return result

def find_region(farm: list[str],locations_to_be_visited: {}, current_crop:str, max_x: int, max_y:int) :
    region = set()

    while len(locations_to_be_visited) > 0:
        x, y = locations_to_be_visited.pop()
        region.add((x,y))
        if x <= max_x and farm[x + 1][y] == current_crop:
            locations_to_be_visited.add((x + 1, y))
        if x > -1 and farm[x - 1][y] == current_crop:
            locations_to_be_visited.add((x- 1, y))
        if y <= max_y and farm[x][y + 1] == current_crop:
            locations_to_be_visited.add((x, y + 1))
        if y > -1 and farm[x][y + 1] == current_crop:
            locations_to_be_visited.add((x, y + 1))

    return region




def check_borders(farm: list[str], i: int, j: int) -> int:
    result = 0

    if farm[i][j] != farm[i - 1][j] or i-1 < 0:
        result += 1

    if farm[i][j] != farm[i + 1][j] or i+1 > len(farm):
        result += 1

    if farm[i][j] != farm[i][j + 1] or j+1 > len(farm[i]):
        result += 1

    if farm[i][j] != farm[i][j-1] or j-1 < 0:
        result += 1


    return result


def read_input(filename: str) -> list[str]:
    farm = []
    with open(filename, 'r') as file:
        for line in file:
            temp = line.strip().split(" ")
            for i in range(len(temp)):
                farm.append((temp[i]))
    return farm