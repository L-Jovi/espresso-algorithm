for (i = 1; i < 10; i++) {
  let str = '';
  for (j = 1; j <= i; j++) {
    str += j + ' * ' + i + ' = ' + j * i + '  '
  }
  console.log(str);
}
