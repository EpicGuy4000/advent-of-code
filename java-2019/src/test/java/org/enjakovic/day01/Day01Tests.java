package org.enjakovic.day01;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.io.*;
import java.util.Objects;
import java.util.Scanner;

public class Day01Tests {

    @ParameterizedTest()
    @CsvSource(value = { "12:2", "14:2", "1969:654", "100756:33583" }, delimiter = ':')
    void test(int mass, int expectedFuel) {
        assertEquals(expectedFuel, new Module(mass).getRequiredFuel());
    }

    @Test()
    void puzzle() {
        File file = new File(Objects.requireNonNull(Day01Tests.class.getClassLoader().getResource("day01/input.txt")).getFile());
        long solution = 0;

        try (FileReader reader = new FileReader(file)) {
            try (Scanner sc = new Scanner(reader)) {
                while (sc.hasNext()) {
                    solution += new Module(Integer.parseInt(sc.nextLine())).getRequiredFuel();
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        System.out.printf("Day01-Part1 solution: %d%n", solution);
    }
}
