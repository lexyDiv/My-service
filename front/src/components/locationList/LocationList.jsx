import React from "react";
import { useSelector } from "react-redux";
import Location from "../location/Location";
import { Container } from "@mui/material";

import "./LocationList.css"

const LocationList = function () {
  const { locations } = useSelector((store) => store.locations);

  return (
    <div className="locations-box">
        
      {locations.map((location) => (
        <Location key={location.id} location={location} />
      ))}
    </div>
  );
};

export default LocationList;
