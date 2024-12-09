def part_1(input_values: list[tuple[int, list[int]]]) -> int:
    result = 0
    for wanted_result, available_values in input_values:
        if check_if_possible(wanted_result, available_values, 0, 0):
            result += wanted_result
            # print(result, wanted_result)
    return result

def check_if_possible(result: int, values: list[int], current_index: int, current_result: int) -> bool:
    if current_index == len(values):
        return current_result == result

    if current_result > result:
        return False

    return (check_if_possible(result, values, current_index + 1, current_result + values[current_index])
        or check_if_possible(result, values, current_index + 1, current_result * values[current_index])
            or check_if_possible(result, values, current_index + 1, int(str(current_result) + str(values[current_index]))))

def read_input(filename: str):
    result_set = list[tuple[int, list[int]]]()
    with open(filename, 'r') as file:
        for line in file:
            # Split the line into key and values
            key, values = line.strip().split(":")
            # Strip whitespace and convert the key to an integer
            key = int(key.strip())
            # Split values into a list of integers
            values_list = [int(value) for value in values.strip().split()]
            # Assign key-value pair to the dictionary
            result_set.append((key, values_list))
    return result_set