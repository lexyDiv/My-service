import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import './AboutLocation.css';
import HouseList from "../houseList/HouseList";

const AboutLocation = function () {

const { locationId } = useParams();
const { locations } = useSelector((store) => store.locations);

const location = locations.find((el) => el.id === Number(locationId));



  return (
    <div id="about-location-box">
      <h1>{location.name}</h1>
      <img id="about-location-image" src={location.image} alt="img" />
      <HouseList location={location}/>
    </div>
  );
};

export default AboutLocation;
