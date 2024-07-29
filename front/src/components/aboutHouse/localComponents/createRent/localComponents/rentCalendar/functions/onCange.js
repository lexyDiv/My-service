import { reservProg } from "./classReserv";
import { getDateFormat } from "./getDateFormat";
import { isDateReserved } from "./isDateReserved";
import { isReservedInterval } from "./isReservedInterval";

export const change = (e, reservesDB, selectedDates, setSelectedDates) => {
 // console.log(getDateFormat(e[0]));
 //console.log("here = ", new Date(e[0]).getTime())
  const isDayReserved = isDateReserved(new Date(e[0]).getTime(), reservesDB);

  if (!isDayReserved) {
    if (!selectedDates.length) {
      reservProg(setSelectedDates, e[0]);
    } else {
      if (
        (!isReservedInterval(selectedDates[0], e[0], reservesDB) ||
          getDateFormat(selectedDates[0]) === getDateFormat(e[0])) &&
        selectedDates[0] <= e[0]
      ) {
        reservProg(setSelectedDates, e[0]);
      }
    }
  }
};
