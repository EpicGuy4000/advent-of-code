package org.enjakovic.day02;

import java.util.List;

public class AddInstruction implements IntcodeInstruction {
    @Override
    public void execute(List<Integer> codes, int startingPosition) {
        int aPosition = codes.get(startingPosition + 1);
        int bPosition = codes.get(startingPosition + 2);
        int cPosition = codes.get(startingPosition + 3);
        codes.set(cPosition, codes.get(aPosition) + codes.get(bPosition));
    }

    @Override
    public int operationLength() {
        return 4;
    }
}
