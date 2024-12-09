from unittest import TestCase

from day_08 import part_1, part_2, read_input

class Test(TestCase):
    def test_part_1_small(self):
        self.assertEqual(4, part_1(read_input('test_input_small.txt')))
    def test_part_1_large(self):
        self.assertEqual(14, part_1(read_input('test_input_large.txt')))
    def test_check_part_1(self):
        print("part 1", part_1(read_input('input.txt')))
    def test_part_2_large(self):
        self.assertEqual(34, part_2(read_input('test_input_large.txt')))
    def test_check_part_2(self):
        print("part 2", part_2(read_input('input.txt')))

