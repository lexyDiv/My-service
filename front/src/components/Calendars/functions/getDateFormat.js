// const monthses = {
//   Jan: "01",
//   Fri: "02",
//   Mar: "03",
//   Apr: "04",
//   May: "05",
//   Jun: "06",
//   Jul: "07",
//   Aug: "08",
//   Sep: "09",
//   Oct: "10",
//   Nov: "11",
//   Dec: "12",
// };

export function getDateFormat(date) {
  
 const monthData = String(date.getMonth() + 1);
 const dayData = String(date.getDate());
 const year = String(date.getFullYear());
 const month = monthData.length === 2 ? monthData : "0" + monthData;
 const day = dayData.length === 2 ? dayData : "0" + dayData;
 
return day + "." + month + "." + year;
 
}
