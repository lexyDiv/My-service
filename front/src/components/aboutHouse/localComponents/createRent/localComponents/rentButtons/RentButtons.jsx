import React from "react";
import { addReserv } from "../rentCalendar/functions/classReserv";
import { useDispatch } from "react-redux";
import "./RentButtons.css";
import { Button } from "@mui/material";

const RentButtons = function ({
  user,
  house,
  location,
  setFocusRent,
  setNewInterval,
  newInterval,
}) {
  const dispatch = useDispatch();

  return (
    <div id="rent-buttons">
      {newInterval.startTime && (
        <Button
          onClick={() =>
            setNewInterval({
              startTime: 0,
              endTime: 0,
            })
          }
          variant="contained"
        >
          ОТМЕНА
        </Button>
      )}
      {newInterval.startTime && newInterval.endTime && (
        <>
          <Button variant="contained"
          onClick={() => {
            addReserv(
              newInterval,
              setNewInterval,
              "hold",
              user,
              house,
              location,
              dispatch,
              setFocusRent
            );
          }}
          >ЗАБРОНИРОВАНО</Button>
          <Button variant="contained"
                      onClick={() => {
                        addReserv(
                          newInterval,
                          setNewInterval,
                          "go",
                          user,
                          house,
                          location,
                          dispatch,
                          setFocusRent
                        );
                      }}
          >СДАНО</Button>
        </>
      )}
      {/* {selectedDates.length === 1 && (
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
      )} */}
    </div>
  );
};

export default RentButtons;
