from unittest import TestCase

from day_05 import part_1, part_1_miro, part_2_miro, read_input

class Test(TestCase):
    def test_check_part_1(self):
        print("part 1", part_1(read_input('input.txt')))
    def test_check_part_1_miro(self):
        rules, updates = read_input('input.txt')
        print("part 1 miro", part_1_miro(rules, updates))
    def test_check_part_2_miro(self):
        rules, updates = read_input('input.txt')
        print("part 2 miro", part_2_miro(rules, updates))

