package org.enjakovic.day01;

public record Module(int mass) {
    public int getRequiredFuel() {
        int unpropeledFuel = getFuelForMass(mass);
        int totalFuelNeeded = unpropeledFuel;

        while (unpropeledFuel > 0) {
            unpropeledFuel = getFuelForMass(unpropeledFuel);

            if (unpropeledFuel > 0) {
                totalFuelNeeded += unpropeledFuel;
            }
        }

        return totalFuelNeeded;
    }

    private static int getFuelForMass(int mass) {
        double step1 = mass / 3.0;
        int step2 = (int)Math.floor(step1);
        return step2 - 2;
    }
}
