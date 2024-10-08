package org.enjakovic.day02;

import java.util.List;

public interface IntcodeInstruction {
    void execute(List<Integer> codes, int startingPosition);
    int operationLength();
}
