package org.enjakovic.day02;

import org.enjakovic.shared.BinarySearch;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Objects;
import java.util.Scanner;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class Day02Tests {
    @ParameterizedTest()
    @CsvSource(value = { "1,9,10,3,2,3,11,0,99,30,40,50:3500" }, delimiter = ':')
    void test(String input, int expectedValueAtPosition0) {
        var intcode = new Intcode(input);
        intcode.Run();

        assertEquals(expectedValueAtPosition0, intcode.Peek(0));
    }

    @Test()
    void partOne() {
        File file = new File(Objects.requireNonNull(Day02Tests.class.getClassLoader().getResource("day02/input.txt")).getFile());
        int solution;

        try (FileReader reader = new FileReader(file)) {
            try (Scanner sc = new Scanner(reader)) {
                var intcode = new Intcode(sc.nextLine());
                intcode.Replace(1, 12);
                intcode.Replace(2, 2);
                intcode.Run();
                solution = intcode.Peek(0);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        System.out.printf("Day02-Part1 solution: %d%n", solution);
    }

    @Test()
    void partTwo() {
        File file = new File(Objects.requireNonNull(Day02Tests.class.getClassLoader().getResource("day02/input.txt")).getFile());
        String input;

        try (FileReader reader = new FileReader(file)) {
            try (Scanner sc = new Scanner(reader)) {
                input = sc.nextLine();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        int foundNoun = 0;
        int foundVerb = 0;

        for (int noun = 0; noun < 100; noun++) {
            int finalNoun = noun;
            foundVerb = BinarySearch.exact(IntStream.range(0, 100).boxed().toList(), verbCandidate -> {
                var intcode = new Intcode(input);
                intcode.Replace(1, finalNoun);
                intcode.Replace(2, verbCandidate);
                intcode.Run();
                return intcode.Peek(0);
            }, 19690720);

            if (foundVerb != -1) {
                foundNoun = finalNoun;
                break;
            }
        }

        System.out.printf("Day02-Part2 solution: %d%n", 100 * foundNoun + foundVerb);
    }
}
