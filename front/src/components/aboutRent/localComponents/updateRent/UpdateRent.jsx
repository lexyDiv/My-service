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

const typeKeys = {
  забронировано: "hold",
  сдано: "go",
};

const UpdateRent = function ({ rent }) {
  const { locationId, houseId, rentId } = useParams();
  const type = rent.type === "hold" ? "забронировано" : "сдано";
  const clientRef = useRef(null);
  const [status, setStatus] = useState(type);
  const [client, setClient] = useState(null);
  const [clientStatus, setClientStatus] = useState("");
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  async function getClient() {
    dispatch({ type: "SET_LOADING", payload: true });
    const clientData = await getOneClient(rent.client_id);
    if (clientData) {
      setClient(clientData);
      clientRef.current = clientData;
      rent.Client = clientData;
    }
    dispatch({ type: "SET_LOADING", payload: false });
  }

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

  const clientCB = (type) => {
    if (type === "не определён") {
      setClient(null);
      setClientStatus("");
    } else if (type === "по умолчанию") {
      setClient(clientRef.current);
      setClientStatus("");
      setClientsArr([]);
    } else if (type === "найти") {
      setClientStatus(type);
      setClient(clientRef.current);
    } else {
      setClientStatus(type);
    }
  };

  const statusQO = () => {
    setClientStatus("");
    setClient(clientRef.current);
    setStatus(type);
  };

  const cbItem = () => {
    return <>изменить</>;
  };

  ////////////////////////////////

  const refFetchControl = useRef(null);
  const [clientsArr, setClientsArr] = useState([]);
  const refText = useRef(inputText);
  refText.current = inputText;

  const findCB = getClientOnDate(setClientsArr, dispatch);

  const findTimeCB = (e) => {
    const text = noSpaceValid(e.target.value);
    setInputText(text);
    if(refFetchControl.current) {
      clearTimeout(refFetchControl.current);
    }
    refFetchControl.current = text.length >= 5 && setTimeout(() => {
        findCB(refText.current);
    }, 1000);
    if(!text.length) {
      setClientsArr([]);
    }
  };


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
      {clientsArr.map(client => <CandidateClient key={client.id + 100} client={client}/>)}
      {(typeKeys[status] !== rent.type || clientRef.current !== client) && (
        <div>
          <button type="button">сохранить изменения</button>
          <button onClick={statusQO} type="button">
            отменить изменения
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateRent;
