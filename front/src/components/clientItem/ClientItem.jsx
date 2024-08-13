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
    <div id="rent-client" onClick={goToClient}>
      <Avatar alt="Remy Sharp" src={client.image} />
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
      )}
    </div>
  );
};

export default ClientItem;
