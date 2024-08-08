/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./UpdateRent.css";
import { useParams } from "react-router-dom";
import DialogWindow from "../../../DialogWindow/DialogWindow";
import ClientItem from "../../../clientItem/ClientItem";
import { useDispatch } from "react-redux";
import { getOneClient } from "../../../../functions/getOneClient";
import Find from "../../../find/Find";
import { noSpaceValid } from "../../../../functions/noSpaceValid";
import { getClientOnDate } from "./functions/getClientOnDate";
import CandidateClient from "./localComponents/CandidateClient";
import { Button } from "@mui/material";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import { toGetClient } from "./functions/toGetClient";
import { toClientCB } from "./functions/toClientCB";
import { toFindTimeCB } from "./functions/toFindTimeCB";
import { updateRentFetch } from "./functions/updateRentFetch";
import { getDateFormat } from "../../../Calendars/functions/getDateFormat";
import { oneDay } from "../../../Calendars/Calendar1";

const typeKeys = {
  забронировано: "hold",
  сдано: "go",
};

const UpdateRent = function ({ rent }) {
  // const { locationId, houseId, rentId } = useParams();
  const type = rent.type === "hold" ? "забронировано" : "сдано";
  const clientRef = useRef(null);
  const [status, setStatus] = useState(type);
  const [client, setClient] = useState(null);
  const [clientStatus, setClientStatus] = useState("");
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  const getClient = toGetClient({ dispatch, rent, setClient, clientRef });

  useEffect(() => {
    getClient();
  }, []);

  const typeDataArr = ["забронировано", "сдано"];
  let clientDataArr = ["найти"];
  if (clientStatus === "найти" || clientRef.current !== client) {
    clientDataArr.push("по умолчанию");
  }
  client && clientDataArr.push("не определён");

  const typeCB = (type) => {
    setStatus(type);
  };

  const statusQO = () => {
    setClientStatus("");
    setClient(clientRef.current);
    setStatus(type);
    setClientsArr([]);
  };

  const cbItem = () => {
    return <SyncProblemIcon />;
  };

  ////////////////////////////////

  const refFetchControl = useRef(null);
  const [clientsArr, setClientsArr] = useState([]);
  const refText = useRef(inputText);
  refText.current = inputText;

  const clientCB = toClientCB({
    setClient,
    setClientStatus,
    clientRef,
    setClientsArr,
  });

  const findCB = getClientOnDate(setClientsArr, dispatch);

  const findTimeCB = toFindTimeCB({
    setInputText,
    refFetchControl,
    findCB,
    refText,
    setClientsArr,
  });

  const okCBItem = () => {
    return <p>сохранить</p>;
  };

  const noCBItem = () => {
    return <p>отменить</p>;
  };

  const okCB = (type) => {
    if (type === "да") {
      updateRentFetch({});
    }
  };

  const noCB = (type) => {
    if (type === "да") {
      statusQO();
    }
  };

  //////////////////////////////////

  const calendarUpdateTypes = ["по умолчанию", "изменить"];
  const [CUTtypes, setCUTypes] = useState("по умолчанию");

  // 89213397103

  return (
    <div id="update-rent">
      <div id="update-rent-status">
        <p className="update-rent-item">Статус:</p>
        <p
          className="update-rent-item"
          style={{ color: `${status === "забронировано" ? "yellow" : "red"}` }}
        >
          {status}
        </p>
        <DialogWindow
          dataArr={typeDataArr.filter((el) => el !== status)}
          cb={typeCB}
          cbItem={cbItem}
        />
      </div>
      <div id="update-rent-client">
        <p className="update-rent-item">Клиент:</p>
        {!client && (
          <p className="update-rent-item" style={{ color: "red" }}>
            не определён
          </p>
        )}
        <DialogWindow
          dataArr={clientDataArr.filter((el) => el !== clientStatus)}
          cb={clientCB}
          cbItem={cbItem}
        />
      </div>
      {client && clientStatus !== "найти" && <ClientItem client={client} />}
      {clientStatus === "найти" && (
        <Find cb={findCB} timeCB={findTimeCB} inputText={inputText} />
      )}
      {clientsArr.length ? (
        <div id="lients-length">
          <div
            style={{
              display: "flex",
              width: "40%",
              justifyContent: "space-between",
            }}
          >
            <p>найдено:</p>
            <p>{clientsArr.length}</p>
          </div>
        </div>
      ) : (
        false
      )}
      {clientsArr.map((client) => (
        <CandidateClient
          key={client.id + 100}
          client={client}
          setClient={setClient}
          setClientsArr={setClientsArr}
          setClientStatus={setClientStatus}
        />
      ))}
      <div id="update-rent-days">
        <p className="update-rent-item">период:</p>
        <p className="update-rent-item" style={{ fontSize: "small" }}>
          <span
            style={{
              margin: "5px",
              color: "yellow",
              fontStyle: "italic",
            }}
          >
            С
          </span>
          {`${getDateFormat(new Date(Number(rent.startTime)))} (14:00) `}
          <span
            style={{
              margin: "5px",
              color: "yellow",
              fontStyle: "italic",
            }}
          >
            По
          </span>
          {`${getDateFormat(new Date(Number(rent.endTime) + oneDay))} (12:00)`}
        </p>
        <DialogWindow
          dataArr={calendarUpdateTypes.filter((el) => el !== CUTtypes)}
          cb={typeCB}
          cbItem={cbItem}
        />
      </div>
      {(typeKeys[status] !== rent.type || clientRef.current !== client) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <DialogWindow dataArr={["да", "нет"]} cbItem={okCBItem} cb={okCB} />
          <DialogWindow dataArr={["да", "нет"]} cbItem={noCBItem} cb={noCB} />
        </div>
      )}
    </div>
  );
};

export default UpdateRent;
