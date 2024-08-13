import { getApparatDate } from "../../../../../../aboutRent/localComponents/updateRent/localComponents/updateCalendar/functions/onDrawUpdateCalendar";

export const isValideSecondClick = function(newInterval, clickTime, rents) {
    const nStartTime = newInterval.startTime;
    const cTime = getApparatDate(clickTime);
    for(let i = 0; i < rents.length; i++) {
        const rent = rents[i];
        const rStartTime = Number(rent.startTime);
        const rEndTime = Number(rent.endTime);
        if (
            (cTime < nStartTime)
            || (rStartTime > nStartTime && rStartTime <= cTime)
            || (rEndTime > nStartTime && rEndTime <= cTime)
        ) {
            return false;
        }
    }
    return true;
}