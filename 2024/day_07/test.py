from unittest import TestCase

from day_07 import part_1, read_input

class Test(TestCase):
    def test_part_1(self):
        self.assertEqual(3749, part_1(read_input('test_input.txt')))
    def test_check_part_1(self):
        print("part 1", part_1(read_input('input.txt')))
