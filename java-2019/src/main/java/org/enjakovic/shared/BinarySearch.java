package org.enjakovic.shared;

import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

public class BinarySearch {
    public static <TSource, TElement extends Comparable<TElement>> int exact(List<TSource> collection, Function<TSource, TElement> valueExtractor, TElement target) {
        int low = 0;
        int high = collection.size() - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            int comparisonResult = valueExtractor.apply(collection.get(mid)).compareTo(target);

            if (comparisonResult == 0) {
                return mid;
            } else if (comparisonResult < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }

    public static <T extends Comparable<T>> int exact(List<T> collection, T target) {
        return exact(collection, x -> x, target);
    }

    public static int exact(int[] array, int value) {
        return exact(Arrays.stream(array).boxed().toList(), value);
    }

    public static <TSource, TElement extends Comparable<TElement>> int firstLessOrEqual(List<TSource> collection, Function<TSource, TElement> valueExtractor, TElement target) {
        int low = 0;
        int high = collection.size() - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            int comparisonResult = valueExtractor.apply(collection.get(mid)).compareTo(target);

            if (comparisonResult < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        if (low > collection.size() - 1) return collection.size() - 1;
        if (valueExtractor.apply(collection.get(low)).compareTo(target) == 0) return low;
        return low - 1;
    }

    public static <TElement extends Comparable<TElement>> int firstLessOrEqual(List<TElement> collection, TElement target) {
        return firstLessOrEqual(collection, x -> x, target);
    }

    public static int firstLessOrEqual(int[] array, int value) {
        return firstLessOrEqual(Arrays.stream(array).boxed().toList(), value);
    }

    public static <TSource, TElement extends Comparable<TElement>> int firstGreaterOrEqual(List<TSource> collection, Function<TSource, TElement> valueExtractor, TElement target) {
        int low = 0;
        int high = collection.size() - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            int comparisonResult = valueExtractor.apply(collection.get(mid)).compareTo(target);

            if (comparisonResult <= 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        if (low == -1) return 0;
        if (low > collection.size() - 1 && valueExtractor.apply(collection.get(high)).compareTo(target) != 0) return -1;

        if (high > -1 && valueExtractor.apply(collection.get(high)).compareTo(target) == 0) return high;

        return low;
    }

    public static <TElement extends Comparable<TElement>> int firstGreaterOrEqual(List<TElement> collection, TElement target) {
        return firstGreaterOrEqual(collection, x -> x, target);
    }

    public static int firstGreaterOrEqual(int[] array, int value) {
        return firstGreaterOrEqual(Arrays.stream(array).boxed().toList(), value);
    }
}
