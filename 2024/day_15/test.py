from unittest import TestCase

from day_15 import part_1, read_input, read_input_part_2


class Test(TestCase):
    def test_part_1_small(self):
        tiles, directions = read_input('test_input_small.txt')
        self.assertEqual(2028, part_1(tiles, directions))
    def test_part_1_large(self):
        tiles, directions = read_input('test_input.txt')
        self.assertEqual(10092, part_1(tiles, directions))
    def test_check_part_1(self):
        tiles, directions = read_input('input.txt')
        print("part 1", part_1(tiles, directions))
    def test_part_2_large(self):
        tiles, directions = read_input_part_2('test_input.txt')
        self.assertEqual(9021, part_1(tiles, directions))
    def test_check_part_2(self):
        tiles, directions = read_input_part_2('input.txt')
        print("part 2", part_1(tiles, directions))


