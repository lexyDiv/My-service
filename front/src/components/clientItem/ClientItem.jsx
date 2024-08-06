import React from "react";
import "./ClientItem.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClientItem = function ({ client }) {
  const navigate = useNavigate();

  const goToClient = () => {
    navigate(`/clients/client/${client.id}`);
  };

  return (
    <div id="rent-client" onClick={goToClient}>
      <Avatar alt="Remy Sharp" src={client.image} />
      <p>{client.name}</p>
      <p>{client.login}</p>
      <p>{client.phone}</p>
      <p>{client.tele}</p>
      <p>{client.email}</p>
      <p
        style={{
          color: "green",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        {client.about}
      </p>
    </div>
  );
};

export default ClientItem;
