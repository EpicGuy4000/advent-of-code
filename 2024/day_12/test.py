from unittest import TestCase

from day_12 import part_2, part_1_miro, read_input

class Test(TestCase):
    def test_part_1(self):
        self.assertEqual(1930, part_1_miro(read_input('test_input.txt')))
    def test_part_1_small(self):
        self.assertEqual(140, part_1_miro(read_input('test_input_small.txt')))
    def test_part_1_medium(self):
        self.assertEqual(772, part_1_miro(read_input('test_input_medium.txt')))
    def test_part_2(self):
        self.assertEqual(1206, part_2(read_input('test_input.txt')))
    def test_check_part_1(self):
        print("part 1", part_1_miro(read_input('input.txt')))
    def test_check_part_2(self):
        print("part 2", part_2(read_input('input.txt')))

