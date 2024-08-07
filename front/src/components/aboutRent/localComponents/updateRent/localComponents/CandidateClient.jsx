import React from "react";
import "./CandidateClient.css";
import { getDateFormat } from "../../../../Calendars/functions/getDateFormat";

const CandidateClient = function ({ client }) {
  return (
    <div className="candidate-client">
      <div className="candidate-client-string">
        <p className="candidate-client-left">логин :</p>
        <p className="candidate-client-right">{client.login}</p>
      </div>
      <div className="candidate-client-hr-line" />
      <div className="candidate-client-string">
        <p className="candidate-client-left">имя :</p>
        <p className="candidate-client-right">{client.name}</p>
      </div>
      <div className="candidate-client-hr-line" />
      <div className="candidate-client-string">
        <p className="candidate-client-left">телефон :</p>
        <p className="candidate-client-right">{client.phone}</p>
      </div>
      <div className="candidate-client-hr-line" />
      <div className="candidate-client-string">
        <p className="candidate-client-left">почта :</p>
        <p className="candidate-client-right">{client.email}</p>
      </div>
      <div className="candidate-client-hr-line" />
      <div className="candidate-client-string">
        <p className="candidate-client-left">телеграм :</p>
        <p className="candidate-client-right">{client.tele}</p>
      </div>
      <div className="candidate-client-hr-line" />
      <div className="candidate-client-string">
        <p className="candidate-client-left">зарегистрирован :</p>
        <p className="candidate-client-right">
          {client.regDate ? getDateFormat(new Date(Number(client.regDate))) : "нет"}
        </p>
      </div>
      <div className="candidate-client-hr-line" />
    </div>
  ); 
};

export default CandidateClient;
