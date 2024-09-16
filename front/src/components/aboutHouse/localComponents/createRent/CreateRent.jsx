/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./CreateRent.css";
import RentCalendar from "./localComponents/rentCalendar/RentCalendar";
import RentItem from "../rentItem/RentItem";
import { useLocation } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";

const CreateRent = function ({ house, user, location }) {
  const loc = useLocation();
  const pageKey = loc.pathname + "/rentId";
  const { quickInterval } = useSelector((store) => store.quickInterval);
  const dispatch = useDispatch();
  const saveFocusRentById = house.Rents.find(
    (rent) => rent.id === sessionStorage.getItem(pageKey)
  );
  const [focusRent, setFocusRent] = useState(
    quickInterval ? null : saveFocusRentById || null
  );

  useEffect(() => {
    sessionStorage.setItem(pageKey, focusRent ? focusRent.id : 0);
  }, [focusRent]);

  useEffect(() => {
    return () => {
      if (quickInterval) {
        dispatch({ type: "SET_INTERVAL", payload: null });
      }
    };
  }, []);

  return (
    <div id="create-rent">
      <img
        id="create-rent-image"
        src={house.image || "/nature.webp"}
        alt="img"
      />
      <h5 style={{ color: "white" }}>{house.name}</h5>
      <p style={{ color: "white" }}>{house.address}</p>
      <RentCalendar
        house={house}
        user={user}
        location={location}
        setFocusRent={setFocusRent}
        focusRent={focusRent}
      />
      {focusRent ? (
        <>
          <HighlightOffIcon
            onClick={() => setFocusRent(null)}
            fontSize="large"
            sx={{ color: "white", cursor: "pointer" }}
          />
          <RentItem rent={focusRent} alone={true} />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "50px",
          }}
        />
      )}
    </div>
  );
};

export default CreateRent;
