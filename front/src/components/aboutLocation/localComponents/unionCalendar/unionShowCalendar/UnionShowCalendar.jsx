import React, { useEffect, useRef } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import { drawUnionCalendar } from "./functions/drawUnionCalendar";

const UnionShowCalendar = function ({
  rents,
  index,
  month,
  setMonth,
  year,
  setYear,
}) {
  const el = useRef();

  useEffect(() => {
    drawUnionCalendar(el, rents, index);
  }, 
  [index, month, rents]);

  // "#212121"
  return (
    <div className="ref-div" ref={el} style={{ width: "100%", overflow: 'hidden' }}>
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
        }}
        onYearChange={(e) => {
          setYear(e);
        }}
        month={month}
        year={year}
      />
    </div>
  );
};

export default UnionShowCalendar;
