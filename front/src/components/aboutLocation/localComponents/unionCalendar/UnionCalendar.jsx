import React from "react";
import UnionShowCalendar from "./unionShowCalendar/UnionShowCalendar";
import "./UnionCalendar.css";
import { useLocation, useNavigate } from "react-router-dom";

const UnionCalendar = function ({ house, index, month, setMonth }) {
 
  const location = useLocation();
  const navigate = useNavigate();

  function goHome() {
    const path = `${location.pathname}/house/${house.id}`;
    navigate(path);
  }

  return (
    <div className="union-calendar">
      <UnionShowCalendar
        rents={house.Rents}
        index={index}
        month={month}
        setMonth={setMonth}
      />
      <div className="union-calendar-info">
        <h5 className="union-calendar-info-name">
          {house.name}
          <div className="card-body" style={{marginTop: '50px'}}>
            <button type="button" className="btn btn-primary" onClick={goHome}>
              В дом
            </button>
          </div>
        </h5>
      </div>
    </div>
  );
};

export default UnionCalendar;
