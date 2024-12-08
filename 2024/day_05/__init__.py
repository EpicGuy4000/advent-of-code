from typing import  Dict


def part_1(input: tuple[dict[int, list], list[list[int]]]) -> int:

    rules, updates = input
    result = 0
    for update in updates:
        success = True
        for key in rules.keys():
            if key in update:
                key_index = update.index(key)
                for rule in rules[key]:
                    if rule in update[key_index+1:]:
                        success = False
                        break
                if not success:
                    break

        if success:
            result += update[(len(update)//2)]

    return result

def part_1_miro(rules: dict[int, list[int]], updates: list[list[int]]) -> int:
    result = 0

    for update in updates:
        if get_offending_pair(rules, update) is None:
            result += update[(len(update)//2)]

    return result

def get_offending_pair(rules: dict[int, list[int]], update: list[int]) -> tuple[int, int] | None:
    blacklist = set[tuple[int, int]]()
    for page in update:
        for x, y in blacklist:
            if y == page:
                return x, y
        candidates = rules.get(page, [])
        for candidate in candidates:
            blacklist.add((page, candidate))

def part_2_miro(rules: dict[int, list[int]], updates: list[list[int]]) -> int:
    result = 0

    for update in updates:
        offending_pair = get_offending_pair(rules, update)
        if offending_pair is None:
            continue
        while offending_pair is not None:
            i = update.index(offending_pair[0])
            j = update.index(offending_pair[1])
            temp = update[i]
            update[i] = update[j]
            update[j] = temp
            offending_pair = get_offending_pair(rules, update)

        result += update[(len(update)//2)]

    return result


def read_input(filename:str):
    with open(filename, 'r') as file:
        input_data = file.read()

    sections = input_data.split("\n\n")
    hash_set_part = sections[0].splitlines()
    list_part = sections[1].splitlines()

    updates_list= [list(map(int, line.split(","))) for line in list_part]

    rules_dictionary = {}
    for row in hash_set_part:
        value, key = map(int, row.split("|"))
        if key not in rules_dictionary:
            rules_dictionary[key] = []
        rules_dictionary[key].append(value)

    return rules_dictionary, updates_list