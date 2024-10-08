package org.enjakovic.day02;

import java.util.*;
import java.util.stream.Collectors;

public class Intcode {
    private final List<Integer> codes;
    private final Map<Integer, IntcodeInstruction> instructionMap;

    public Intcode(String codes) {
        this.codes = Arrays.stream(codes.split(",")).map(Integer::parseInt).collect(Collectors.toCollection(ArrayList::new));
        this.instructionMap = new HashMap<>();
        instructionMap.put(1, new AddInstruction());
        instructionMap.put(2, new MultiplicationInstruction());
    }

    public void Run() {
        for (int instructionPointer = 0; instructionPointer < codes.size();) {
            int opCode = codes.get(instructionPointer);
            if (opCode == 99) break;

            var instruction = instructionMap.get(opCode);
            instruction.execute(this.codes, instructionPointer);
            instructionPointer += instruction.operationLength();
        }
    }

    public int Peek(int position) {
        return codes.get(position);
    }

    public void Replace(int position, int value) {
        codes.set(position, value);
    }
}
