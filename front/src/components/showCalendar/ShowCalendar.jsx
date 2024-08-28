import React, { useRef, useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import { getDateFormat } from "../Calendars/functions/getDateFormat";
import { oneDay } from "../Calendars/Calendar1";
import { getApparatDate } from "../aboutRent/localComponents/updateRent/localComponents/updateCalendar/functions/onDrawUpdateCalendar";

const ShowCalendar = function ({ rents, newInterval }) {
  const el = useRef();

  const [draw, setDraw] = useState(null);

  setTimeout(() => {
    const cal =
      el.current && el.current.firstChild && el.current.firstChild.lastChild;
    if (cal) {
      for (let i = 0; i < cal.childNodes.length; i++) {
        const div = cal.childNodes[i];
        if (!div.update) {
          div.update = "ok";
          const leftDiv = document.createElement("div");
          leftDiv.className = "left-div";
          const rightDiv = document.createElement("div");
          rightDiv.className = "right-div";

          div.appendChild(leftDiv);
          div.appendChild(rightDiv);
        }
      }

      for (let i = 0; i < cal.childNodes.length; i++) {
        const div = cal.childNodes[i];
        div.style.color = "";
        let cNLength = div.childNodes.length;
        let leftDiv = null;
        let rightDiv = null;

        for (let h = 0; h < cNLength; h++) {
          const childDiv = div.childNodes[h];
          if (childDiv.className === "left-div") {
            leftDiv = childDiv;
          } else if (childDiv.className === "right-div") {
            rightDiv = childDiv;
          }
        }

        rightDiv.style.backgroundColor = "";
        leftDiv.style.backgroundColor = "";
        leftDiv.style.borderTopLeftRadius = "0px";
        leftDiv.style.borderBottomLeftRadius = "0px";
        leftDiv.style.borderTopRightRadius = "0px";
        leftDiv.style.borderBottomRightRadius = "0px";
        rightDiv.style.borderTopLeftRadius = "0px";
        rightDiv.style.borderBottomLeftRadius = "0px";
        rightDiv.style.borderTopRightRadius = "0px";
        rightDiv.style.borderBottomRightRadius = "0px";

        const divTime = getApparatDate(div.ariaLabel);
        for (let k = 0; k < rents.length; k++) {
          const reserv = rents[k];
          const color = reserv.type === "go" ? "red" : "yellow";
          const rStartTime = Number(reserv.startTime);
          const rEndTime = Number(reserv.endTime) + oneDay;

          if (newInterval && newInterval.startTime) {
            const nStartTime = newInterval.startTime;
            if (nStartTime === divTime) {
              rightDiv.style.backgroundColor = "grey";
              rightDiv.style.borderTopLeftRadius = "60%";
              rightDiv.style.borderBottomLeftRadius = "60%";
            }
            if (newInterval.endTime) {
              const nEndTime = newInterval.endTime + oneDay;
              if (nEndTime === divTime) {
                leftDiv.style.backgroundColor = "grey";
                leftDiv.style.borderBottomRightRadius = "60%";
                leftDiv.style.borderTopRightRadius = "60%";
              } else if (divTime > nStartTime && divTime < nEndTime) {
                leftDiv.style.backgroundColor = "grey";
                rightDiv.style.backgroundColor = "grey";
              }
            }
          }

          if (divTime === rStartTime) {
            rightDiv.style.backgroundColor = color;
            rightDiv.style.borderTopLeftRadius = color === "red" ?  "60%"  :  "20%";
            rightDiv.style.borderBottomLeftRadius = color === "red" ?  "60%"  :  "20%";
            div.rentId = reserv.id;
          } else if (divTime === rEndTime) {
            leftDiv.style.backgroundColor = color;
            leftDiv.style.borderTopRightRadius = color === "red" ?  "60%"  :  "20%";
            leftDiv.style.borderBottomRightRadius = color === "red" ?  "60%"  :  "20%";
          } else if (divTime > rStartTime && divTime < rEndTime) {
            leftDiv.style.backgroundColor = color;
            rightDiv.style.backgroundColor = color;
            div.rentId = reserv.id;
          }
        }
      }
    }
  }, 0);

  return (
    <div ref={el}>
      <Calendar
        style={{ backgroundColor: "#212121" }}
        protection={false}
        initialDate={null}
        onMonthChange={setDraw}
        onYearChange={setDraw}
        options={{
          weekStartsOn: 1,
        }}
      />
    </div>
  );
};

export default ShowCalendar;
