import React from "react";
import "./RentItem.css";

const rentTypes = {
  hold: "забронировано",
  go: "сдано",
};

const RentItem = function ({ rent }) {
  return (
    <div className="rent-item">
      <p className="rent-item-status">
        Статус :
        <span
          className="rent-item-status-type"
          style={{ color: rent.type === "go" ? "red" : "yellow" }}
        >{` ${rentTypes[rent.type]}`}</span>
      </p>
    </div>
  );
};

export default RentItem;
