import { getDateFormat } from "../../../../../../Calendars/functions/getDateFormat";
import { isDateResved } from "../../../../../../Calendars/functions/isDateReserved";
import { isReservedInterval } from "../../../../../../Calendars/functions/isResevedInterval";
import { reservProg } from "../../../../../../Calendars/reserv";

export const change = (e, reserves, selectedDates, setSelectedDates) => {
  console.log(getDateFormat(e[0]));
  const isDayReserved = isDateResved(getDateFormat(e[0]), reserves);

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
