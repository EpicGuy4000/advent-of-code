def part_one():
    list_one, list_two = read_input()

    list_one.sort()
    list_two.sort()

    output = 0

    for (a, b) in zip(list_one, list_two):
        output += abs(a - b)

    print(output)


def part_two():
    list_one, list_two = read_input()

    counter = {}
    for key in list_one:
        counter[key] = 0
    for key in list_two:
        if counter.get(key, None) is not None:
            counter[key] += 1

    output = 0

    for (key, value) in counter.items():
        if value is not None:
            output += value * key

    print(output)


def read_input():
    list_one = []
    list_two = []
    with open('input.txt', 'r') as file:
        # Read each line in the file
        for line in file:
            temp = line.strip().split("   ")
            list_one.append(int(temp[0]))
            list_two.append(int(temp[1]))
    return list_one, list_two

part_two()