import React from "react";
import House from "../house/House";

const HouseList = function ({ location }) {
  const houses = location.Houses.sort((a, b) => a.id - b.id);

  return (
    <div id="house-list-box" >
      {houses.map((house) => (
        <House key={house.id} house={house} />
      ))}
    </div>
  );
};

export default HouseList;
