/*
 * LeetCode 7. Reverse Integer — https://leetcode.com/problems/reverse-integer/
 * Reverse the digits of a 32-bit signed integer; return 0 if the result does
 * not fit in 32 bits.
 *
 * String reversal in Java: reverse the digits with StringBuilder and parse
 * them as a long, which holds any reversed 32-bit value, then check the
 * range. Parsing straight into an int, as the first version did, throws
 * NumberFormatException for results such as 9646324351, and Math.abs of
 * Integer.MIN_VALUE is still negative, so the sign is taken separately.
 *
 * Run it: java leetcode/0007-reverse-integer/StringReversal.java
 * Time: O(d) for d digits. Space: O(d).
 */

public class StringReversal {

    // The shape LeetCode expects.
    static class Solution {
        public int reverse(int x) {
            String digits = Long.toString(Math.abs((long) x));
            long result = Long.parseLong(new StringBuilder(digits).reverse().toString());
            if (x < 0) {
                result = -result;
            }
            return result > Integer.MAX_VALUE || result < Integer.MIN_VALUE ? 0 : (int) result;
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[][] cases = {
            {123, 321}, {-123, -321}, {120, 21}, {0, 0},
            {1534236469, 0}, {Integer.MAX_VALUE, 0}, {Integer.MIN_VALUE, 0}, {1463847412, 2147483641},
        };
        for (int[] c : cases) {
            int actual = solution.reverse(c[0]);
            if (actual != c[1]) {
                System.err.println("reverse(" + c[0] + ") = " + actual + ", expected " + c[1]);
                System.exit(1);
            }
        }
        System.out.println("reverse(-123) = " + solution.reverse(-123) + "; " + cases.length + " cases passed.");
    }
}
