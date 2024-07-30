import React from "react";
import "./RentItem.css";
import { getDateFormat } from "../createRent/localComponents/rentCalendar/functions/getDateFormat";
import { Avatar } from "@mui/material";

const rentTypes = {
  hold: "забронировано",
  go: "сдано",
};

const RentItem = function ({ rent }) {
  const rentDays = JSON.parse(rent.days);
  const oneDay = 86400000;

  return (
    <div className="rent-item">
      <p className="rent-item-status">
        Статус :
        <span
          className="rent-item-status-type"
          style={{ color: rent.type === "go" ? "red" : "yellow" }}
        >{` ${rentTypes[rent.type]}`}</span>
      </p>
      <div className="rent-item-date">
        <p className="rent-item-date-p">С</p>
        <p className="rent-item-date-p-date">{`${rentDays[0]} (14:00)`}</p>
        <p className="rent-item-date-p">По</p>
        <p className="rent-item-date-p-date">{`${getDateFormat(
          new Date(Number(rent.endTime) + oneDay)
        )} (12:00)`}</p>
      </div>
      <div className="rent-item-user-info">
        <div className="rent-item-user-info-creator">
        Создал :
        </div>
        <div className="rent-item-user-info-date">{rent.date}</div>
        <Avatar alt="Remy Sharp" src={rent.User.image} />
        <div className="rent-item-user-info-name">{rent.User.name}</div>
      </div>
    </div>
  );
};

export default RentItem;
