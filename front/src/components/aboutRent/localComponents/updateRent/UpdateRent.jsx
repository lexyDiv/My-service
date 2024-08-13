/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./UpdateRent.css";
import DialogWindow from "../../../DialogWindow/DialogWindow";
import ClientItem from "../../../clientItem/ClientItem";
import { useDispatch, useSelector } from "react-redux";
import Find from "../../../find/Find";
import { getClientOnDate } from "./functions/getClientOnDate";
import CandidateClient from "./localComponents/candidateClient/CandidateClient";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import { toGetClient } from "./functions/toGetClient";
import { toClientCB } from "./functions/toClientCB";
import { toFindTimeCB } from "./functions/toFindTimeCB";
import { updateRentFetch } from "./functions/updateRentFetch";
import { getDateFormat } from "../../../Calendars/functions/getDateFormat";
import { oneDay } from "../../../Calendars/Calendar1";
import UpdateCalendar from "./localComponents/updateCalendar/UpdateCalendar";
import { getHouseRents } from "./functions/getHouseRents";
import { deleteRent } from "./functions/deleteRent";
import ClientMessage from "./localComponents/clientMessage/ClientMessage";
import GlobalMessage from "../../../globalMessage/GlobalMessage";
import { useNavigate } from "react-router-dom";

const typeKeys = {
  забронировано: "hold",
  сдано: "go",
};

const UpdateRent = function ({ rent, setRent }) {
  // const { locationId, houseId, rentId } = useParams();
  const navigate = useNavigate();
  const { locations } = useSelector((store) => store.locations);
  const type = rent.type === "hold" ? "забронировано" : "сдано";
  const clientRef = useRef(null);
  const [status, setStatus] = useState(type);
  const [client, setClient] = useState(null);
  const [clientStatus, setClientStatus] = useState("");
  const [inputText, setInputText] = useState("");
  const [clickAlert, setClickAlert] = useState(true);
  const [CUTtypes, setCUTypes] = useState("по умолчанию");
  const [rentStartEnd, setRentStartEnd] = useState({
    startTime: rent.startTime,
    endTime: rent.endTime,
    clicks: 0,
  });
  const [updateMessage, setUpdateMessage] = useState("");
  const [getClientMessage, setGetClientMessage] = useState("");
  const dispatch = useDispatch();

  const houseRents = useRef(
    getHouseRents({
      locationId: rent.location_id,
      houseId: rent.house_id,
      rentId: rent.id,
      locations,
    })
  );

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
    setGetClientMessage("");
    setClientStatus("");
    setClient(clientRef.current);
    setStatus(type);
    setClientsArr([]);
    setClickAlert(false);
    setRentStartEnd({
      startTime: rent.startTime,
      endTime: rent.endTime,
      clicks: 0,
    });
    setCUTypes("по умолчанию");
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
    setGetClientMessage,
  });

  const findCB = getClientOnDate(setClientsArr, dispatch, setGetClientMessage);

  const findTimeCB = toFindTimeCB({
    setInputText,
    refFetchControl,
    findCB,
    refText,
    setClientsArr,
  });

  const okCBItem = () => {
    return <p>сохранить все изменения</p>;
  };

  const noCBItem = () => {
    return <p>отменить все изменения</p>;
  };

  const okCB = (type) => {
    if (type === "да") {
      updateRentFetch({
        rentStartEnd,
        status,
        client,
        statusQO,
        clientRef,
        dispatch,
        rent,
        setRent,
        setCUTypes,
        setRentStartEnd,
        houseRents,
        setUpdateMessage,
      });
    }
  };

  const noCB = (type) => {
    if (type === "да") {
      statusQO();
    }
  };

  //////////////////////////////////

  const calendarUpdateTypes = ["по умолчанию", "изменить"];

  const calendarCBType = (type) => {
    setTimeout(() => {
      setCUTypes(type);
      setClickAlert(true);
      setRentStartEnd({
        startTime: rent.startTime,
        endTime: rent.endTime,
        clicks: 0,
      });
    }, 100);
  };

  const deleteCBItem = () => {
    return <p>УДАЛИТЬ БРОНЬ/НАЙМ</p>;
  };

  const deleteCB = (type) => {
    if (type === "да") {
      deleteRent(rent, dispatch, setRent);
    }
  };

  const updateMessageCB = () => {
      setUpdateMessage("");
      if(updateMessage === 'delete') {
        navigate(-1);
      }
  };

  const getUpdateMessage = () => {
   // console.log(updateMessage)
    if(updateMessage === 'delete') {
      return "Не удалось применить изменения. Запись удалена другим администратором!"
    } else if(updateMessage === 'interval') {
      return "Не удалось сохранить новый интервал. Даты оказались заняты!"
    } else {
      return "Все изменения успешно сохранены!"
    }
  }
  // 89213397103

  return (
    <>
      <div id="update-rent">
        <div id="update-rent-status">
          <div className="change-point-box">
            {typeKeys[status] !== rent.type && <div className="change-point" />}
            <p className="update-rent-item">Статус:</p>
          </div>
          <p
            className="update-rent-item"
            style={{
              color: `${status === "забронировано" ? "yellow" : "red"}`,
            }}
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
          <div className="change-point-box">
            {clientRef.current !== client && <div className="change-point" />}
            <p className="update-rent-item">Клиент:</p>
          </div>
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
        {client && clientStatus !== "найти" && (
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <ClientItem client={client} />
          </div>
        )}
        {clientStatus === "найти" && (
          <Find
            cb={findCB}
            timeCB={findTimeCB}
            inputText={inputText}
            fildClickCB={() => {
              setGetClientMessage("");
            }}
          />
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
        {getClientMessage && <ClientMessage message={getClientMessage} />}
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
          <div className="change-point-box">
            {rentStartEnd.endTime &&
              (Number(rentStartEnd.startTime) !== Number(rent.startTime) ||
                Number(rentStartEnd.endTime) !== Number(rent.endTime)) && (
                <div className="change-point" />
              )}
            <p className="update-rent-item">период:</p>
          </div>
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
            {`${getDateFormat(
              new Date(Number(rentStartEnd.startTime))
            )} (14:00) `}
            <span
              style={{
                margin: "5px",
                color: "yellow",
                fontStyle: "italic",
              }}
            >
              По
            </span>
            {rentStartEnd.endTime &&
              `${getDateFormat(
                new Date(Number(rentStartEnd.endTime) + oneDay)
              )} (12:00)`}
          </p>
          <DialogWindow
            dataArr={calendarUpdateTypes.filter((el) => el !== CUTtypes)}
            cb={calendarCBType}
            cbItem={cbItem}
          />
        </div>
        {CUTtypes === "изменить" && (
          <UpdateCalendar
            rents={houseRents}
            rent={rent}
            rentStartEnd={rentStartEnd}
            setRentStartEnd={setRentStartEnd}
            setClickAlert={setClickAlert}
            clickAlert={clickAlert}
          />
        )}
        {(typeKeys[status] !== rent.type ||
          clientRef.current !== client ||
          Number(rentStartEnd.startTime) !== Number(rent.startTime) ||
          Number(rentStartEnd.endTime) !== Number(rent.endTime)) && (
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DialogWindow
            cbItem={deleteCBItem}
            dataArr={["да", "нет"]}
            color={"orange"}
            cb={deleteCB}
          />
        </div>
      </div>
      {updateMessage && (
        <GlobalMessage
          cb={updateMessageCB}
          updateMessage={getUpdateMessage()}
          color={`${updateMessage === "ok" ? "greenyellow" : "rgb(252, 85, 85)"}`}
        />
      )}
    </>
  );
};

export default UpdateRent;
