import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
//import { getByLabelText } from "@testing-library/react";
import { getDateFormat } from "./functions/getDateFormat";
import { addReserv, reserves, reservProg } from "./reserv";
import { isDateResved } from "./functions/isDateReserved";
import { isReservedInterval } from "./functions/isResevedInterval";

import './Calendar2.css'

const oneDay = 86400000;
//const today = new Date().getTime() + oneDay;
const globalStartDate = new Date().getTime() - oneDay * 160;

// const reserved = Array.from({ length: 3 }, (_, i) => {
//   const daysCount = Math.floor(Math.random() * (7 - 4) + 3);
//   const startDate = new Date(today + oneDay * 8 * i);
//   console.log(startDate);
//   return {
//     startDate,
//     endDate: new Date(startDate.getTime() + oneDay * daysCount),
//   };
// });
//const testDate = new Date(today);
// console.log('testDate = ', testDate);
// console.log(new Date(globalStartDate));

const currentDateFormat = "16.07.2024";
let tick = 1;

while (tick < 1000) {
  //const dateData = new Date(globalStartDate + oneDay * tick).getDate(); // day
  //const dateData = new Date(globalStartDate + oneDay * tick).getMonth(); // m
  const dateData = new Date(globalStartDate + oneDay * tick); //

  //console.log( getDateFormat(dateData));

  if (getDateFormat(dateData) === currentDateFormat) {
    //console.log("Is worcking ! ", dateData); // ok !!!
    break;
  }
  tick++;
}

//const startDate = new Date(today + oneDay * 8);

const reserved = [
  // {
  //     startDate: new Date(today - oneDay * 10),
  //     endDate: new Date(startDate.getTime() + oneDay)
  // }
];

const Calendar2 = function () {
  // eslint-disable-next-line no-unused-vars
  const [draw, setDraw] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  const el = useRef();
  const [cal, setCal] = useState(null);

  useEffect(() => {
    setCal(el.current.firstChild.lastChild);
  }, [el]);

  setTimeout(() => {
    if (cal) {
      // console.log(ariaLabel);
      // console.log(cal.childNodes);
      // reserves.length && console.log("reserves[0].arr.length", reserves[0].datesArr.length);
      for (let i = 0; i < cal.childNodes.length; i++) {
        const div = cal.childNodes[i];
        let color = "";
        for (let k = 0; k < reserves.length; k++) {
          const reserv = reserves[k];
          for (let j = 0; j < reserv.datesArr.length; j++) {
            const reservedDay = reserv.datesArr[j];
            // console.log('reservedDay = ', reservedDay, ' div.ariaLabel', div.ariaLabel);
            // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            if (reservedDay === div.ariaLabel) {
              // console.log(div.ariaLabel);
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
        // if (div.ariaLabel === ariaLabel) {
        //   div.style.backgroundColor = "red";
        // } else {
        //   div.style.backgroundColor = "";
        // }
        div.style.backgroundColor = color;
        div.style.borderRadius = "10px";
        //  div.style.borderStyle = "none";
      }
    }
  }, 0);

  // console.log(selectedDates);
  //console.log(ariaLabel);
  //console.log(selectedDates);
  //const dt = new Date();
  //console.log("date = ", dt);
  //console.log("JSON date = ", new Date(dt)); // ok
  //console.log("JSON date = ", new Date(JSON.parse(JSON.stringify(dt)))); // ok
  return (
    <div id="calendar-2"  ref={el}>
      <Calendar
      
        style={{
          width: '100%'
        }}
        protection={false}
        onMonthChange={setDraw}
        onYearChange={setDraw}
        initialDate={null}
        selected={selectedDates}
        reserved={reserved}
        onChange={
          // setSelectedDates
          (e) => {
            console.log(getDateFormat(e[0]));
            // console.log(e[0].getMonth());
            const isDayReserved = isDateResved(getDateFormat(e[0]), reserves);

            if (!isDayReserved) {
              if (!selectedDates.length) {
                reservProg(setSelectedDates, e[0]);
              } else {
                if (
                  (!isReservedInterval(selectedDates[0], e[0], reserves) ||
                    getDateFormat(selectedDates[0]) === getDateFormat(e[0])) &&
                  selectedDates[0] <= e[0]
                ) {
                  reservProg(setSelectedDates, e[0]);
                }
              }
            }
          }
        }
        onClick={(e) => {
          // console.log("onClick = ", e.targe);
          if (
            e.target.parentNode.ariaLabel &&
            (e.target.classList.contains("calendar__day-content") ||
              e.target.classList.contains("calendar__day-today"))
          ) {
            // setAriaLebale(e.target.parentNode.ariaLabel); // ok
          }
        }}
      />
      {selectedDates.length === 1 && (
        <button
          type="button "
          className="btn btn-primary about-house-btn"
          onClick={() => setSelectedDates([])}
        >
          отмена
        </button>
      )}
      {selectedDates.length === 2 && (
        <>
          <button
            type="button"
            className="btn btn-primary about-house-btn"
            onClick={() => addReserv(selectedDates, setSelectedDates, "hold")}
          >
            бронировать
          </button>

          <button
            type="button"
            className="btn btn-primary about-house-btn"
            onClick={() => addReserv(selectedDates, setSelectedDates, "go")}
          >
            сдать
          </button>

          <button
            type="button"
            className="btn btn-primary about-house-btn"
            onClick={() => setSelectedDates([])}
          >
            отмена выбора
          </button>
        </>
      )}
    </div>
  );
};

export default Calendar2;
