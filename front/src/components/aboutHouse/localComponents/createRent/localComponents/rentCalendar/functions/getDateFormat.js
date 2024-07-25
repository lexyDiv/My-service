export function getDateFormat(date) {
  const monthData = String(date.getMonth() + 1);
  const dayData = String(date.getDate());
  const year = String(date.getFullYear());
  const month = monthData.length === 2 ? monthData : "0" + monthData;
  const day = dayData.length === 2 ? dayData : "0" + dayData;

  return day + "." + month + "." + year;
}
