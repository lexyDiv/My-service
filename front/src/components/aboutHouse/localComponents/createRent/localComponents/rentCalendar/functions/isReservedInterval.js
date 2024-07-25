import { getDateFormat } from "./getDateFormat";
import { isDateReserved } from "./isDateReserved";

const oneDay = 86400000;

export function isReservedInterval(startDay, clickedDay, reservesDB) {

  let startDayTime = startDay.getTime();

  let ticker = 1;
  while (ticker < 1000) {
    const nextDay = getDateFormat(new Date(startDayTime + oneDay * ticker));
    if (isDateReserved(nextDay, reservesDB)) {
      return true;
    }
    if (nextDay === getDateFormat(new Date(clickedDay.getTime()))) {
      return false;
    }
    ticker++;
  }
}