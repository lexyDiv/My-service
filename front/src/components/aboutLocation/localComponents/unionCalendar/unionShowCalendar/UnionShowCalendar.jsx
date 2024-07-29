import React, { useRef, useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

const UnionShowCalendar = function ({
  rents,
  index,
  month,
  setMonth,
  year,
  setYear,
}) {
  const el = useRef();

  const [draw, setDraw] = useState(null);

  setTimeout(() => {
    const cal = el.current.firstChild.lastChild;
    // cal.firstChild.firstChild.style.display = "hiden";

    // cal.style.display = 'flex';
    if (cal) {
      // console.log(el.current.firstChild.childNodes[0].style.display = 'none')
      //  console.log(cal.style)
      //  cal.style.gridTemplateColumns = `repeat(1, 1fr)`;
      if (index) {
        el.current.firstChild.childNodes[0].style.display = "none";
      }
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
  // "#212121"
  return (
    <div className="ref-div" ref={el} style={{ width: "100%" }}>
      <Calendar
        style={{ backgroundColor: "white", width: "100%" }}
        protection={false}
        initialDate={null}
        onClick={(e) => {
          if (!e.target.innerText) {
            e.stopPropagation();
          }
        }}
        onMonthChange={(e) => {
          setMonth(e);
          setDraw();
        }}
        onYearChange={(e) => {
          setDraw();
          setYear(e);
        }}
        month={month}
        year={year}
      />
    </div>
  );
};

export default UnionShowCalendar;
