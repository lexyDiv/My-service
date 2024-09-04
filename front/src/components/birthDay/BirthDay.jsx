/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { monthesArr } from "../../vars/monthesArr";
import { getYears } from "../../functions/getYears";
import { getMonthDays } from "../../functions/getMonthDays";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const BirthDay = function ({
  birthYear,
  setBirthYear,
  birthManth,
  setBirthManth,
  birthDay,
  setBirthDay,
  setBirthTime,
  client,
  birthTime,
}) {
  const years = useRef(getYears(1900));
  const monthes = useRef(monthesArr);
  const [monthDays, setMonthDays] = useState([]);

  useEffect(() => {
    if (birthYear) {
      const daysData = getMonthDays(birthYear, birthManth + 1);
      setMonthDays(daysData);
      if (monthDays.length > daysData.length) {
        setBirthDay(1);
      }
    }
  }, [birthYear, birthManth]);

  function clientBirthdayDefault() {
    const clientDate = new Date(Number(client.birthday));
    setBirthTime(clientDate.getTime());
    setBirthDay(clientDate.getDate());
    setBirthYear(clientDate.getFullYear());
    setBirthManth(clientDate.getMonth());
  }

  return (
    <div
      style={{
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p style={{ marginBottom: "0px" }}>день рождения</p>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "90%",
            height: "50px",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {birthYear && (
            <DeleteIcon
              onClick={() => {
                setBirthDay(1);
                setBirthManth(0);
                setBirthYear(null);
                setBirthTime(null);
              }}
              sx={{
                cursor: "pointer",
              }}
            />
          )}
          {client &&
            client.birthday &&
            Number(client.birthday) !== birthTime && (
              <RestartAltIcon
                onClick={() => {
                  clientBirthdayDefault();
                  setTimeout(() => {
                    clientBirthdayDefault();
                  }, 0);
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          <select
            value={birthYear || new Date().getFullYear()}
            onChange={(e) => setBirthYear(Number(e.target.value))}
            name="year"
            id="year"
          >
            {years.current.map((year, i) => (
              <option key={i} value={year}>
                {year}
              </option>
            ))}
          </select>
          {birthYear && (
            <>
              <select
                value={birthManth}
                onChange={(e) => setBirthManth(Number(e.target.value))}
                name="month"
                id="month"
              >
                {monthes.current.map((month, i) => (
                  <option key={month} value={i}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(Number(e.target.value))}
                name="day"
                id="day"
              >
                {monthDays.map((day) => (
                  <option key={day + "day"} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
        <div
          style={{
            backgroundColor: `${birthYear ? "green" : "red"}`,
          }}
          className="create-client-basic-item-ok"
        />
      </div>
    </div>
  );
};

export default BirthDay;
