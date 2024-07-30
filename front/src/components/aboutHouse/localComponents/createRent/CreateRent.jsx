import React, { useState } from "react";
import "./CreateRent.css";
import RentCalendar from "./localComponents/rentCalendar/RentCalendar";
import RentItem from "../rentItem/RentItem";

const CreateRent = function ({ house, user, location }) {
  const [focusRent, setFocusRent] = useState(null);

  return (
    <div id="create-rent">
      <img id="create-rent-image" src={house.image} alt="img" />
      <h5 style={{ color: "white" }}>{house.name}</h5>
      <p style={{ color: "white" }}>{house.address}</p>
      <RentCalendar
        house={house}
        user={user}
        location={location}
        setFocusRent={setFocusRent}
        focusRent={focusRent}
      />
      {focusRent && <RentItem rent={focusRent} />}
    </div>
  );
};

export default CreateRent;
