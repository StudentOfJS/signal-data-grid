export function sort<T>(arr: T[], prop: keyof T, isDsc?: boolean): T[] {
  return [...arr].sort((a, b) => {
    if (a[prop] < b[prop]) {
      return isDsc ? 1 : -1;
    }
    if (a[prop] > b[prop]) {
      return isDsc ? -1 : 1;
    }
    return 0;
  });
}
