import React, { useState } from "react";
import "./UpdateRent.css";
import { useParams } from "react-router-dom";
import DialogWindow from "./localComponents/DialogWindow";
import ClientItem from "../../../clientItem/ClientItem";


const typeKeys = {
  забронировано: "hold",
  сдано: "go",
};

const UpdateRent = function ({ rent }) {
  const { locationId, houseId, rentId } = useParams();
  const type = rent.type === "hold" ? "забронировано" : "сдано";
  const [status, setStatus] = useState(type);
  const [client, setClient] = useState(rent.Client);
  const [clientStatus, setClientStatus] = useState("");

  const typeDataArr = ["забронировано", "сдано"];
  const clientDataArr = ["создать", "найти"];
  client && clientDataArr.push("не определён");

  const typeCB = (type) => {
    setStatus(type);
  };

  const clientCB = (type) => {
    if(type === "не определён") {
      setClient(null);
    } else {
      setClientStatus(type);
    }
   console.log(type)
  }

  const statusQO = () => {
    setClientStatus("");
    setClient(rent.Client);
    setStatus(type);
  }

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
        />
      </div>
      <div id="update-rent-client">
        <p className="update-rent-item">Клиент:</p>
        {(!client) && (
          <p className="update-rent-item" style={{ color: "red" }}>
            не определён
          </p>
        )}
        <DialogWindow
          dataArr={clientDataArr}
          cb={clientCB}
        />
      </div>
      {client && <ClientItem client={client}/>}
      {(typeKeys[status] !== rent.type
        ||
        (rent.Client !== client)
      ) && (
        <div>
          <button type="button">сохранить изменения</button>
          <button 
          onClick={statusQO}
          type="button">отменить изменения</button>
        </div>
      )}
    </div>
  );
};

export default UpdateRent;
