import React, { useRef, useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
//import { reserves } from "../Calendars/reserv";

const ShowCalendar = function ({ rents }) {
  const el = useRef();

  const [draw, setDraw] = useState(null);

  setTimeout(() => {
    const cal = el.current.firstChild.lastChild;
    if (cal) {
      for (let i = 0; i < cal.childNodes.length; i++) {
        const div = cal.childNodes[i];
        let color = "";
        for (let k = 0; k < rents.length; k++) {
          const reserv = rents[k];
          const days = JSON.parse(reserv.days);
          for (let j = 0; j < days.length; j++) {
            const reservedDay = days[j];

            if (reservedDay === div.ariaLabel) {
              if (!j) {
                div.style.borderTopLeftRadius = "20px";
                div.style.borderBottomLeftRadius = "20px";
              }
              if (j === days.length - 1) {
                div.style.borderTopRightRadius = "20px";
                div.style.borderBottomRightRadius = "20px";
              }
              div.style.color = "black";
              color = reserv.type === "go" ? "red" : "yellow";
              break;
            } else {
              div.style.borderStyle = "none";
              div.style.color = "";
              div.style.borderStyle = "none";
              div.style.borderTopLeftRadius = "0px";
              div.style.borderBottomLeftRadius = "0px";
              div.style.borderTopRightRadius = "0px";
              div.style.borderBottomRightRadius = "0px";
            }
          }
          if (color) {
            break;
          }
        }

        div.style.backgroundColor = color;
       /// div.style.borderRadius = "10px";
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
      />
    </div>
  );
};

export default ShowCalendar;
