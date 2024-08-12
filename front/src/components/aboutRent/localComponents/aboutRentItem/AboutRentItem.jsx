/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./AboutRentItem.css";
import { getDateFormat } from "../../../aboutHouse/localComponents/createRent/localComponents/rentCalendar/functions/getDateFormat";
import { getTime } from "./functions/getTime";
import { oneDay } from "../../../Calendars/Calendar1";
import { Avatar } from "@mui/material";
import { toGetClient } from "../updateRent/functions/toGetClient";
import { useDispatch } from "react-redux";

const AboutRentItem = function ({ rent, location, house }) {
  const rentDays = JSON.parse(rent.days);
  const dispatch = useDispatch();

  const [client, setClient] = useState(null);
  const getClient = toGetClient({ dispatch, rent, setClient });

  useEffect(() => {
    getClient();
  }, []);

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
        <p>Создатель:</p>
        <h5 className="about-rent-data">{rent.User.name}</h5>
        <Avatar
          alt="Remy Sharp"
          src={rent.User.image}
          sx={{ minWidth: "70px", minHeight: "70px" }}
        />
        <div className="hr" />
        <p>Дата последнего изменения:</p>
        <h5 className="about-rent-data">
          {getDateFormat(new Date(Number(rent.update_date)))}
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
          {getTime(new Date(Number(rent.update_date)).toTimeString())}
        </h5>
        <div className="hr" />
        <p>Период действия с</p>
        <h5 className="about-rent-data">{`${rentDays[0]} (14:00)`}</h5>
        <p>По</p>
        <h5 className="about-rent-data">{`${getDateFormat(
          new Date(Number(rent.endTime) + oneDay)
        )} (12:00)`}</h5>
        <div className="hr" />
        <p>Клиент:</p>
        {client ? (
          <>
            <p>Логин:</p>
            <h5 className="about-rent-data">{client.login}</h5>
            <p>Имя:</p>
            <h5 className="about-rent-data">{client.name}</h5>
            <p>Электронная почта:</p>
            <h5 className="about-rent-data">{client.email}</h5>
            <p>Телега:</p>
            <h5 className="about-rent-data">{client.telegram}</h5>
            <p>Телефон:</p>
            <h5 className="about-rent-data">{client.phone}</h5>
            <p>Фото:</p>
            <Avatar
              alt="Remy Sharp"
              src={client.image}
              sx={{ minWidth: "70px", minHeight: "70px" }}
            />
          </>
        ) : (
          <h5 className="about-rent-data" style={{ color: "red" }}>
            Не определён
          </h5>
        )}
        <div className="hr" />
      </div>
    </div>
  );
};

export default AboutRentItem;
