import React from "react";
import UnionShowCalendar from "./unionShowCalendar/UnionShowCalendar";
import "./UnionCalendar.css";
import { useLocation, useNavigate } from "react-router-dom";

const UnionCalendar = function ({ house, index, month, setMonth, year, setYear }) {
 
  const location = useLocation();
  const navigate = useNavigate();

  function goHome() {
    const path = `${location.pathname}/house/${house.id}`;
    navigate(path);
  }
  
  return (
    <div className="union-calendar"
    onClick={goHome}
    >
      <div className="union-calendar-info">
        <h5 className="union-calendar-info-name">
          {house.name}
        </h5>
      </div>
      <UnionShowCalendar
        rents={house.Rents}
        index={index}
        month={month}
        setMonth={setMonth}
        setYear={setYear}
        year={year}
      />
      
    </div>
  );
};

export default UnionCalendar;
