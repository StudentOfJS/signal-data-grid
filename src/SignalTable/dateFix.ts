export function datefix(dateString: string) {
  let d = new Date(dateString);
  d = new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
  return d.toISOString().split('T')[0];
}
