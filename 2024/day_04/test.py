from unittest import TestCase

from day_04 import part_1, part_1_miro, part_2_miro, read_input

class Test(TestCase):
    def test_part_1_small(self):
        self.assertEqual(4, part_1(read_input('test_input_small.txt')))
    def test_part_1_large(self):
        self.assertEqual(18, part_1(read_input('test_input_large.txt')))
    def test_part_1_miro_small(self):
        self.assertEqual(4, part_1_miro(read_input('test_input_small.txt')))
    def test_part_1_miro_large(self):
        self.assertEqual(18, part_1_miro(read_input('test_input_large.txt')))
    def test_check_part_1(self):
        print("part 1", part_1(read_input('input.txt')))
    def test_check_part_1_miro(self):
        print("part 1", part_1_miro(read_input('input.txt')))
    def test_part_2_miro_large(self):
        self.assertEqual(9, part_2_miro(read_input('test_input_large.txt')))
    def test_check_part_2_miro(self):
        print("part 2", part_2_miro(read_input('input.txt')))

