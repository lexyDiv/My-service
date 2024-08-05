import React, { useState } from "react";
import "./UpdateRent.css";
import { useParams } from "react-router-dom";
import DialogWindow from "./localComponents/DialogWindow";

const typeKeys = {
  забронировано: "hold",
  сдано: "go",
};

const UpdateRent = function ({ rent }) {
  const { locationId, houseId, rentId } = useParams();
  const type = rent.type === "hold" ? "забронировано" : "сдано";
  const [status, setStatus] = useState(type);
  //const [client, setClient] = useState(rent.Client);
  const [clientStatus, setClientStatus] = useState("");

  const typeDataArr = ["забронировано", "сдано"];
  const clientDataArr = ["создать", "найти"];
  rent.Client && clientDataArr.push("не определён");

  const typeCB = (type) => {
    setStatus(type);
  };

  const clientCB = (type) => {
    setClientStatus(type);
   console.log(type)
  }

  const statusQO = () => {
    setClientStatus("");
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
        {(!rent.Client || clientStatus === "не определён") && (
          <p className="update-rent-item" style={{ color: "red" }}>
            не определён
          </p>
        )}
        <DialogWindow
          dataArr={clientDataArr}
          cb={clientCB}
        />
      </div>
      {rent.Client && clientStatus !== "не определён" && <div>client here</div>}
      {(typeKeys[status] !== rent.type
        ||
        (rent.Client && clientStatus === "не определён")
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
