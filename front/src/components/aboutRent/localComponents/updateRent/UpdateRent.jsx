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
  const [client, setClient] = useState(rent.Client);

  const typeDataArr = ["забронировано", "сдано"];
  const clientDataArr = ["не определён", "создать", "найти"];

  const typeCB = (type) => {
    setStatus(type);
  };

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
        <p className="update-rent-item" >Клиент:</p>
        {client ? (
          <div>client</div>
        ) : (
          <p className="update-rent-item" style={{ color: "red" }}>не определён</p>
        )}
        <DialogWindow
          dataArr={typeDataArr.filter((el) => el !== status)}
          cb={typeCB}
        />
      </div>
      {typeKeys[status] !== rent.type && (
        <button type="button">сохранить изменения</button>
      )}
    </div>
  );
};

export default UpdateRent;
