import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Location from "../location/Location";
import { Container } from "@mui/material";

import "./LocationList.css"

const LocationList = function () {
  const { locations } = useSelector((store) => store.locations);
  const dispatch = useDispatch();

 useEffect(() => {
  dispatch({type: 'FIRST', payload: [{name: 'БАЗЫ', path: '/', id: 0}]});
 }, [dispatch]);

  return (
    <div className="locations-box">
        
      {locations.map((location) => (
        <Location key={location.id} location={location} />
      ))}
    </div>
  );
};

export default LocationList;
