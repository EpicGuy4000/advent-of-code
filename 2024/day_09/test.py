from unittest import TestCase

from day_09 import part_1, part_2, read_input

class Test(TestCase):
    def test_part_1(self):
        self.assertEqual(1928, part_1(read_input('test_input.txt')))
    def test_part_2(self):
        self.assertEqual(2858, part_2(read_input('test_input.txt')))
    def test_check_part_1(self):
        print("part 1", part_1(read_input('input.txt')))

    def test_check_part_1_large(self):
        print("part 1", part_1(read_input('large_test_input.txt')))
    def test_check_part_2(self):
        print("part 2", part_2(read_input('input.txt')))

