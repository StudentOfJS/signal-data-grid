export function sort<T>(arr: T[], prop: keyof T, isDsc?: boolean): T[] {
  if (arr.length <= 1) {
    return arr;
  }
  const pivotIndex = Math.floor(arr.length / 2);
  const pivotValue = arr[pivotIndex][prop];
  const less: T[] = [];
  const greater: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) {
      continue;
    }
    const item = arr[i];
    const value = item[prop];
    if (isDsc ? value < pivotValue : value > pivotValue) {
      less.push(item);
    } else {
      greater.push(item);
    }
  }
  return [
    ...sort(less, prop, isDsc),
    arr[pivotIndex],
    ...sort(greater, prop, isDsc),
  ];
}
