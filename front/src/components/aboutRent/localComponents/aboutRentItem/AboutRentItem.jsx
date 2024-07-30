import React from "react";
import "./AboutRentItem.css";
import { getDateFormat } from "../../../aboutHouse/localComponents/createRent/localComponents/rentCalendar/functions/getDateFormat";
import { getTime } from "./functions/getTime";
import { oneDay } from "../../../Calendars/Calendar1";

const AboutRentItem = function ({ rent, location, house }) {
  const rentDays = JSON.parse(rent.days);
  //console.log(getTime(new Date(Number(rent.date)).toTimeString()));
  return (
    <div id="about-rent-item">
      <div id="about-rent-item-date">
        <div className="hr" />
        <p>Статус :</p>
        <h5
          className="about-rent-data"
          style={{
            color: `${rent.type === "go" ? "red" : "yellow"}`,
          }}
        >
          {rent.type === "go" ? "Сдано" : "Забронировано"}
        </h5>
        <div className="hr" />
        <p>Название базы :</p>
        <h5 className="about-rent-data">{location.name}</h5>
        <div className="hr" />
        <p>Название дома :</p>
        <h5 className="about-rent-data">{house.name}</h5>
        <div className="hr" />
        <p>Адрес дома :</p>
        <h5 className="about-rent-data">{house.address}</h5>
        <div className="hr" />
        <p>Дата создания :</p>
        <h5 className="about-rent-data">
          {getDateFormat(new Date(Number(rent.date)))}
          <span
            style={{
              color: "white",
              margin: "10px",
              fontStyle: "normal",
              fontSize: "small",
            }}
          >
            в
          </span>
          {getTime(new Date(Number(rent.date)).toTimeString())}
        </h5>
        <div className="hr" />
        <p>Дата последнего изменения:</p>
        <h5 className="about-rent-data">
          {getDateFormat(new Date(Number(rent.status)))}
          <span
            style={{
              color: "white",
              margin: "10px",
              fontStyle: "normal",
              fontSize: "small",
            }}
          >
            в
          </span>
          {getTime(new Date(Number(rent.status)).toTimeString())}
        </h5>
        <div className="hr" />
        <p>Период действия с</p>
        <h5 className="about-rent-data">{`${rentDays[0]} (14:00)`}</h5>
        <p>По</p>
        <h5 className="about-rent-data">{`${getDateFormat(
          new Date(Number(rent.endTime) + oneDay)
        )} (12:00)`}</h5>
      </div>
    </div>
  );
};

export default AboutRentItem;
