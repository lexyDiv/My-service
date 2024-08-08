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

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
      {!rentStartEnd.clicks ? (
        <h4>кликните первый день</h4>
      ) : (
        <h4>кликните завершающий день</h4>
      )}
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
          onClick={(e) =>
            updateCalendarClickValid(
              e,
              rents.current,
              rentStartEnd,
              setRentStartEnd
            )
          }
          //selected={selectedDates}
          // onChange={onChange}
          //   onClick={(e) => {
          //     if (e.target.parentNode.rentId && !selectedDates.length) {
          //       const rentId = e.target.parentNode.rentId;
          //       const rent = house.Rents.find((r) => r.id === Number(rentId));
          //       rent && setFocusRent(rent);
          //       const scrollContainer = document.getElementById("scroll-container");
          //       if (scrollContainer) {
          //         setTimeout(() => {
          //           scrollContainer.scrollTop = 1000;
          //         }, 0);
          //       }
          //     } else {
          //       setFocusRent(null);
          //     }
          //   }}
          options={{
            weekStartsOn: 1,
          }}
        />
        {/* <RentButtons
          setFocusRent={setFocusRent}
          location={location}
          user={user}
          house={house}
          setDraw={setDraw}
          setSelectedDates={setSelectedDates}
          selectedDates={selectedDates}
        /> */}
      </div>
    </>
  );
};

export default UpdateCalendar;
