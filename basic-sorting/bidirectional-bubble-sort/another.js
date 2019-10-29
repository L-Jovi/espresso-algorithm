function shakerSort(array) {
    function swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    var length = array.length,
        left = 0,
        right = length - 1,
        lastSwappedLeft = left,
        lastSwappedRight = right,
        i,
        j;
    while (left < right) {
        // 从左到右
        lastSwappedRight = 0;
        for (i = left; i < right; i++) {
            if (array[i] > array[i + 1]) {
                swap(array, i, i + 1);
                lastSwappedRight = i;
            }
        }
        right = lastSwappedRight;
        // 从右到左
        lastSwappedLeft = length - 1;
        for (j = right; left < j; j--) {
            if (array[j - 1] > array[j]) {
                swap(array, j - 1, j)
                lastSwappedLeft = j
            }
        }
        left = lastSwappedLeft;
    }
}

let array = [ 13, 18, 19, 19, 28, 45, 77, 77, 81 ];
shakerSort(array);
console.log(array);
