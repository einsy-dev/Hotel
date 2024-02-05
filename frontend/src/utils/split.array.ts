export default function splitArr(
  arr: Array<any>,
  n: number,
  initialArr: Array<any>
) {
  const newArr = [initialArr];
  for (let i = 0; i < arr.length; i += n) {
    newArr.push(arr.slice(i, i + n));
  }
  if ((newArr.length - 1) % n) {
    newArr[newArr.length - 1] = newArr[newArr.length - 1].concat(
      new Array(n - newArr[newArr.length - 1].length).fill("")
    );
  }
  return newArr;
}
