const shakerSort = (array) => {
  const swap = (arr, i, j) => {
    const tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
  };

  const len = array.length
  for (let i = 0; i < len; i++) {
    for (let j = 1; j < len - i; j++) {
      if (array[j-1] > array[j]) {
        swap(array, j, j-1);
      }
    }

    for (let k = len - i - 1; k > i; k--) {
      if (array[k] < array[k-1]) {
        swap(array, k, k-1);
      }
    }
  }

  console.log(array);
}

let array = [45, 19, 77, 81, 13, 28, 18, 19, 77];
shakerSort(array);
