import { Calendar } from "@demark-pro/react-booking-calendar";
import React, { useEffect, useRef, useState } from "react";
import "./UpdateCalendar.css";
import { onDrawUpdateCalendar } from "./functions/onDrawUpdateCalendar";
import { updateCalendarClickValid } from "./functions/updateCalendarClickValid";

const UpdateCalendar = function ({
  rents,
  rent,
  rentStartEnd,
  setRentStartEnd,
  setClickAlert,
  clickAlert
}) {
  const [month, setMonth] = useState(
    new Date(Number(rent.startTime)).getMonth()
  );
  const [year, setYear] = useState(
    new Date(Number(rent.startTime)).getFullYear()
  );
  

  const el = useRef(null);
  //const [draw, setDraw] = useState(0);

  useEffect(() => {
    onDrawUpdateCalendar(el, rents.current, rent, rentStartEnd);
  }, [month, rent, rents, year, rentStartEnd]);

  let clickAlertMessage = "";

  if (rentStartEnd.clicks === 0) {
    clickAlertMessage = "кликните первый день";
  } else if (rentStartEnd.clicks === 1) {
    if (rentStartEnd.endTime) {
      clickAlertMessage = "кликните последний день или сохраните изменения";
    } else if (!rentStartEnd.endTime) {
      clickAlertMessage = "кликните последний день";
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* {!rentStartEnd.clicks ? (
          <h4>кликните первый день</h4>
        ) : (
          <h4>кликните завершающий день</h4>
        )} */}
      </div>
      <div id="update-calendar" ref={el}>
        <Calendar
          style={{
            width: "100%",
            color: "black",
          }}
          protection={false}
          onMonthChange={setMonth}
          onYearChange={setYear}
          month={month}
          year={year}
          onClick={(e) => {
           !rentStartEnd.clicks && setClickAlert(true);
            updateCalendarClickValid(
              e,
              rents.current,
              rentStartEnd,
              setRentStartEnd
            );
          }}
          options={{
            weekStartsOn: 1,
          }}
        />

        {clickAlert && (
          <div id="click-alert">
            <h4>{clickAlertMessage}</h4>
            <h1 onClick={() => setClickAlert(false)} id="click-alert-ok">
              OK
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateCalendar;
