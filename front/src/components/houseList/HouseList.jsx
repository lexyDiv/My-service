import React, { useEffect } from "react";
import House from "../house/House";
import { useDispatch } from "react-redux";

const HouseList = function ({ location }) {
  const houses = location.Houses.sort((a, b) => a.id - b.id);
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch({ type: "SELECT", payload: 1 });

  }, [dispatch]);

  return (
    <div id="house-list-box" >
      {houses.map((house) => (
        <House key={house.id} house={house} />
      ))}
    </div>
  );
};

export default HouseList;
