import React from "react";
import { addReserv } from "../rentCalendar/functions/classReserv";
import { useDispatch } from "react-redux";
import './RentButtons.css';

const RentButtons = function ({
  selectedDates,
  setSelectedDates,
  setDraw,
  user,
  house,
  location,
  setFocusRent,
}) {
  const dispatch = useDispatch();
  
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
              addReserv(
                selectedDates,
                setSelectedDates,
                "hold",
                user,
                house,
                location,
                dispatch,
                setFocusRent
              );
              setDraw((prev) => !prev);
            }}
          >
            забронировано
          </button>

          <button
            type="button"
            className="btn btn-primary about-house-btn"
            onClick={() => {
              addReserv(
                selectedDates,
                setSelectedDates,
                "go",
                user,
                house,
                location,
                dispatch,
                setFocusRent
              );
              setDraw((prev) => !prev);
            }}
          >
            сдано
          </button>

          <button
            type="button"
            className="btn btn-primary about-house-btn"
            onClick={() => setSelectedDates([])}
          >
            отмена
          </button>
        </>
      )}
    </div>
  );
};

export default RentButtons;
