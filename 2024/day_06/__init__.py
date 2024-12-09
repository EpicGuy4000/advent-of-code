_target = '^'
_obstacle = '#'

def part_1(lab_map: list[str])->int:
    x=0
    y=0
    target = '^'
    obstacle = '#'
    result = set()
    direction_x = -1 #direction up
    direction_y = 0

    x_dim = len(lab_map)
    y_dim = len(lab_map[0])

    for row_idx, row in enumerate(lab_map):
        if target in row:
            y = row.index(target)
            x = row_idx
            break

    while 0 <= x < x_dim and 0 <= y < y_dim:
        result.add((x, y))

        if ( 0 > x + direction_x or x + direction_y >= x_dim
                or 0 > y + direction_y or y + direction_y >= y_dim):
            break
            #print(str(x))
            #print(str(y))
        while 0 <= x + direction_x < x_dim and 0 <= y + direction_y < y_dim and lab_map[x+direction_x][y+direction_y] == obstacle:
            direction_x, direction_y = change_direction(direction_x, direction_y)

        x += direction_x
        y += direction_y

    return len(result)

def change_direction(x: int, y: int):
    match x, y:
        case (-1,0): #if current direction is up
           return 0 ,1 #go right
        case (0,1): #if direction right
            return 1, 0 #go down
        case (1,0): #if direction down
            return 0, -1 #go left
        case (0,-1): #if direction go left
            return -1, 0 # go right

def check_loop_exists(obstacle: tuple[int, int], lab_map: list[str], position: tuple[int, int], move: tuple[int, int]) -> bool:
    x, y = position
    x_dim = len(lab_map)
    y_dim = len(lab_map[0])
    visited_locations = set()
    direction_x, direction_y = move

    while 0 <= x < x_dim and 0 <= y < y_dim:
        if visited_locations.__contains__(((x, y), (direction_x, direction_y))):
            return True

        visited_locations.add(((x, y), (direction_x, direction_y)))

        if (0 > x + direction_x or x + direction_x >= x_dim
                or 0 > y + direction_y or y + direction_y >= y_dim):
            return False

        change_count = 0

        while (change_count < 4 and 0 <= x + direction_x < x_dim and 0 <= y + direction_y < y_dim
               and (lab_map[x + direction_x][y + direction_y] == _obstacle or (x + direction_x, y + direction_y) == obstacle)):
            direction_x, direction_y = change_direction(direction_x, direction_y)
            change_count += 1

        if change_count == 4:
            return True

        x += direction_x
        y += direction_y

    return False


def part_2(lab_map: list[str])->int:
    starting_x = 0
    starting_y = 0
    result = set()

    for row_idx, row in enumerate(lab_map):
        if _target in row:
            starting_x = row_idx
            starting_y = row.index(_target)
            break

    for i in range(len(lab_map)):
        for j in range(len(lab_map[0])):
            if lab_map[i][j] != _obstacle and lab_map[i][j] != _target:
                if check_loop_exists((i, j), lab_map, (starting_x, starting_y), (-1, 0)):
                    result.add((i, j))


    return len(result)

def read_input(filename: str) -> list[str]:
    lab_map=[]
    with open(filename, 'r') as file:
        for line in file:
            lab_map.append(line.strip())
    return lab_map