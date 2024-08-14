import React from "react";
import "./ClientItem.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Accordion1 from "../accordion/Accordion";
import { getDateFormat } from "../aboutHouse/localComponents/createRent/localComponents/rentCalendar/functions/getDateFormat";

const ClientItem = function ({ client }) {
  const navigate = useNavigate();

  const goToClient = () => {
    navigate(`/clients/client/${client.id}`);
  };
 
  return (
    <div className="rent-client" onClick={goToClient}>
      <div className="rent-client-basic">
        <div className="rent-client-img-box">
          <img
            className="rent-client-img"
            src={client.image || "/img.png"}
            alt="img"
          />
        </div>
        <div className="rent-client-info">
          <div className="rent-client-info-line">
            <p className="rent-client-info-line-left">имя:</p>
            <p className="rent-client-info-line-right">
              {client.name || "---"}
            </p>
          </div>
          <div className="rent-client-info-hr" />
          <div className="rent-client-info-line">
            <p className="rent-client-info-line-left">логин:</p>
            <p className="rent-client-info-line-right">
              {client.login || "---"}
            </p>
          </div>
          <div className="rent-client-info-hr" />
          <div className="rent-client-info-line">
            <p className="rent-client-info-line-left">телефон:</p>
            <p className="rent-client-info-line-right">
              {client.phone || "---"}
            </p>
          </div>
          <div className="rent-client-info-hr" />
          <div className="rent-client-info-line">
            <p className="rent-client-info-line-left">телеграм:</p>
            <p className="rent-client-info-line-right">
              {client.tele || "---"}
            </p>
          </div>
          <div className="rent-client-info-hr" />
          <div className="rent-client-info-line">
            <p className="rent-client-info-line-left">почта:</p>
            <p className="rent-client-info-line-right">
              {client.email || "---"}
            </p>
          </div>
          <div className="rent-client-info-hr" />
          <div className="rent-client-info-line">
            <p className="rent-client-info-line-left">регистрация:</p>
            <p className="rent-client-info-line-right">
              {client.regDate
                ? getDateFormat(new Date(Number(client.regDate)))
                : "---"}
            </p>
          </div>
          <div className="rent-client-info-hr" />
          <div className="rent-client-info-line">
            <p className="rent-client-info-line-left">создал:</p>
            <p
              className="rent-client-info-line-right"
              style={{ color: "orange" }}
            >
              {(client.User && client.User.name) || "---"}
            </p>
          </div>
          <div className="rent-client-info-hr" />
          <div className="rent-client-info-line">
            <p className="rent-client-info-line-left">БАН:</p>
            {client.ban ? (
              <p
                className="rent-client-info-line-right"
                style={{ color: "red" }}
              >забанен</p>
            ) : (
              <p
                className="rent-client-info-line-right"
                style={{ color: "green" }}
              >нет</p>
            )}
          </div>
        </div>
      </div>
      {/* <Avatar alt="Remy Sharp" src={client.image} sx={{margin: 0.5}} />
      {client.name && <p>{client.name}</p>}
      {client.login && <p>{client.login}</p>}
      {client.phone && <p>{client.phone}</p>}
      {client.tele && <p>{client.tele}</p>}
      {client.email && <p>{client.email}</p>}

      {client.about && (
        <div onClick={(e) => e.stopPropagation()}>
          <Accordion1
            id={client.id + 10000}
            text={client.about}
            title={"характеристика"}
          />
        </div>
      )} */}
      {client.about && (
        <div onClick={(e) => e.stopPropagation()}>
          <Accordion1
            id={client.id + 10000}
            text={client.about}
            title={"характеристика"}
          />
        </div>
      )}
    </div>
  );
};

export default ClientItem;
