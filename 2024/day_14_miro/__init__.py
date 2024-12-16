import copy
import itertools
import time
from asyncio import wait_for
from copy import deepcopy


class Robot:
    def __init__(self, position_x: int, position_y: int, move_x: int, move_y: int):
        self.position_x = position_x
        self.position_y = position_y
        self.move_x = move_x
        self.move_y = move_y

    def __repr__(self):
        return f"{self.position_x, self.position_y}"

def part_2(robots: list[Robot], x_dim: int, y_dim: int) -> int:
    # cycles = dict[Robot, int]()
    # for robot in robots:
    #     i = 1
    #     while True:
    #         x, y = calculate_new_position(robot, x_dim, y_dim, i)
    #         print(i, x, y)
    #         if (x, y) == (robot.position_x, robot.position_y):
    #             break
    #         i += 1
    #     print(robot, i)
    #     cycles[robot] = i
    #
    # print(cycles)

    robot_copy = deepcopy(robots)
    for robot in robot_copy:
        robot.position_x, robot.position_y = calculate_new_position(robot, x_dim, y_dim, 6752)
    print_robots_2(robot_copy, x_dim, y_dim, 1)
    return 1

    for i in range(0, 11000):
        robot_copy = deepcopy(robots)
        for robot in robot_copy:
            robot.position_x, robot.position_y = calculate_new_position(robot, x_dim, y_dim, i)
        # print_robots_2(robot_copy, x_dim, y_dim, 3)
        # print(i)
        # time.sleep(0.5)
        positions = get_robot_positions(robot_copy)
        grouped_by_x = itertools.groupby(positions, lambda p: p[0])

        d = {k: list(v) for k, v in grouped_by_x}

        c = sum([1 for x in range(x_dim) if d.get(x, None) is None])

        if c > 10:
            print(i, c)
            print_robots(robot_copy, x_dim, y_dim, 5)


        grouped_by_y = itertools.groupby(positions, lambda p: p[1])

        d = {k: list(v) for k, v in grouped_by_y}

        c = sum([1 for y in range(y_dim) if d.get(y, None) is None])

        if c > 10:
            print(i, c)
            print_robots(robot_copy, x_dim, y_dim, 5)

        # first_quadrant, second_quadrant, third_quadrant, fourth_quadrant = count_positions_in_quadrants(robot_copy, x_dim,
        #                                                                                                 y_dim)
        # if 0 in [first_quadrant, second_quadrant, third_quadrant, fourth_quadrant]:
        #     print_robots(robot_copy, x_dim, y_dim)
        #     print(i)

    return 0

def calculate_new_position(robot: Robot, x_dim: int, y_dim: int, moves: int) -> tuple[int, int]:
    total_x_move = robot.move_x * moves
    total_y_move = robot.move_y * moves
    return (robot.position_x + total_x_move) % x_dim, (robot.position_y + total_y_move) % y_dim

def part_1(robots: list[Robot], x_dim: int, y_dim: int, moves: int):
    for i, robot in enumerate(robots):
        new_x, new_y = calculate_new_position(robot, x_dim, y_dim, moves)
        robot.position_x = new_x
        robot.position_y = new_y

    first_quadrant, second_quadrant, third_quadrant, fourth_quadrant = count_positions_in_quadrants(robots, x_dim, y_dim)

    print(first_quadrant, second_quadrant, third_quadrant, fourth_quadrant)
    return first_quadrant * second_quadrant * third_quadrant * fourth_quadrant


def count_positions_in_quadrants(robots, x_dim, y_dim):
    first_quadrant = 0
    second_quadrant = 0
    third_quadrant = 0
    fourth_quadrant = 0
    center_x = (x_dim - 1) / 2
    center_y = (y_dim - 1) / 2
    for final_x, final_y in get_robot_positions(robots):
        if final_x < center_x and final_y < center_y:
            first_quadrant += 1
        if final_x < center_x and final_y > center_y:
            third_quadrant += 1
        if final_x > center_x and final_y < center_y:
            second_quadrant += 1
        if final_x > center_x and final_y > center_y:
            fourth_quadrant += 1
    return first_quadrant, second_quadrant, third_quadrant, fourth_quadrant


def print_robots(robots: list[Robot], x_dim: int, y_dim: int, res: int = 1):
    positions_with_robots = get_robot_positions(robots)

    property_map: str = ""
    for y in range(0, y_dim, res):
        for x in range(0, x_dim, res):
            if (x, y) in positions_with_robots:
                property_map += str(positions_with_robots.count((x, y)))
            else:
                property_map += '.'
            if x >= x_dim - res:
                property_map += '\n'

    print(property_map)

def print_robots_2(robots: list[Robot], x_dim: int, y_dim: int, res: int = 1):
    positions_with_robots = get_robot_positions(robots)

    property_map: str = ""
    for y in range(0, y_dim, res):
        for x in range(0, x_dim, res):
            if (x, y) in positions_with_robots:
                property_map += '.' # str(positions_with_robots.count((x, y)))
            else:
                property_map += ' '
            if x >= x_dim - res:
                property_map += '\n'

    print(property_map)

def get_robot_positions(robots):
    positions_with_robots = list()
    for robot in robots:
        positions_with_robots.append((robot.position_x, robot.position_y))
    return positions_with_robots


def read_input(filename: str):
    robots = []
    lines = []
    with open(filename, 'r') as file:
        for line in file:
            lines.append(line.strip())

    for line in lines:
        parts = line.split()

        position_part = parts[0].split('=')[1]  # Get the 'x,y' part after 'p='
        x, y = map(int, position_part.split(','))

        # Extract the velocity values
        velocity_part = parts[1].strip().split('=')[1]  # Get the 'xv,yv' part after 'v='
        xv, yv = map(int, velocity_part.split(','))

        robots.append(Robot(x, y, xv, yv))

    return robots




