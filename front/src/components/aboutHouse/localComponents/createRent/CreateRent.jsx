/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./CreateRent.css";
import RentCalendar from "./localComponents/rentCalendar/RentCalendar";
import RentItem from "../rentItem/RentItem";
import { useLocation } from "react-router-dom";

const CreateRent = function ({ house, user, location }) {
  const loc = useLocation();
  const pageKey = loc.pathname + "/rentId";
  const saveFocusRentById = house.Rents.find(
    (rent) => rent.id === Number(sessionStorage.getItem(pageKey))
  );
  const [focusRent, setFocusRent] = useState(
    saveFocusRentById || null
  );

  useEffect(() => {
    sessionStorage.setItem(pageKey, focusRent ? focusRent.id : 0);
  }, [focusRent]);

  return (
    <div id="create-rent">
      <img id="create-rent-image" src={house.image || "/nature.webp"} alt="img" />
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
