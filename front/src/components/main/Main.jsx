import React, { useEffect, useRef, useState } from "react";
import { monthesArr } from "../../vars/monthesArr";

const Main = function () {
  const startYear = 1900;
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const years = useRef(getYears());
  const monthes = useRef(monthesArr);
  const days = useRef([]);
  const [birthYear, setBirthYear] = useState(null);
  const [birthManth, setBirthManth] = useState(null);
  const [birthDay, setBirthDay] = useState(null);

  function getYears() {
    const arr = [];
    for (let i = startYear; i <= currentYear; i++) {
      arr.unshift(i);
    }
    return arr;
  }

  function getMonthDays(birthYear, birthManth) {
    const days = [];
    let cd = 1;
    while (true) {
      const monthStr =
        birthManth < 10
          ? "0" + String(birthManth) + "."
          : String(birthManth) + ".";
      const dayStr = cd < 10 ? "0" + String(cd) : String(cd);
     // console.log(String(birthYear) + "." + monthStr + dayStr)
      console.log(new Date(String(birthYear) + "." + monthStr + dayStr).getMonth())
      if (
         cd === 32 
         ||
        new Date(String(birthYear) + "." + monthStr + dayStr).getMonth() !==
        birthManth - 1
      ) {
        return days;
      }
      days.push(cd);
      cd++;
    }
  }

  useEffect(() => {
    if(birthManth){days.current = getMonthDays(birthYear, birthManth)};
  }, [birthManth]);

  //   console.log(new Date(date).getMonth());
  //   console.log(years.current);
  // console.log(birthManth)
  setTimeout(() => {
    console.log("days = ", days.current)
  }, 0);
  return (
    <div style={{ color: "white", top: "200px", position: "absolute" }}>
      <select
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
        <select onChange={(e) => setBirthManth(Number(e.target.value) + 1)}>
          {monthes.current.map((manth, i) => (
            <option key={manth} value={i}>
              {manth}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Main;
