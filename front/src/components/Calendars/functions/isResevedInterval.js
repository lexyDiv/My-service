import { getDateFormat } from "./getDateFormat";
import { isDateResved } from "./isDateReserved";

const oneDay = 86400000;

export function isReservedInterval(startDay, clickedDay, reserves) {
  //    console.log("startDay = ", startDay);
  //    console.log("clickedDay = ", clickedDay);

  let startDayTime = startDay.getTime();

  let ticker = 1;
  while (ticker < 1000) {
    const nextDay = getDateFormat(new Date(startDayTime + oneDay * ticker));
    if (isDateResved(nextDay, reserves)) {
      return true;
    }
    if (nextDay === getDateFormat(new Date(clickedDay.getTime()))) {
      return false;
    }
    ticker++;
  }
}
