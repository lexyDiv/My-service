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
      if (clickTime < rentEndTime && clickTime >= rentStartTime) {
        setRentStartEnd((prev) => ({
          ...prev,
          startTime: String(clickTime),
          clicks: prev.clicks + 1,
        }));
      }
      for (let i = 0; i < rents.length; i++) {
        const rStartTime = Number(rents[i].startTime);
        const rEndTime = Number(rents[i].endTime);
      }
    }
  }
};
