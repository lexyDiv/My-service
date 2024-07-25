import { reservProg } from "../../../../../../Calendars/reserv";
import { getDateFormat } from "./getDateFormat";
import { isDateReserved } from "./isDateReserved";
import { isReservedInterval } from "./isReservedInterval";

export const change = (e, reserves, selectedDates, setSelectedDates) => {
  console.log(getDateFormat(e[0]));
  const isDayReserved = isDateReserved(getDateFormat(e[0]), reserves);

  if (!isDayReserved) {
    if (!selectedDates.length) {
      reservProg(setSelectedDates, e[0]);
    } else {
      if (
        (!isReservedInterval(selectedDates[0], e[0], reserves) ||
          getDateFormat(selectedDates[0]) === getDateFormat(e[0])) &&
        selectedDates[0] <= e[0]
      ) {
        reservProg(setSelectedDates, e[0]);
      }
    }
  }
};
