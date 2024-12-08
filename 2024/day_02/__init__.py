def part_1(reports: list[list[int]]) -> int:
    safe_counter = 0

    for report in reports:
        safe = True
        direction = report[1] > report[0]
        prev_level = report[0]
        for level in report[1::]:
            diff = abs(level - prev_level)
            if (level > prev_level) != direction or diff > 3 or diff < 1:
                safe = False
                break
            prev_level = level
        if safe:
            safe_counter += 1

    return safe_counter

def part_2(reports: list[list[int]]) -> int:
    safe_counter = 0

    for report in reports:
        safe = True
        dampener_counter = 1
        if (report[1] != report[0]):
            direction = report[1] > report[0]
        else:
            direction = report[2] > report[0]
        prev_level = report[0]
        for level in report[1::]:
            diff = abs(level - prev_level)
            if (level > prev_level) != direction or diff > 3 or diff < 1:
                dampener_counter -= 1
                if dampener_counter < 0:
                    #print("prva vrednost", level, prev_level,report, dampener_counter,direction)
                    safe = False
                    break
            else:
                prev_level = level

        if not safe:
            prev_level = report[-1]
            if report[-2] != report[-1]:
                direction = report[-2] > report[-1]
            else:
                direction = report[-3] > report[-1]
            dampener_counter = 1
            safe = True
            print(report[-1:0:-1])
            for level in list(reversed(report))[1::]:
                diff = abs(level - prev_level)
                if (level > prev_level) != direction or diff > 3 or diff < 1:
                    dampener_counter -= 1
                    if dampener_counter < 0:
                        safe = False
                        break
                else:
                    prev_level = level
        if safe:
            safe_counter += 1
        else:
            print(report)

    return safe_counter

def read_input(filename: str) -> list[list[int]]:
    reports = list()

    with open(filename, 'r') as file:
        for line in file:
            temp = line.strip().split(" ")
            reports.append(list(int(x) for x in temp))
    return reports