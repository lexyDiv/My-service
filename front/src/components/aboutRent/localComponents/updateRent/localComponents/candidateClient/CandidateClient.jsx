import React from "react";
import "./CandidateClient.css";
import { getDateFormat } from "../../../../../Calendars/functions/getDateFormat";
import Accordion1 from "../../../../../accordion/Accordion";
import { Avatar, Button } from "@mui/material";

const CandidateClient = function ({
  client,
  setClient,
  setClientStatus,
  setClientsArr,
}) {
  return (
    <div className="candidate-client">
      {client.login && (
        <div className="candidate-client-string">
          <p className="candidate-client-left">логин :</p>
          <p className="candidate-client-right">{client.login}</p>
        </div>
      )}
      {client.name && (
        <>
          <div className="candidate-client-hr-line" />
          <div className="candidate-client-string">
            <p className="candidate-client-left">имя :</p>
            <p className="candidate-client-right">{client.name}</p>
          </div>
        </>
      )}
      {client.phone && (
        <>
          <div className="candidate-client-hr-line" />
          <div className="candidate-client-string">
            <p className="candidate-client-left">телефон :</p>
            <p className="candidate-client-right">{client.phone}</p>
          </div>
        </>
      )}
      {client.email && (
        <>
          <div className="candidate-client-hr-line" />
          <div className="candidate-client-string">
            <p className="candidate-client-left">почта :</p>
            <p className="candidate-client-right">{client.email}</p>
          </div>
        </>
      )}
      {client.tele && (
        <>
          <div className="candidate-client-hr-line" />
          <div className="candidate-client-string">
            <p className="candidate-client-left">телеграм :</p>
            <p className="candidate-client-right">{client.tele}</p>
          </div>
        </>
      )}
      {client.regDate && (
        <>
          {" "}
          <div className="candidate-client-hr-line" />
          <div className="candidate-client-string">
            <p className="candidate-client-left">зарегистрирован :</p>
            <p className="candidate-client-right">
              {getDateFormat(new Date(Number(client.regDate)))}
            </p>
          </div>
        </>
      )}
      <div className="candidate-client-hr-line" />
      <div className="candidate-client-string">
        <Avatar alt="Remy Sharp" src={client.image} />
        {client.about && (
          <Accordion1
            id={client.id + 10000}
            text={client.about}
            title={"характеристика"}
          />
        )}
      </div>
      <Button
        onClick={() => {
          setClient(client);
          setClientStatus("");
          setClientsArr([]);
        }}
        sx={{ marginTop: "15px" }}
        variant="outlined"
      >
        этот клиент
      </Button>
    </div>
  );
};

export default CandidateClient;
