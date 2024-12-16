from unittest import TestCase

from day_14_miro import part_1, part_2, read_input, Robot


class Test(TestCase):
    def test_part_1_no_move(self):
        self.assertEqual(0, part_1([ Robot(0, 0, 0, 0)], 10, 10, 100))
    def test_part_1(self):
        self.assertEqual(12, part_1(read_input('test_input.txt'), 11, 7, 100))
    def test_check_part_1(self):
        print("part 1", part_1(read_input('input.txt'), 101, 103, 100))
    def test_check_part_2(self):
        print("part 2", part_2(read_input('input.txt'), 101, 103))


