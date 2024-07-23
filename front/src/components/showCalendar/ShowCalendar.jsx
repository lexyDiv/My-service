import React, { useRef } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import { reserves } from "../Calendars/reserv";

const ShowCalendar = function () {
  const el = useRef();

  setTimeout(() => {
    const cal = el.current.firstChild.lastChild;
    if (cal) {
      for (let i = 0; i < cal.childNodes.length; i++) {
        const div = cal.childNodes[i];
        let color = "";
        for (let k = 0; k < reserves.length; k++) {
          const reserv = reserves[k];
          for (let j = 0; j < reserv.datesArr.length; j++) {
            const reservedDay = reserv.datesArr[j];

            if (reservedDay === div.ariaLabel) {
              div.style.borderStyle = "solid";
              div.style.borderColor = "black";
              color = reserv.type === "go" ? "red" : "yellow";
              break;
            } else {
              div.style.borderStyle = "none";
            }
          }
          if (color) {
            break;
          }
        }

        div.style.backgroundColor = color;
        div.style.borderRadius = "10px";
      }
    }
  }, 0);

  return (
    <div ref={el}>
      <Calendar protection={false} initialDate={null} />
    </div>
  );
};

export default ShowCalendar;
