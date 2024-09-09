import React, { useRef } from "react";
import "./RentItem.css";
import { getDateFormat } from "../createRent/localComponents/rentCalendar/functions/getDateFormat";
import { Avatar, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const rentTypes = {
  hold: "забронировано",
  go: "сдано",
};

const RentItem = function ({ rent, alone }) {
  const navigate = useNavigate();
  const oneDay = 86400000;
  const loc = useLocation();

  function goToRent() {
    navigate(
      `/locations/location/${rent.location_id}/house/${rent.house_id}/rent/${rent.id}`
    );
  }

  const { locations } = useSelector((store) => store.locations);
  const location = useRef(locations.find((l) => l.id === rent.location_id));

  return (
    <div className="rent-item">
      <div className="rent-item-left">
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
          )} (${location ? location.current.inTime : "14:00"})`}</p>
          <p className="rent-item-date-p">По</p>
          <p className="rent-item-date-p-date">{`${getDateFormat(
            new Date(Number(rent.endTime) + oneDay)
          )} (${location ? location.current.outTime : "12:00"})`}</p>
        </div>
        <div className="rent-item-user-info">
          <div className="rent-item-user-info-creator">Создал :</div>
          <div className="rent-item-user-info-date">
            {getDateFormat(new Date(Number(rent.date)))}
          </div>
          <Avatar sx={{ width: '20px', height: "20px" }} alt="Remy Sharp" src={rent.User.image} />
          <div className="rent-item-user-info-name">{rent.User.name}</div>
        </div>
      </div>
      <div className="rent-item-right">
        <Button
          onClick={goToRent}
          sx={{
            marginTop: 1,
          }}
          variant="outlined"
        >
          подробно
        </Button>
        {!alone && (
          <Button
            onClick={() => {
              const goPath = `/locations/location/${rent.location_id}/house/${rent.house_id}`;
              const pageKey = goPath + "/rentId";
              sessionStorage.setItem(pageKey, rent.id);
              sessionStorage.setItem(goPath, "создать бронь/найм в");
              navigate(goPath);
            }}
            sx={{
              marginTop: 1,
            }}
            variant="outlined"
          >
            на календаре
          </Button>
        )}
      </div>
    </div>
  );
};

export default RentItem;
