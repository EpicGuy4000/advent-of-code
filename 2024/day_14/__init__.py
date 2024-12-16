class Robot:
    def __init__(self, position_x: int, position_y: int, move_x: int, move_y: int):
        self.Position_x = position_x
        self.Position_y = position_y
        self.Move_x = move_x
        self.Move_y = move_y

    def __repr__(self):
        return f"{self.Position_x, self.Position_y}"

def part_1(Robots: list[Robot]):
    final_positions = []
    first_quadrant = 0
    second_quadrant = 0
    third_quadrant = 0
    fourth_quadrant = 0
    center_x = ((101 - 1 )/ 2)
    center_y = ((103 - 1)/ 2)

    for robot in Robots:
        #print(robot.Position_x, robot.Position_y,robot.Move_x, robot.Move_y)
        final_x = (robot.Position_x + (robot.Move_x * 100)) % 101
        final_y = (robot.Position_y + (robot.Move_y * 100)) % 103
        final_positions.append((final_x,final_y))
        print(robot, final_x, final_y)

    for final_x, final_y in final_positions:
        if final_x < center_x and final_y > center_y:
            first_quadrant += 1
        if final_x > center_x and final_y > center_y:
            second_quadrant += 1
        if final_x < center_x and final_y < center_y:
            third_quadrant += 1
        if final_x > center_x and final_y < center_y:
            fourth_quadrant += 1

    return first_quadrant * second_quadrant * third_quadrant * fourth_quadrant

def part_2(Robots: list[Robot]) -> int:
    seconds = 0
    christmas_tree = False

    first_quadrant = 0
    second_quadrant = 0
    third_quadrant = 0
    fourth_quadrant = 0

    center_x = ((101 - 1) / 2)
    center_y = ((103 - 1) / 2)

    while christmas_tree == False:
        for robot in Robots:
            # print(robot.Position_x, robot.Position_y,robot.Move_x, robot.Move_y)
            if robot.Move_x + robot.Position_x > 101:
                robot.Position_x =robot.Position_x + robot.Move_x - 101
            else:
                robot.Position_x +=robot.Move_x

            if robot.Move_y + robot.Position_y > 103:
                robot.Position_x =robot.Position_x + robot.Move_x - 103
            else:
                robot.Position_x +=robot.Move_x



            for robot in Robots:
                if robot.Position_x < center_x and robot.Position_y > center_y:
                    first_quadrant += 1
                if robot.Position_x > center_x and robot.Position_y > center_y:
                    second_quadrant += 1
                if robot.Position_x < center_x and robot.Position_y < center_y:
                    third_quadrant += 1
                if robot.Position_x > center_x and robot.Position_y < center_y:
                    fourth_quadrant += 1

            seconds += 1
            if first_quadrant == seconds and third_quadrant == fourth_quadrant:
                christmas_tree = True

            if seconds % 100 == 0:
                print(seconds)

    return seconds

def check_christmat_tree(Robots: list[Robot]) -> bool:

    return false
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




