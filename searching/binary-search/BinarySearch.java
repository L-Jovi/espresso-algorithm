/*
 * Binary search in a sorted int array, the same algorithm as binary-search.js.
 *
 * Run it without compiling first (Java 11 or newer):
 *
 *     java searching/binary-search/BinarySearch.java
 *
 * main() checks the method against a linear scan on many random arrays and
 * exits with status 1 if any answer is wrong.
 *
 * Time: O(log n). Space: O(1).
 */

import java.util.Arrays;
import java.util.Random;

public class BinarySearch {

    /** Returns an index of key in the sorted array a, or -1 when it is absent. */
    static int indexOf(int[] a, int key) {
        int lo = 0;
        int hi = a.length - 1;
        while (lo <= hi) {
            // lo + (hi - lo) / 2 cannot overflow, unlike (lo + hi) / 2 for large arrays.
            int mid = lo + (hi - lo) / 2;
            if (a[mid] < key) {
                lo = mid + 1;
            } else if (a[mid] > key) {
                hi = mid - 1;
            } else {
                return mid;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] sorted = {10, 11, 12, 16, 18, 23, 29, 33, 48, 54, 57, 68, 77, 84, 98};
        System.out.println("indexOf(23) = " + indexOf(sorted, 23));
        System.out.println("indexOf(50) = " + indexOf(sorted, 50));

        Random random = new Random(2026);
        for (int round = 0; round < 10_000; round++) {
            int[] a = random.ints(random.nextInt(40), -50, 50).sorted().toArray();
            int key = random.nextInt(110) - 55;
            int found = indexOf(a, key);
            boolean present = Arrays.stream(a).anyMatch(x -> x == key);
            boolean correct = present ? found >= 0 && a[found] == key : found == -1;
            if (!correct) {
                System.err.println("Wrong answer for key " + key + " in " + Arrays.toString(a));
                System.exit(1);
            }
        }
        System.out.println("10,000 random checks passed.");
    }
}
