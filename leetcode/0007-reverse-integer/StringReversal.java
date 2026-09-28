class Solution {
    public int reverse(int x) {
        boolean isNegative = false;
        if (x < 0) {
            isNegative = true;
        }

        x = Math.abs(x);

        String str = Integer.toString(x);
        String reverse = new StringBuilder(str).reverse().toString();
        int result = Integer.parseInt(reverse);

        if (result > Integer.MAX_VALUE) {
            return 0;
        }

        if (isNegative) {
            return result * -1;
        }

        return result;
    }
}
