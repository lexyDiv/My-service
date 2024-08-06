import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

import "./RentCalendar.css";
import { onDraw } from "./functions/onDraw";
import { change } from "./functions/onCange";
import RentButtons from "../rentButtons/RentButtons";

const RentCalendar = function ({
  house,
  user,
  location,
  setFocusRent,
  focusRent,
}) {
  const reservesDB = house.Rents;

  const [draw, setDraw] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);

  const el = useRef(null);

  useEffect(() => {
    if (el.current) {
      onDraw(el, house.Rents, focusRent);
    }
  }, [el, draw, house.Rents, focusRent]);

  function onChange(e) {
    change(e, reservesDB, selectedDates, setSelectedDates);
  }

  return (
    <div id="calendar-2" ref={el} style={{ overflow: "hidden" }}>
      <Calendar
        style={{
          width: "100%",
        }}
        protection={false}
        onMonthChange={() => setDraw((prev) => !prev)}
        onYearChange={() => setDraw((prev) => !prev)}
        selected={selectedDates}
        onChange={onChange}
        onClick={(e) => {
          if (e.target.parentNode.rentId && !selectedDates.length) {
            const rentId = e.target.parentNode.rentId;
            const rent = house.Rents.find((r) => r.id === Number(rentId));
            rent && setFocusRent(rent);
            const scrollContainer = document.getElementById("scroll-container");
            if (scrollContainer) {
              setTimeout(() => {
                scrollContainer.scrollTop = 1000;
              }, 0);
            }
          } else {
            setFocusRent(null);
          }
        }}
        options={{
          weekStartsOn: 1
        }}
      />
      <RentButtons
        setFocusRent={setFocusRent}
        location={location}
        user={user}
        house={house}
        setDraw={setDraw}
        setSelectedDates={setSelectedDates}
        selectedDates={selectedDates}
      />
    </div>
  );
};

export default RentCalendar;
