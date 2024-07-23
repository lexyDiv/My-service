import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Location from "../location/Location";

import "./LocationList.css";

const LocationList = function () {
  const { locations } = useSelector((store) => store.locations);
  const dispatch = useDispatch();
  const { crumbs } = useSelector((store) => store.crumbs);

  useEffect(() => {
    dispatch({ type: "FIRST", payload: [{ name: "БАЗЫ", path: "/", id: 0 }] });
    window.history.replaceState(
      {},
      '',
      '/'
    )
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
