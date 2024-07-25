import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

import { reserves } from "../../../../../Calendars/reserv";

import "./RentCalendar.css";
import { onDraw } from "./functions/onDraw";
import { change } from "./functions/onCange";
import RentButtons from "../rentButtons/RentButtons";

const RentCalendar = function () {
  const [draw, setDraw] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);

  const el = useRef(null);

  useEffect(() => {
    if (el.current) {
      onDraw(el, reserves);
    }
  }, [el, draw]);

  function onChange(e) {
    change(e, reserves, selectedDates, setSelectedDates);
  }

  return (
    <div id="calendar-2" ref={el}>
      <Calendar
        style={{
          width: "100%",
        }}
        protection={false}
        onMonthChange={() => setDraw((prev) => !prev)}
        onYearChange={() => setDraw((prev) => !prev)}
        selected={selectedDates}
        onChange={onChange}
      />
      <RentButtons
        setDraw={setDraw}
        setSelectedDates={setSelectedDates}
        selectedDates={selectedDates}
      />
    </div>
  );
};

export default RentCalendar;
