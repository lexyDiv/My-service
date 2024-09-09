/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

import "./RentCalendar.css";
import { onDraw } from "./functions/onDraw";
import RentButtons from "../rentButtons/RentButtons";
import { getApparatDate } from "../../../../../aboutRent/localComponents/updateRent/localComponents/updateCalendar/functions/onDrawUpdateCalendar";
import { isValideSecondClick } from "./functions/isValideSecondClick";
import GlobalMessage from "../../../../../globalMessage/GlobalMessage";
import { useSelector } from "react-redux";

const RentCalendar = function ({
  house,
  user,
  location,
  setFocusRent,
  focusRent,
}) {
  const { quickInterval } = useSelector((store) => store.quickInterval);
  const focus = focusRent || quickInterval;
  const [month, setMonth] = useState(
    focus ? new Date(Number(focus.startTime)).getMonth() : new Date().getMonth()
  );
  const [year, setYear] = useState(
    focus
      ? new Date(Number(focus.startTime)).getFullYear()
      : new Date().getFullYear()
  );
  const [gMessage, setGMessage] = useState("");
  const [newInterval, setNewInterval] = useState(
    quickInterval
      ? quickInterval
      : {
          startTime: 0,
          endTime: 0,
          clicks: 0,
        }
  );

  const el = useRef(null);

  useEffect(() => {
    if (el.current) {
      if (focusRent || newInterval.startTime) {
        const scrollContainer = document.getElementById("scroll-container");
        if (scrollContainer) {
          setTimeout(() => {
            let takt = 0;
            const int = setInterval(() => {
              const scrollContainer =
                document.getElementById("scroll-container");
              if (takt < 10) {
                scrollContainer.scrollTop += 30;
                takt++;
              } else {
                clearInterval(int);
              }
            }, 20);
          }, 0);
        }
      }
    }
  }, [el, house.Rents, focusRent, newInterval]);

  useEffect(() => {
    if (el.current) {
      onDraw(el, house.Rents, focusRent, newInterval);
    }
  }, [month, year, el, house.Rents, focusRent, newInterval]);

  return (
    <div id="calendar-2" ref={el} style={{ overflow: "hidden" }}>
      <Calendar
        style={{
          width: "100%",
        }}
        protection={false}
        onMonthChange={setMonth}
        onYearChange={setYear}
        month={month}
        year={year}
        onClick={(e) => {
          if (e.target.parentNode.rentId) {
            setNewInterval({
              startTime: 0,
              endTime: 0,
              clicks: 0,
            });
            const rentId = e.target.parentNode.rentId;
            const rent = house.Rents.find((r) => r.id === rentId);
            rent && setFocusRent(rent);
          } else if (
            e.target.parentNode.ariaLabel &&
            (e.target.classList.contains("calendar__day-content") ||
              e.target.classList.contains("calendar__day-today"))
          ) {
            if (!newInterval.startTime) {
              if (!e.target.parentNode.rentId) {
                setNewInterval((prev) => ({
                  ...prev,
                  startTime: getApparatDate(e.target.parentNode.ariaLabel),
                }));
              }
            } else if (
              !isValideSecondClick(
                newInterval,
                e.target.parentNode.ariaLabel,
                house.Rents
              )
            ) {
              !e.target.parentNode.rentId &&
                setNewInterval((prev) => ({
                  ...prev,
                  startTime: getApparatDate(e.target.parentNode.ariaLabel),
                  endTime: 0,
                }));
            } else {
              !newInterval.endTime
                ? setNewInterval((prev) => ({
                    ...prev,
                    endTime: getApparatDate(e.target.parentNode.ariaLabel),
                  }))
                : setNewInterval((prev) => ({
                    ...prev,
                    startTime: getApparatDate(e.target.parentNode.ariaLabel),
                    endTime: 0,
                  }));
            }
            setFocusRent(null);
          }
        }}
        options={{
          locale: "ru",
          weekStartsOn: 1,
        }}
      />
      {user && user.level >= 2 && (
        <RentButtons
          setFocusRent={setFocusRent}
          location={location}
          user={user}
          house={house}
          setNewInterval={setNewInterval}
          newInterval={newInterval}
          setGMessage={setGMessage}
        />
      )}
      {gMessage && (
        <GlobalMessage
          updateMessage={gMessage}
          cb={() => setGMessage("")}
          color={"red"}
        />
      )}
    </div>
  );
};

export default RentCalendar;
