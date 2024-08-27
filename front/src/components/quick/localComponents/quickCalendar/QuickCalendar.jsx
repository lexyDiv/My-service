import { Calendar } from "@demark-pro/react-booking-calendar";
import React, { useRef } from "react";

const QuickCalendar = function() {

const el = useRef(null);

    return (
        <div id="calendar-2" ref={el} style={{ overflow: "hidden" }}>
        <Calendar
          style={{
            width: "100%",
          }}
          
          protection={false}
         // onMonthChange={() => setDraw((prev) => !prev)}
         // onYearChange={() => setDraw((prev) => !prev)}
          onClick={(e) => {
            // if (e.target.parentNode.rentId) {
            //   setNewInterval({
            //     startTime: 0,
            //     endTime: 0,
            //     clicks: 0,
            //   });
            //   const rentId = e.target.parentNode.rentId;
            //   const rent = house.Rents.find((r) => r.id === Number(rentId));
            //   rent && setFocusRent(rent);
            // } else if (
            //   e.target.parentNode.ariaLabel &&
            //   (e.target.classList.contains("calendar__day-content") ||
            //     e.target.classList.contains("calendar__day-today"))
            // ) {
            //   if (!newInterval.startTime) {
            //     if (!e.target.parentNode.rentId) {
            //       setNewInterval((prev) => ({
            //         ...prev,
            //         startTime: getApparatDate(e.target.parentNode.ariaLabel),
            //       }));
            //     }
            //   } else if (
            //     !isValideSecondClick(
            //       newInterval,
            //       e.target.parentNode.ariaLabel,
            //       house.Rents
            //     )
            //   ) {
            //     !e.target.parentNode.rentId &&
            //       setNewInterval((prev) => ({
            //         ...prev,
            //         startTime: getApparatDate(e.target.parentNode.ariaLabel),
            //         endTime: 0,
            //       }));
            //   } else {
            //     !newInterval.endTime
            //       ? setNewInterval((prev) => ({
            //           ...prev,
            //           endTime: getApparatDate(e.target.parentNode.ariaLabel),
            //         }))
            //       : setNewInterval((prev) => ({
            //           ...prev,
            //           startTime: getApparatDate(e.target.parentNode.ariaLabel),
            //           endTime: 0,
            //         }));
            //   }
            //   setFocusRent(null);
            // }
          }}
          options={{
            locale: 'ru',
            weekStartsOn: 1,
          }}
        />

      </div>
    )
}

export default QuickCalendar;