package org.enjakovic.shared;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.util.stream.IntStream;

public class BinarySearchTests {

    @ParameterizedTest
    @CsvSource(value = { "7:3", "1:0", "51: 25", "101:50", "50:-1" }, delimiter = ':')
    public void ExactNumberTests(int number, int expectedIndex) {
        int[] numbers = IntStream.rangeClosed(0, 50).map(i -> i * 2 + 1).toArray();

        assertEquals(expectedIndex, BinarySearch.exact(numbers, number));
    }

    @ParameterizedTest
    @CsvSource(value = { "6:2", "0:-1", "50:24", "100:49" }, delimiter = ':')
    public void LessThenTest(int number, int expectedIndex) {
        int[] numbers = IntStream.rangeClosed(0, 50).map(i -> i * 2 + 1).toArray();

        assertEquals(expectedIndex, BinarySearch.firstLessOrEqual(numbers, number));
    }

    @ParameterizedTest
    @CsvSource(value = { "6:3", "0:0", "50:25", "100:50", "200:-1" }, delimiter = ':')
    public void GreaterThenTest(int number, int expectedIndex) {
        int[] numbers = IntStream.rangeClosed(0, 50).map(i -> i * 2 + 1).toArray();

        assertEquals(expectedIndex, BinarySearch.firstGreaterOrEqual(numbers, number));
    }

    @Test
    public void FirstEqualTest() {
        int[] numbers = { 0, 1, 1, 2, 2, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5};

        assertEquals(0, BinarySearch.firstLessOrEqual(numbers, 0));
        assertEquals(1, BinarySearch.firstLessOrEqual(numbers, 1));
        assertEquals(3, BinarySearch.firstLessOrEqual(numbers, 2));
        assertEquals(6, BinarySearch.firstLessOrEqual(numbers, 3));
        assertEquals(7, BinarySearch.firstLessOrEqual(numbers, 4));
        assertEquals(8, BinarySearch.firstLessOrEqual(numbers, 5));
    }

    @Test
    public void LastEqualTest() {
        int[] numbers = { 0, 1, 1, 2, 2, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5};

        assertEquals(0, BinarySearch.firstGreaterOrEqual(numbers, 0));
        assertEquals(2, BinarySearch.firstGreaterOrEqual(numbers, 1));
        assertEquals(5, BinarySearch.firstGreaterOrEqual(numbers, 2));
        assertEquals(6, BinarySearch.firstGreaterOrEqual(numbers, 3));
        assertEquals(7, BinarySearch.firstGreaterOrEqual(numbers, 4));
        assertEquals(14, BinarySearch.firstGreaterOrEqual(numbers, 5));
    }
}
