import React from "react";
import { addReserv } from "../rentCalendar/functions/classReserv";
import { useDispatch } from "react-redux";
import "./RentButtons.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RentButtons = function ({
  user,
  house,
  location,
  setFocusRent,
  setNewInterval,
  newInterval,
  setGMessage,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div id="rent-buttons"
    style={{ backgroundColor: `${newInterval.startTime ? "#212121" : ""}` }}
    >
      {newInterval.startTime && (
        <Button
          sx={{ margin: 0.4 }}
          onClick={() =>
            setNewInterval({
              startTime: 0,
              endTime: 0,
            })
          }
          variant="outlined"
        >
          ОТМЕНА
        </Button>
      )}
      {newInterval.startTime && newInterval.endTime && (
        <>
          <Button
            sx={{ margin: 0.4 }}
            variant="outlined"
            onClick={() => {
              addReserv(
                newInterval,
                setNewInterval,
                "hold",
                user,
                house,
                location,
                dispatch,
                setFocusRent,
                setGMessage,
                navigate
              );
            }}
          >
            ЗАБРОНИРОВАНО
          </Button>
          <Button
            sx={{ margin: 0.4 }}
            variant="outlined"
            onClick={() => {
              addReserv(
                newInterval,
                setNewInterval,
                "go",
                user,
                house,
                location,
                dispatch,
                setFocusRent,
                setGMessage,
                navigate
              );
            }}
          >
            СДАНО
          </Button>
        </>
      )}
    </div>
  );
};

export default RentButtons;
