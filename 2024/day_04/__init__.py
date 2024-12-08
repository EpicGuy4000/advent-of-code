import re
from typing import Callable, Tuple


def part_1_miro(puzzle: list[str]) -> int:
    counter = 0
    search_word = 'XMAS'

    for i in range(len(puzzle)):
        for j in range(len(puzzle[i])):
            # L -> R
            if search(search_word, puzzle, i, j, lambda x, y: (x, y + 1)):
                counter += 1
            # R -> L
            if search(search_word, puzzle, i, j, lambda x, y: (x, y - 1)):
                counter += 1
            # U -> D
            if search(search_word, puzzle, i, j, lambda x, y: (x + 1, y)):
                counter += 1
            # D -> U
            if search(search_word, puzzle, i, j, lambda x, y: (x - 1, y)):
                counter += 1
            # Primary diagonal
            if search(search_word, puzzle, i, j, lambda x, y: (x + 1, y + 1)):
                counter += 1
            # Secondary diagonal
            if search(search_word, puzzle, i, j, lambda x, y: (x - 1, y + 1)):
                counter += 1
            # Reverse primary diagonal
            if search(search_word, puzzle, i, j, lambda x, y: (x - 1, y - 1)):
                counter += 1
            # Reverse secondary diagonal
            if search(search_word, puzzle, i, j, lambda x, y: (x + 1, y - 1)):
                counter += 1
    return counter


def part_2_miro(puzzle: list[str]) -> int:
    counter = 0
    search_word = 'MAS'

    for i in range(len(puzzle)):
        for j in range(len(puzzle[i])):
            temp_counter = 0
            # Primary diagonal
            if search(search_word, puzzle, i - 1, j - 1, lambda x, y: (x + 1, y + 1)):
                temp_counter += 1
            # Secondary diagonal
            if search(search_word, puzzle, i + 1, j - 1, lambda x, y: (x - 1, y + 1)):
                temp_counter += 1
            # Reverse primary diagonal
            if search(search_word, puzzle, i + 1, j + 1, lambda x, y: (x - 1, y - 1)):
                temp_counter += 1
            # Reverse secondary diagonal
            if search(search_word, puzzle, i - 1, j + 1, lambda x, y: (x + 1, y - 1)):
                temp_counter += 1

            if temp_counter == 2:
                counter += 1
    return counter


def search(target: str, puzzle: list[str], i: int, j: int, incrementer: Callable[[int, int], Tuple[int, int]]) -> bool:
    for index in range(len(target)):
        if i < 0 or j < 0 or i >= len(puzzle) or j >= len(puzzle[i]):
            return False

        if target[index] != puzzle[i][j]:
            return False

        if index == len(target) - 1:
            return True

        i, j = incrementer(i, j)


def part_1(puzzle: list[str]) -> int:

    search_word="XMAS"
    counter = 0

    pattern = r"XMAS"
    reverse_pattern = r"SAMX"

    for string in puzzle:
        matches = re.findall(pattern, string)
        print("found L->R", len(matches))
        counter += len(matches)

    for string in puzzle:
        matches = re.findall(reverse_pattern, string)
        print("found R->L", len(matches))
        counter += len(matches)

    reversed_list = list(reversed(puzzle))
    for i in range(len(puzzle) - 3):
        print("i", i, puzzle[i])
        for j in range(len(puzzle[i])):
            print("checking", i, j, puzzle[i][j], reversed_list[i][j])
            if puzzle[i][j] == 'X':
                char_list_downwards_lr_search = [puzzle[i][j],puzzle[i+1][j],puzzle[i+2][j],puzzle[i+3][j]]
                result_downwards_lr = ''.join(char_list_downwards_lr_search)
                #print('potential U->D', result_downwards)
                if result_downwards_lr == search_word:
                    counter += 1



                if j < (len(puzzle[i]) - 3):
                    char_list_downwards_diagonal_search = [puzzle[i][j], puzzle[i + 1][j + 1], puzzle[i + 2][j + 2], puzzle[i + 3][j + 3]]
                    result_downwards_diagonal = ''.join(char_list_downwards_diagonal_search)
                    if result_downwards_diagonal == search_word:
                        counter += 1

            char_list_downwards_lr_search = [puzzle[len(puzzle) - i][j], puzzle[len(puzzle) - i - 1][j], puzzle[len(puzzle) - i - 2][j], puzzle[len(puzzle) - i + 3][j]]
            result_downwards_lr = ''.join(char_list_downwards_lr_search)
            # print('potential U->D', result_downwards)
            if result_downwards_lr == search_word:
                counter += 1

            if reversed_list[i][j] == 'X':
                char_list_upwards_search = [reversed_list[i][j], reversed_list[i + 1][j], reversed_list[i + 2][j], reversed_list[i + 3][j]]
                result_upwards = ''.join(char_list_upwards_search)
               # print('potential D->U', result_upwards)
                if result_upwards == search_word:
                    counter += 1

                if j < (len(reversed_list[i]) - 3):
                    char_list_upwards_diagonal_search = [reversed_list[i][j], reversed_list[i + 1][j + 1], reversed_list[i + 2][j + 2], reversed_list[i + 3][j + 3]]
                    result_upwards_diagonal = ''.join(char_list_upwards_diagonal_search)
                    if result_upwards_diagonal == search_word:
                        counter += 1



    print(counter)
    return counter



def read_input(filename: str) -> list[str]:
    puzzle=[]
    with open(filename, 'r') as file:
        for line in file:
            puzzle.append(line.strip())
    return puzzle