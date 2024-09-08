import React, { useRef } from "react";
import "./RentItem.css";
import { getDateFormat } from "../createRent/localComponents/rentCalendar/functions/getDateFormat";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const rentTypes = {
  hold: "забронировано",
  go: "сдано",
};

const RentItem = function ({ rent }) {
  const navigate = useNavigate();
  const oneDay = 86400000;

  function goToRent() {
    navigate(
      `/locations/location/${rent.location_id}/house/${rent.house_id}/rent/${rent.id}`
    );
  }

  const { locations } = useSelector((store) => store.locations);
  const location = useRef(locations.find((l) => l.id === rent.location_id));

  return (
    <div className="rent-item" onClick={goToRent}>
      <p className="rent-item-status">
        Статус :
        <span
          className="rent-item-status-type"
          style={{ color: rent.type === "go" ? "red" : "yellow" }}
        >{` ${rentTypes[rent.type]}`}</span>
      </p>
      <div className="rent-item-date">
        <p className="rent-item-date-p">С</p>
        <p className="rent-item-date-p-date">{`${getDateFormat(
          new Date(Number(rent.startTime))
        )} (${location ? location.current.inTime : ""})`}</p>
        <p className="rent-item-date-p">По</p>
        <p className="rent-item-date-p-date">{`${getDateFormat(
          new Date(Number(rent.endTime) + oneDay)
        )} (${location ? location.current.outTime : ""})`}</p>
      </div>
      <div className="rent-item-user-info">
        <div className="rent-item-user-info-creator">Создал :</div>
        <div className="rent-item-user-info-date">
          {getDateFormat(new Date(Number(rent.date)))}
        </div>
        <Avatar alt="Remy Sharp" src={rent.User.image} />
        <div className="rent-item-user-info-name">{rent.User.name}</div>
      </div>
    </div>
  );
};

export default RentItem;
