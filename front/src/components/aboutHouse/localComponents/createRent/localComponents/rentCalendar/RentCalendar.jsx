import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

//import { reservesDB } from "./functions/classReserv";

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
  // console.log("house.Rents = ", house.Rents);
  //console.log(house)
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
        onClick={(e) => {
          // console.log(e.target.parentNode.ariaLabel);
          // console.log(e.target.parentNode.style.backgroundColor);
          if (e.target.parentNode.style.backgroundColor) {
            for (let i = 0; i < house.Rents.length; i++) {
              const rent = house.Rents[i];
              const rentDays = JSON.parse(rent.days);
              let get = false;
              for (let j = 0; j < rentDays.length; j++) {
                const day = rentDays[j];
                if (day === e.target.parentNode.ariaLabel) {
                  setFocusRent(rent);
                  get = true;
                  break;
                }
              }
              if (get) {
                break;
              }
            }
          }
        }}
      />
      <RentButtons
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
