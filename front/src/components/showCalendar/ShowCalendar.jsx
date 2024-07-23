import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import { getDateFormat } from "../Calendars/functions/getDateFormat";
import { isDateResved } from "../Calendars/functions/isDateReserved";
import { isReservedInterval } from "../Calendars/functions/isResevedInterval";
import { addReserv, reserves, reservProg } from "../Calendars/reserv";


const oneDay = 86400000;

const globalStartDate = new Date().getTime() - oneDay * 160;


const currentDateFormat = "16.07.2024";
let tick = 1;

// while (tick < 1000) {

//   const dateData = new Date(globalStartDate + oneDay * tick); //

//   //console.log( getDateFormat(dateData));

//   if (getDateFormat(dateData) === currentDateFormat) {
//     //console.log("Is worcking ! ", dateData); // ok !!!
//     break;
//   }
//   tick++;
// }

//const startDate = new Date(today + oneDay * 8);

const reserved = [

];

const ShowCalendar = function () {
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


  return (
    <div ref={el}>
      <Calendar
        protection={false}
        onMonthChange={setDraw}
        onYearChange={setDraw}
        initialDate={null}
        selected={selectedDates}
        reserved={reserved}
        // onChange={
        //   // setSelectedDates
        //   (e) => {
        //     console.log(getDateFormat(e[0]));
        //     // console.log(e[0].getMonth());
        //     const isDayReserved = isDateResved(getDateFormat(e[0]), reserves);

        //     if (!isDayReserved) {
        //       if (!selectedDates.length) {
        //         reservProg(setSelectedDates, e[0]);
        //       } else {
        //         if (
        //           (!isReservedInterval(selectedDates[0], e[0], reserves) ||
        //             getDateFormat(selectedDates[0]) === getDateFormat(e[0])) &&
        //           selectedDates[0] <= e[0]
        //         ) {
        //           reservProg(setSelectedDates, e[0]);
        //         }
        //       }
        //     }
        //   }
        // }
        // onClick={(e) => {
        //   // console.log("onClick = ", e.targe);
        //   if (
        //     e.target.parentNode.ariaLabel &&
        //     (e.target.classList.contains("calendar__day-content") ||
        //       e.target.classList.contains("calendar__day-today"))
        //   ) {
        //     // setAriaLebale(e.target.parentNode.ariaLabel); // ok
        //   }
        // }}
      />

    </div>
  );
};

export default ShowCalendar;