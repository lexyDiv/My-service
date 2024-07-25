import React from "react";
import { addReserv } from "../../../../../Calendars/reserv";

const RentButtons = function ({ selectedDates, setSelectedDates, setDraw }) {
  return (
    <div id="rent-buttons">
      {selectedDates.length === 1 && (
        <button
          type="button"
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
            onClick={() => {
              addReserv(selectedDates, setSelectedDates, "hold");
              setDraw((prev) => !prev);
            }}
          >
            бронировать
          </button>

          <button
            type="button"
            className="btn btn-primary about-house-btn"
            onClick={() => {
              addReserv(selectedDates, setSelectedDates, "go");
              setDraw((prev) => !prev);
            }}
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

export default RentButtons;
