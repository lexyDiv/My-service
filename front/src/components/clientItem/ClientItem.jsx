import React from "react";
import "./ClientItem.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Accordion1 from "../accordion/Accordion";

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
          <div className="rent-client-info-hr"/>
          <div className="rent-client-info-line">
            <p className="rent-client-info-line-left">логин:</p>
            <p className="rent-client-info-line-right">
              {client.login || "---"}
            </p>
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
