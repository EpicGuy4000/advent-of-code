from traceback import format_exc


def part_1(input: str) -> int:
    memory_view = format_memory(input)
    #print(memory_view)
    sorted_memory = sort_memory(memory_view)
   # print(sorted_memory)
    result = 0

    for i,num in enumerate(sorted_memory):
        result += num * i


    return result

def part_2(input: str) -> int:
    memory_view = format_memory(input)
    # print(memory_view)
    sorted_memory = sort_memory_2(memory_view)
    # print(sorted_memory)
    result = 0

    for i, num in enumerate(sorted_memory):
        if num != -1:
            result += num * i

    return result
def sort_memory_2(unsorted_memory: list[int]) -> list[int]:
    sorted_memory = unsorted_memory.copy()
    j = len(sorted_memory)-1

    while j >= 0:
        if unsorted_memory[j] == -1:
            j -= 1
        else:
            file_blocks = unsorted_memory.count(unsorted_memory[j])
            free_blocks = 0
            ending_position_free_blocks = -1
            for i in range(len(sorted_memory)):
                if i >= j:
                    break
                if sorted_memory[i] == -1:
                    free_blocks += 1
                    ending_position_free_blocks  = i
                    if free_blocks == file_blocks:
                        break
                else:
                    free_blocks = 0
                    ending_position_free_blocks = -1
            if free_blocks == file_blocks:
                while free_blocks > 0:
                    sorted_memory[ending_position_free_blocks] = unsorted_memory[j]
                    free_blocks -= 1
                    ending_position_free_blocks -= 1
                    sorted_memory[j] = -1
                    j -= 1
            else:
                j -= file_blocks

    return sorted_memory

def sort_memory(unsorted_memory: list[int]) -> list[int]:
    sorted_memory=[]
    j = len(unsorted_memory) - 1

    for i in range(len(unsorted_memory)):
        if i > j:
            break
        if i == j and unsorted_memory[i] == -1:
            break

        if unsorted_memory[i] != -1:
            sorted_memory.append(unsorted_memory[i])
        else:
            while unsorted_memory[j] == -1:
                j -= 1

            sorted_memory.append(unsorted_memory[j])
            j -= 1

    return sorted_memory

def format_memory(memory: str) -> list[int]:
    formated_memory = []
    char_counter = -1
    for i in range(len(memory)):
        block = int(memory[i])
        if i % 2 == 0:
            char_counter += 1
            data = char_counter
        else:
            data = -1
        while block > 0:
            formated_memory.append(data)
            block -= 1
    return  formated_memory

def read_input(filename: str) -> str:
    with open(filename, 'r') as file:
        for line in file:
            temp = line.strip()
    return temp