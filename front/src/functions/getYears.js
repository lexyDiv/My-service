export function getYears(startYear) {
  const currentYear = new Date().getFullYear();
  const arr = [];
  for (let i = startYear; i <= currentYear; i++) {
    arr.unshift(i);
  }
  return arr;
}
