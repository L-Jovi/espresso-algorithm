/*
 * LeetCode 7. Reverse Integer — https://leetcode.com/problems/reverse-integer/
 * Reverse the digits of a 32-bit signed integer; return 0 if the result does
 * not fit in 32 bits.
 *
 * Digit math with fixed-size integers: an int cannot hold the overflowing
 * value, so the check must happen before the multiplication. If result is
 * already larger than MAX_VALUE / 10 (or smaller than MIN_VALUE / 10),
 * result * 10 would overflow, so the answer is 0.
 *
 * Run it: java leetcode/0007-reverse-integer/DigitMath.java
 * Time: O(d) for d digits. Space: O(1).
 */

public class DigitMath {

    // The shape LeetCode expects.
    static class Solution {
        public int reverse(int x) {
            int result = 0;
            while (x != 0) {
                if (result > Integer.MAX_VALUE / 10 || result < Integer.MIN_VALUE / 10) {
                    return 0;
                }
                result = result * 10 + x % 10;
                x /= 10;
            }
            return result;
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
