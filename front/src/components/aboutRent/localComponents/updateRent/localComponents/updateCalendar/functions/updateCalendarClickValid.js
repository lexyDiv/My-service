import { getDateFormat } from "../../../../../../aboutHouse/localComponents/createRent/localComponents/rentCalendar/functions/getDateFormat";
import { getApparatDate } from "./onDrawUpdateCalendar";

export const updateCalendarClickValid = (
  e,
  rents,
  startEnd,
  setRentStartEnd
) => {
  if (
    e.target.parentNode.ariaLabel &&
    (e.target.classList.contains("calendar__day-content") ||
      e.target.classList.contains("calendar__day-today"))
  ) {
    const clickTime = getApparatDate(e.target.parentNode.ariaLabel);
    const rentStartTime = Number(startEnd.startTime);
    const rentEndTime = Number(startEnd.endTime);
    if (!startEnd.clicks) {
      let clickOk = true;
      let endTime = rentEndTime;
      //  if(clickTime < new Date().getTime()) {
      //   return
      //  }
      for (let i = 0; i < rents.length; i++) {
        const rStartTime = Number(rents[i].startTime);
        const rEndTime = Number(rents[i].endTime);
        if (
          (clickTime >= rStartTime &&
            clickTime <= rEndTime)
        ) {
          // clickOk = false;
          // break;
          return;
        }
        if (
          (rStartTime >= clickTime && rStartTime <= rentEndTime) ||
          (rEndTime >= clickTime && rEndTime <= rentEndTime) ||
          clickTime > rentEndTime
        ) {
          endTime = null;
        }
      }
      if (clickOk) {
        setRentStartEnd((prev) => ({
          ...prev,
          startTime: String(clickTime),
          endTime: endTime,
          clicks: prev.clicks + 1,
        }));
      }
    } else if (startEnd.clicks === 1) {
      let clickOk = true;
      for (let i = 0; i < rents.length; i++) {
        const rStartTime = Number(rents[i].startTime);
        const rEndTime = Number(rents[i].endTime);
        if (
          clickTime < rentStartTime ||
          (rStartTime >= rentStartTime && rStartTime <= clickTime) ||
          (rEndTime >= rentStartTime && rEndTime <= clickTime)
        ) {
          // clickOk = false;
          // break;
         // setRentStartEnd(prev => ({...prev}))
          return
        }
      }
      if (clickOk) {
        setRentStartEnd((prev) => ({
          ...prev,
          endTime: clickTime,
          clicks: prev.clicks + 1,
        }));
      }
    }
  }
};
